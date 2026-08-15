const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context) {
  const { request, env } = context;

  let email = '';
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = (body.email || '').toString().trim();
    } else {
      const form = await request.formData();
      email = (form.get('email') || '').toString().trim();
    }
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }

  if (!env.SUBSCRIBERS) {
    return json({ ok: false, error: 'kv_not_bound' }, 500);
  }

  const key = email.toLowerCase();
  await env.SUBSCRIBERS.put(
    key,
    JSON.stringify({ email, subscribedAt: new Date().toISOString() })
  );

  return json({ ok: true }, 200);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
