import { json, cap, LIMITS } from './_lib.js';

// 편집국 게시판 관리. /admin 페이지의 "문의" 탭 전용.
export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'invalid_json' }, 400);
  }

  // 비밀번호가 설정돼 있지 않으면 열지 않는다. 미설정을 통과로 처리하면 문의자 이메일이 노출된다
  if (!env.ADMIN_PASSWORD) {
    return json({ success: false, error: 'admin_not_configured' }, 503);
  }
  if (!data.password || data.password !== env.ADMIN_PASSWORD) {
    return json({ success: false, error: 'unauthorized' }, 401);
  }
  if (!env.BOARD_DB) {
    return json({ success: false, error: 'db_not_bound' }, 500);
  }

  if (data.action === 'list') {
    const { results } = await env.BOARD_DB.prepare(
      `SELECT id, kind, name, email, org, title, message, is_private, created_at, reply, replied_at
       FROM posts ORDER BY id DESC LIMIT 200`
    ).all();
    return json({ success: true, total: results.length, posts: results }, 200);
  }

  if (data.action === 'reply') {
    const reply = cap(data.reply, LIMITS.message);
    if (!data.id || !reply) {
      return json({ success: false, error: 'missing_fields' }, 400);
    }
    await env.BOARD_DB.prepare(`UPDATE posts SET reply = ?, replied_at = ? WHERE id = ?`)
      .bind(reply, new Date().toISOString(), data.id)
      .run();
    return json({ success: true }, 200);
  }

  if (data.action === 'delete') {
    if (!data.id) return json({ success: false, error: 'missing_id' }, 400);
    await env.BOARD_DB.prepare(`DELETE FROM posts WHERE id = ?`).bind(data.id).run();
    return json({ success: true }, 200);
  }

  return json({ success: false, error: 'unknown_action' }, 400);
}
