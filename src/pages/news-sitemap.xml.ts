import type { APIRoute } from 'astro';
import { getPublishedArticles, articleHref, langOf, publishedIsoKst } from '../lib/articles';

/**
 * 구글 뉴스 사이트맵 (2026-09-29 신설).
 *
 * 구글 뉴스는 신청 절차 없이 검색 색인에서 자동으로 고른다(2024-04 퍼블리셔 센터 수동 추가 폐지).
 * 이 파일은 「새 기사가 여기 있다」를 빨리 알리는 통로다. 구글 규격상 **최근 이틀 안에 발행한 기사만**
 * 넣는다 — 그보다 오래된 항목은 뉴스 사이트맵에서 무시된다. 주 1회 호 발행 때 빌드되므로
 * 화요일 0시 재빌드 직후엔 그 호 기사(한·영)가 담기고, 다음 빌드 전까진 그대로 남는다.
 */
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://display-now.nextio.ai.kr');
  const now = Date.now();
  const all = await getPublishedArticles('all');
  const recent = all.filter((a) => now - Date.parse(publishedIsoKst(a)) <= WINDOW_MS);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recent
  .map((a) => {
    const lang = langOf(a);
    const title = a.data.searchTitle ?? a.data.title;
    return `  <url>
    <loc>${new URL(articleHref(a), base).toString()}</loc>
    <news:news>
      <news:publication><news:name>DISPLAY NOW</news:name><news:language>${lang}</news:language></news:publication>
      <news:publication_date>${publishedIsoKst(a)}</news:publication_date>
      <news:title>${esc(title)}</news:title>
    </news:news>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
