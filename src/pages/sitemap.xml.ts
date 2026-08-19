import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SECTION_ORDER } from '../lib/sections';
import { ISSUES } from '../lib/issues';

const STATIC_PATHS = ['/', '/editorial', '/archive', '/issue', '/subscribe', '/board', '/privacy', '/terms'];

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://display-now.nextio.ai.kr');
  const articles = await getCollection('articles');

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
