// 구독 신청 접수.
// 홈 사이드바의 간이 폼(이메일만)과 /subscribe 신청 페이지(항목 전체)가 같은 엔드포인트를 쓴다.
// 저장소는 Workers KV(SUBSCRIBERS). 키는 소문자 이메일 그대로라 기존 구독자와 호환된다.
import { sendWelcome } from './_welcome.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 40, org: 80, role: 40, note: 500 };
const SECTIONS = ['tech-note', 'paper', 'patent', 'issue'];

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  // 봇이 채우고 사람은 못 보는 필드. 값이 있으면 조용히 성공 처리하고 저장하지 않는다
  if (str(body.website)) {
    return json({ ok: true, already: false }, 200);
  }

  const email = str(body.email).trim();
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }

  if (!env.SUBSCRIBERS) {
    return json({ ok: false, error: 'kv_not_bound' }, 500);
  }

  const key = email.toLowerCase();
  const now = new Date().toISOString();

  let existing = null;
  try {
    existing = await env.SUBSCRIBERS.get(key, { type: 'json' });
  } catch {
    existing = null;
  }

  const record = {
    email,
    name: cap(body.name, LIMITS.name),
    org: cap(body.org, LIMITS.org),
    role: cap(body.role, LIMITS.role),
    note: cap(body.note, LIMITS.note),
    interests: normalizeInterests(body.interests),
    source: cap(body.source, 24) || 'unknown',
    subscribedAt: existing?.subscribedAt || now,
    updatedAt: now,
  };

  // 간이 폼(이메일만)으로 다시 신청해도 이미 받아 둔 이름·소속을 지우지 않는다
  if (existing) {
    for (const f of ['name', 'org', 'role', 'note']) {
      if (!record[f] && existing[f]) record[f] = existing[f];
    }
    if (!record.interests.length && Array.isArray(existing.interests)) {
      record.interests = existing.interests;
    }
  }

  await env.SUBSCRIBERS.put(key, JSON.stringify(record));

  // 처음 신청한 사람에게만 환영 메일. 간이 폼으로 다시 넣은 기존 구독자에게는 보내지 않는다.
  //
  // 화요일 오전에 주간호를 보내고 SNS를 그 뒤에 올리므로, 소식을 보고 들어온 사람은
  // 그 호를 받지 못한다(2026-09-01 제3호에서 8명이 그랬다). 여기서 최신호를 바로
  // 보내 그 구멍을 메운다.
  //
  // 발송 실패가 접수를 망치면 안 되므로 waitUntil로 띄우고 응답은 기다리지 않는다.
  // RESEND_API_KEY가 없으면 sendWelcome이 아무 일도 하지 않는다.
  if (!existing) {
    const origin = new URL(request.url).origin;
    const task = sendWelcome(env, email, origin).catch(() => {});
    if (context.waitUntil) context.waitUntil(task);
  }

  return json({ ok: true, already: Boolean(existing) }, 200);
}

function str(v) {
  return v == null ? '' : String(v);
}

function cap(v, n) {
  return str(v).trim().slice(0, n);
}

function normalizeInterests(v) {
  const raw = Array.isArray(v) ? v : str(v).split(',');
  return raw.map((s) => str(s).trim()).filter((s) => SECTIONS.includes(s));
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
