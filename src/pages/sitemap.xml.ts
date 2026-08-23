import type { APIRoute } from 'astro';
import { SECTION_ORDER } from '../lib/sections';
import { ISSUES } from '../lib/issues';
import { getPublishedArticles } from '../lib/articles';

const STATIC_PATHS = ['/', '/editorial', '/archive', '/issue', '/subscribe', '/board', '/privacy', '/terms'];

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://display-now.nextio.ai.kr');
  // 발행 예정 기사는 색인 대상이 아니다. 검색엔진에 미리 알리면 발행 전에 노출된다
  const articles = await getPublishedArticles();

  const urls = [
    ...STATIC_PATHS,
    ...SECTION_ORDER.map((key) => `/section/${key}`),
    ...ISSUES.map((i) => `/issue/${i.no}`),
    ...articles.map((a) => `/article/${a.slug}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, base).toString()}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
