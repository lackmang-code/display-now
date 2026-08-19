import { hashPassword, safeEqual, json, UNLOCK_LIMIT } from './_lib.js';

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'invalid_json' }, 400);
  }

  if (!env.BOARD_DB) {
    return json({ success: false, error: 'db_not_bound' }, 500);
  }

  const id = Number(data.id);
  const password = String(data.password || '');
  if (!id || !password) {
    return json({ success: false, error: 'missing_params' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const windowStart = new Date(now - UNLOCK_LIMIT.windowMs).toISOString();

  // 이 사람이 이 글에 최근 몇 번 틀렸는지
  const mine = await env.BOARD_DB.prepare(
    `SELECT fails, window_start FROM unlock_attempts WHERE post_id = ? AND ip = ?`
  )
    .bind(id, ip)
    .first();

  const mineFresh = mine && mine.window_start > windowStart;
  if (mineFresh && mine.fails >= UNLOCK_LIMIT.perIp) {
    return json({ success: false, error: 'too_many_attempts' }, 429);
  }

  // IP를 바꿔 가며 두드리는 경우까지 막으려면 글 단위로도 세어야 한다
  const total = await env.BOARD_DB.prepare(
    `SELECT COALESCE(SUM(fails), 0) AS n FROM unlock_attempts WHERE post_id = ? AND window_start > ?`
  )
    .bind(id, windowStart)
    .first();

  if ((total?.n || 0) >= UNLOCK_LIMIT.perPost) {
    return json({ success: false, error: 'too_many_attempts' }, 429);
  }

  const post = await env.BOARD_DB.prepare(
    `SELECT id, kind, name, title, message, is_private, created_at, reply, replied_at, post_pw_hash, post_pw_salt
     FROM posts WHERE id = ?`
  )
    .bind(id)
    .first();

  if (!post || !post.is_private || !post.post_pw_hash) {
    return json({ success: false, error: 'not_found' }, 404);
  }

  const attempt = await hashPassword(password, post.post_pw_salt);
  if (!safeEqual(attempt, post.post_pw_hash)) {
    await recordFail(env, id, ip, mineFresh ? mine.fails : 0, now);
    const used = (mineFresh ? mine.fails : 0) + 1;
    return json(
      { success: false, error: 'wrong_password', remaining: Math.max(0, UNLOCK_LIMIT.perIp - used) },
      401
    );
  }

  // 맞았으면 실패 기록을 지운다
  await env.BOARD_DB.prepare(`DELETE FROM unlock_attempts WHERE post_id = ? AND ip = ?`)
    .bind(id, ip)
    .run();

  return json(
    {
      success: true,
      post: {
        id: post.id,
        kind: post.kind,
        name: post.name,
        title: post.title,
        message: post.message,
        created_at: post.created_at,
        reply: post.reply,
        replied_at: post.replied_at,
      },
    },
    200
  );
}

async function recordFail(env, postId, ip, priorFails, now) {
  // 창이 지났으면 1부터 다시 센다
  const fails = priorFails + 1;
  const stamp = priorFails === 0 ? new Date(now).toISOString() : undefined;
  if (stamp) {
    await env.BOARD_DB.prepare(
      `INSERT INTO unlock_attempts (post_id, ip, fails, window_start) VALUES (?, ?, ?, ?)
       ON CONFLICT(post_id, ip) DO UPDATE SET fails = 1, window_start = excluded.window_start`
    )
      .bind(postId, ip, 1, stamp)
      .run();
    return;
  }
  await env.BOARD_DB.prepare(`UPDATE unlock_attempts SET fails = ? WHERE post_id = ? AND ip = ?`)
    .bind(fails, postId, ip)
    .run();
}
