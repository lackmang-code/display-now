import { json, publicView } from './_lib.js';

export async function onRequestGet({ env }) {
  if (!env.BOARD_DB) {
    return json({ success: false, error: 'db_not_bound' }, 500);
  }

  // 이메일은 절대 공개 목록에 싣지 않는다. SELECT 자체에서 뺀다
  const { results } = await env.BOARD_DB.prepare(
    `SELECT id, kind, name, title, message, is_private, created_at, reply, replied_at
     FROM posts ORDER BY id DESC LIMIT 100`
  ).all();

  return json({ success: true, posts: results.map(publicView) }, 200);
}
