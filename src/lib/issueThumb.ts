import fs from 'node:fs';

/**
 * 호 표지 썸네일 경로. 포스터 원본(`issue-N-poster.png`, 2000×3000·약 0.5MB)은 목록·홈에 무거워
 * 600×900 webp(`issue-N-poster-thumb.webp`, 약 50KB)를 쓴다.
 * 썸네일을 아직 안 만든 호는 원본으로 대신한다 — 그림이 비는 일은 없게. 빌드 때(`site/`에서) 판정한다.
 *
 * 영문(`lang='en'`)은 영문 포스터(`issue-N-poster-en.png`)의 썸네일 `issue-N-poster-en-thumb.webp`를
 * 먼저 찾고, 영문 포스터가 없는 호(제1~4·12호)는 한글 썸네일로 떨어진다.
 */
export function issueThumbSrc(no: number, lang: 'ko' | 'en' = 'ko'): string {
  if (lang === 'en') {
    const enThumb = `/issues/issue-${no}-poster-en-thumb.webp`;
    if (fs.existsSync(`public${enThumb}`)) return enThumb;
    const enPoster = `/issues/issue-${no}-poster-en.png`;
    if (fs.existsSync(`public${enPoster}`)) return enPoster;
  }
  const thumb = `/issues/issue-${no}-poster-thumb.webp`;
  return fs.existsSync(`public${thumb}`) ? thumb : `/issues/issue-${no}-poster.png`;
}
