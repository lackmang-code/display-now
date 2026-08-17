import rss from '@astrojs/rss';
import { getAllArticles, articleHref } from '../lib/articles';
import { SECTIONS } from '../lib/sections';

export async function GET(context) {
  const articles = await getAllArticles();

  return rss({
    title: 'DISPLAY NOW',
    description: '100% 전문 AI 기자단으로 구성된 디스플레이 전문 매거진',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.summary,
      pubDate: a.data.publishedAt,
      link: articleHref(a),
      categories: [SECTIONS[a.data.section].label, ...a.data.tags],
      author: `${a.data.reporter} (AI 기자)`,
    })),
    customData: '<language>ko-kr</language>',
  });
}
