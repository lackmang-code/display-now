import { KINDS, LIMITS, cap, hashPassword, makeSalt, json } from './_lib.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'invalid_json' }, 400);
  }

  // 사람에게 보이지 않는 칸. 봇이 채우면 접수한 척만 하고 저장하지 않는다
  if (cap(data.website, 10)) {
    return json({ success: true, id: 0 }, 200);
  }

  if (!env.BOARD_DB) {
    return json({ success: false, error: 'db_not_bound' }, 500);
  }

  const kind = KINDS.includes(data.kind) ? data.kind : '기타';
  const name = cap(data.name, LIMITS.name);
  const email = cap(data.email, LIMITS.email);
  const org = cap(data.org, LIMITS.org);
  const title = cap(data.title, LIMITS.title);
  const message = cap(data.message, LIMITS.message);
  const isPrivate = data.is_private ? 1 : 0;

  if (!name || !title || !message) {
    return json({ success: false, error: 'missing_fields' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ success: false, error: 'invalid_email' }, 400);
  }
  if (isPrivate && (!data.post_password || String(data.post_password).length < 4)) {
    return json({ success: false, error: 'password_required' }, 400);
  }

  const createdAt = new Date().toISOString();
  // salt는 글마다 새로 만든다. 같은 비밀번호를 써도 저장되는 해시가 서로 달라져
  // 미리 만들어 둔 대조표로는 되돌릴 수 없다
  const salt = isPrivate ? makeSalt() : null;
  const pwHash = isPrivate ? await hashPassword(String(data.post_password), salt) : null;

  const result = await env.BOARD_DB.prepare(
    `INSERT INTO posts (kind, name, email, org, title, message, is_private, created_at, post_pw_hash, post_pw_salt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(kind, name, email, org || null, title, message, isPrivate, createdAt, pwHash, salt)
    .run();

  return json({ success: true, id: result.meta.last_row_id }, 200);
}
