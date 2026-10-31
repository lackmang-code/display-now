import fs from 'node:fs';

/**
 * 호 표지 썸네일 경로. 포스터 원본(`issue-N-poster.png`, 2000×3000·약 0.5MB)은 목록·홈에 무거워
 * 600×900 webp(`issue-N-poster-thumb.webp`, 약 50KB)를 쓴다.
 * 썸네일을 아직 안 만든 호는 원본으로 대신한다 — 그림이 비는 일은 없게. 빌드 때(`site/`에서) 판정한다.
 */
export function issueThumbSrc(no: number): string {
  const thumb = `/issues/issue-${no}-poster-thumb.webp`;
  return fs.existsSync(`public${thumb}`) ? thumb : `/issues/issue-${no}-poster.png`;
}
