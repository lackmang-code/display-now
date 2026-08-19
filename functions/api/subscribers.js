// 구독자 관리 API. /admin 페이지 전용.
// 넥스트아이오 홈페이지 문의 게시판(functions/api/board/admin.js)과 같은 방식으로,
// 환경변수 ADMIN_PASSWORD 와 대조해 통과한 요청에만 응답한다.
//
// 구독자 명단은 개인정보라 공개 목록(list.js에 해당하는 것)을 두지 않는다.
// 게시판과 다른 점은 이 한 가지다.
export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'invalid_json' }, 400);
  }

  // 비밀번호가 설정돼 있지 않으면 열지 않는다. 미설정을 통과로 처리하면 명단이 공개된다
  if (!env.ADMIN_PASSWORD) {
    return json({ success: false, error: 'admin_not_configured' }, 503);
  }

  if (!data.password || data.password !== env.ADMIN_PASSWORD) {
    return json({ success: false, error: 'unauthorized' }, 401);
  }

  if (!env.SUBSCRIBERS) {
    return json({ success: false, error: 'kv_not_bound' }, 500);
  }

  if (data.action === 'list') {
    const keys = [];
    let cursor;
    do {
      const page = await env.SUBSCRIBERS.list({ cursor, limit: 1000 });
      keys.push(...page.keys.map((k) => k.name));
      cursor = page.list_complete ? undefined : page.cursor;
    } while (cursor && keys.length < 2000);

    const subscribers = [];
    // KV get은 키 하나당 한 번씩이라 한꺼번에 너무 많이 던지지 않게 끊어서 읽는다
    for (let i = 0; i < keys.length; i += 50) {
      const chunk = keys.slice(i, i + 50);
      const values = await Promise.all(
        chunk.map(async (k) => {
          try {
            const v = await env.SUBSCRIBERS.get(k, { type: 'json' });
            return v && v.email ? v : { email: k, subscribedAt: null, legacy: true };
          } catch {
            return { email: k, subscribedAt: null, broken: true };
          }
        })
      );
      subscribers.push(...values);
    }

    subscribers.sort((a, b) => String(b.subscribedAt || '').localeCompare(String(a.subscribedAt || '')));

    return json({ success: true, total: subscribers.length, subscribers }, 200);
  }

  if (data.action === 'delete') {
    const email = String(data.email || '').trim().toLowerCase();
    if (!email) return json({ success: false, error: 'missing_email' }, 400);
    await env.SUBSCRIBERS.delete(email);
    return json({ success: true }, 200);
  }

  return json({ success: false, error: 'unknown_action' }, 400);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
