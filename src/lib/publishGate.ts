/**
 * 발행 게이트 날짜 — 이 날짜(포함)까지의 `publishedAt`만 공개한다. 기사 목록과 호 목록이 함께 쓴다.
 *
 * **발행 전날 밤 9시(한국 시각)부터 다음 날 발행분이 열린다**(2026-11-16 대표 「12시에 하니깐 너무 늦다.
 * 전날 저녁 9시에 재빌드하자」). 한국 시각에 3시간을 더해 날짜를 자른다 — 21:00 KST 이후 빌드는
 * 다음 날짜로 판단한다. 재빌드는 작업 스케줄러가 발행 전날 21:00에 돌린다(`tools/midnight_rebuild.ps1`).
 *
 * 정적 사이트라 판단은 빌드할 때 한 번만 일어난다. 21:00 전 빌드는 종전처럼 그날 날짜까지만 연다.
 */
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const EARLY_OPEN_MS = 3 * 60 * 60 * 1000;

export function publishGateDate(): string {
  return new Date(Date.now() + KST_OFFSET_MS + EARLY_OPEN_MS).toISOString().slice(0, 10);
}
