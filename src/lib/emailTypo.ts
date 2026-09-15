// 구독 신청 이메일의 도메인 오기를 한 번 묻는다.
//
// 🔴 2026-09-15 제5호 발행일에 삼성디스플레이 구독자 두 명이 `samsung.net` 으로 신청해
// 한 명은 발송지연이 났다. 삼성디스플레이는 전원 `samsung.com` 이다(대표 확인).
// 막지는 않는다 — 실제로 그 도메인을 쓰는 사람이 있을 수 있어서 고를 수 있게 한다.
// 새 오기가 보이면 FIXES 에 한 줄 더한다.

const FIXES: Record<string, string> = {
  'samsung.net': 'samsung.com',
};

/** 오기로 보이는 도메인이면 사용자에게 묻고, 고친 주소 또는 원래 주소를 돌려준다. */
export function confirmEmailDomain(email: string, input?: HTMLInputElement | null): string {
  const at = email.lastIndexOf('@');
  if (at < 0) return email;
  const fix = FIXES[email.slice(at + 1).toLowerCase()];
  if (!fix) return email;

  const fixed = email.slice(0, at + 1) + fix;
  const en = document.documentElement.lang === 'en';
  const msg = en
    ? `You entered ${email}.\nSamsung addresses are usually @${fix}.\n\nOK: subscribe as ${fixed}\nCancel: keep ${email} as entered`
    : `입력하신 주소는 ${email} 입니다.\n삼성 메일은 대부분 @${fix} 입니다.\n\n확인: ${fixed} 로 고쳐서 신청\n취소: 입력한 그대로 신청`;

  if (window.confirm(msg)) {
    if (input) input.value = fixed;
    return fixed;
  }
  return email;
}
