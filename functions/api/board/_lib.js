// 편집국 게시판 공용 함수.
// 넥스트아이오 홈페이지 문의 게시판(functions/api/board/)과 같은 구조를 따르되,
// 그쪽에서 확인된 결함(대입 시도 무제한, salt 없는 해시, 비밀글 작성자 노출)은 여기서 막는다.
export const KINDS = ['제보', '정정 요청', '광고 문의', '제휴 문의', '기타'];

export const LIMITS = { name: 40, email: 120, org: 80, title: 120, message: 4000 };

// 비밀번호 대입 제한. 한 사람이 한 글에 10분간 5번까지,
// IP를 바꿔 가며 시도하는 경우를 대비해 글 하나당 10분간 20번까지로 묶는다.
export const UNLOCK_LIMIT = { perIp: 5, perPost: 20, windowMs: 10 * 60 * 1000 };

export function makeSalt() {
  const buf = crypto.getRandomValues(new Uint8Array(16));
  return toHex(buf);
}

// salt를 붙여 해시한다. salt가 없으면 예전 방식(순수 SHA-256)으로 계산해
// 이미 저장된 글도 계속 열리게 한다.
export async function hashPassword(pw, salt) {
  const material = salt ? `${salt}:${pw}` : String(pw);
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(material));
  return toHex(new Uint8Array(buf));
}

// 해시 비교는 길이와 무관하게 같은 시간이 걸리도록 한다
export function safeEqual(a, b) {
  const x = String(a || '');
  const y = String(b || '');
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}

function toHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function cap(v, n) {
  return (v == null ? '' : String(v)).trim().slice(0, n);
}

// 비밀글은 작성자 이름도 가린다.
// 내용을 가려도 "누가 언제 문의했는지"가 남으면 그 자체가 정보가 된다.
export function maskName(name) {
  const s = String(name || '').trim();
  if (!s) return '비공개';
  if (s.length === 1) return s;
  return s[0] + '○'.repeat(s.length - 1);
}

export function maskPrivate(p) {
  return {
    id: p.id,
    kind: p.kind,
    name: maskName(p.name),
    title: '비밀글입니다',
    message: null,
    is_private: true,
    created_at: p.created_at,
    answered: Boolean(p.replied_at),
    reply: null,
    replied_at: null,
  };
}

export function publicView(p) {
  if (p.is_private) return maskPrivate(p);
  return {
    id: p.id,
    kind: p.kind,
    name: p.name,
    title: p.title,
    message: p.message,
    is_private: false,
    created_at: p.created_at,
    answered: Boolean(p.replied_at),
    reply: p.reply,
    replied_at: p.replied_at,
  };
}
