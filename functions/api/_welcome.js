// 구독 환영 메일.
//
// 왜 필요한가 — 2026-09-01 제3호에서 실제로 사고가 났다. 메일을 08:27에 보내고
// 카카오·링크드인을 08:54·09시에 올렸는데, 그 SNS를 보고 들어온 8명은 발송이 끝난
// 뒤에 신청해서 그 호를 받지 못했다. 확인 메일조차 없어 접수 여부도 알 수 없었다.
// 한 분이 "신청했는데 안 온다"고 연락해서야 알았고, 8명에게 손으로 다시 보냈다.
//
// 화요일 오전에 메일을 보내고 SNS를 그 뒤에 올리는 한 이 일은 매주 반복된다.
// 구독 즉시 최신호를 보내면 구멍이 사라진다.
//
// ── 발송 수단에 관하여 ────────────────────────────────────────────────
// Cloudflare Workers/Pages Functions에서는 **SMTP를 쓸 수 없다.** 런타임이 메일
// 포트 아웃바운드를 실질적으로 막는다. 네이버웍스(info@nextio.ai.kr)에 앱 비밀번호를
// 발급받아도 여기서는 소용이 없다. HTTP API를 쓰는 서비스가 있어야 한다.
//
// 여기서는 Resend(https://resend.com)를 쓴다. 무료 한도가 월 3,000통·일 100통이라
// 지금 규모(구독자 35명, 하루 신규 최대 20명 안팎)에는 넉넉하다.
//
// 필요한 환경변수 (Cloudflare Pages → 설정 → 환경 변수)
//   RESEND_API_KEY   필수. 이 값이 없으면 **아무 일도 하지 않는다**(구독 접수는 정상)
//   MAIL_FROM        선택. 기본값 'DISPLAY NOW <info@nextio.ai.kr>'
//                    ⚠️ 이 도메인이 Resend에서 인증돼 있어야 실제로 나간다
//
// 설계 원칙 — **환영 메일 실패가 구독 접수를 망치지 않는다.** 모든 예외를 삼키고,
// 호출부는 waitUntil로 띄워 응답을 붙잡지 않는다.

const SITE = 'https://display-now.nextio.ai.kr';
const DEFAULT_FROM = 'DISPLAY NOW <info@nextio.ai.kr>';

/**
 * @param {object} env      Pages 환경변수
 * @param {string} to       수신자 이메일
 * @param {string} origin   현재 요청의 origin (최신호 JSON을 여기서 읽는다)
 * @returns {Promise<{sent:boolean, reason?:string}>}
 */
export async function sendWelcome(env, to, origin) {
  const key = env && env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: 'no_api_key' };

  let issue = null;
  try {
    // 자기 사이트의 정적 JSON. 빌드마다 갱신되므로 호수를 코드에 박지 않는다
    const res = await fetch(new URL('/latest-issue.json', origin || SITE).toString(), {
      cf: { cacheTtl: 300 },
    });
    if (res.ok) issue = await res.json();
  } catch {
    issue = null;
  }

  const html = renderWelcome(issue);
  const text = renderWelcomeText(issue);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: (env && env.MAIL_FROM) || DEFAULT_FROM,
        to: [to],
        subject: 'DISPLAY NOW 구독이 시작되었습니다',
        html,
        text,
      }),
    });
    if (!res.ok) return { sent: false, reason: `resend_${res.status}` };
    return { sent: true };
  } catch (e) {
    return { sent: false, reason: 'fetch_failed' };
  }
}

// 본문은 주간호 메일과 같은 구성이다 — 표지 · 읽기 링크 · 매체 소개 · 해지 안내.
// 문구는 `04_Display_Now/뉴스레터_발송_템플릿.md`의 확정본을 따른다.
function renderWelcome(issue) {
  const cover = issue
    ? `<div><a href="${SITE}${issue.href}" target="_blank">` +
      `<img src="${SITE}${issue.poster}" width="275" height="412" ` +
      `style="width:275px;height:412px" alt="DISPLAY NOW 제${issue.no}호 표지"></a><br></div>` +
      `<div><a href="${SITE}${issue.href}" style="font-size:16px;font-weight:bold" ` +
      `target="_blank">▶ 제${issue.no}호 읽기</a></div>`
    : `<div><a href="${SITE}" style="font-size:16px;font-weight:bold" target="_blank">▶ DISPLAY NOW 보기</a></div>`;

  const latestLine = issue
    ? `<div>가장 최근에 나온 제${issue.no}호를 함께 보내드립니다.</div>` +
      `<div>다음 호부터는 매주 화요일에 이 주소로 전해드리겠습니다.</div>`
    : `<div>앞으로 매주 화요일에 이 주소로 전해드리겠습니다.</div>`;

  return (
    `<div dir="ltr">` +
    cover +
    `<div><br></div>` +
    `<div>구독해 주셔서 감사합니다.</div>` +
    `<div>디스플레이 산업 전문 매거진 DISPLAY NOW입니다.</div>` +
    `<div><br></div>` +
    `<div>잘 훈련된 AI 기자 4명과 AI 편집장이 논문·특허·공시 및 한주의 핫이슈 등을 근거로 기사를 씁니다.</div>` +
    `<div>취재나 인터뷰는 하지 않지만, 모든 기사에 근거 목록을 싣습니다.</div>` +
    `<div><br></div>` +
    latestLine +
    `<div><br></div>` +
    `<div>DISPLAY NOW 드림</div>` +
    `<div><br></div>` +
    `<div><span style="color:#888888;font-size:12px">` +
    `구독 해지를 원하시면 이 메일에 회신해 주십시오. 즉시 처리해 드리겠습니다.` +
    `</span></div>` +
    `</div>`
  );
}

function renderWelcomeText(issue) {
  const head = issue
    ? `▶ 제${issue.no}호 읽기 ${SITE}${issue.href}`
    : `▶ DISPLAY NOW ${SITE}`;
  const latestLine = issue
    ? `가장 최근에 나온 제${issue.no}호를 함께 보내드립니다.\n다음 호부터는 매주 화요일에 이 주소로 전해드리겠습니다.`
    : `앞으로 매주 화요일에 이 주소로 전해드리겠습니다.`;

  return [
    head,
    '',
    '구독해 주셔서 감사합니다.',
    '디스플레이 산업 전문 매거진 DISPLAY NOW입니다.',
    '',
    '잘 훈련된 AI 기자 4명과 AI 편집장이 논문·특허·공시 및 한주의 핫이슈 등을 근거로 기사를 씁니다.',
    '취재나 인터뷰는 하지 않지만, 모든 기사에 근거 목록을 싣습니다.',
    '',
    latestLine,
    '',
    'DISPLAY NOW 드림',
    '',
    '구독 해지를 원하시면 이 메일에 회신해 주십시오. 즉시 처리해 드리겠습니다.',
  ].join('\n');
}
