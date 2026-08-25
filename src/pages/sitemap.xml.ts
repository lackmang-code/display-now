import type { APIRoute } from 'astro';
import { SECTION_ORDER } from '../lib/sections';
import { getIssues } from '../lib/issues';
import { getPublishedArticles } from '../lib/articles';
import { topicIndex } from '../lib/tags';

const STATIC_PATHS = ['/', '/editorial', '/archive', '/issue', '/subscribe', '/board', '/privacy', '/terms'];

/** 'YYYY-MM-DD' */
function day(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://display-now.nextio.ai.kr');
  // 발행 예정 기사는 색인 대상이 아니다. 검색엔진에 미리 알리면 발행 전에 노출된다
  const articles = await getPublishedArticles();

  // 최신 기사 날짜. 목록 성격의 페이지는 이 날짜에 함께 갱신된다
  const newest = articles.length > 0 ? day(articles[0].data.publishedAt) : undefined;
  const topics = topicIndex(articles);

  const entries: Array<{ path: string; lastmod?: string }> = [
    ...STATIC_PATHS.map((path) => ({ path, lastmod: newest })),
    ...SECTION_ORDER.map((key) => {
      const inSection = articles.filter((a) => a.data.section === key);
      return {
        path: `/section/${key}`,
        lastmod: inSection.length > 0 ? day(inSection[0].data.publishedAt) : newest,
      };
    }),
    { path: '/tag', lastmod: newest },
    ...topics.map((g) => ({
      path: `/tag/${g.topic.slug}`,
      lastmod: day(g.articles[0].data.publishedAt),
    })),
    // 발행 예정 호는 색인 대상이 아니다. 표지 캡처용으로 페이지는 만들지만
    // 사이트맵에 넣으면 발행 전에 검색엔진에 알리는 셈이 된다(기사와 같은 원칙).
    ...getIssues().map((i) => ({ path: `/issue/${i.no}`, lastmod: i.publishedAt })),
    ...articles.map((a) => ({
      path: `/article/${a.slug}`,
      lastmod: day(a.data.publishedAt),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => {
    const loc = `<loc>${new URL(e.path, base).toString()}</loc>`;
    const mod = e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : '';
    return `  <url>${loc}${mod}</url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
