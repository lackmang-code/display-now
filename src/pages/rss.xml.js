import rss from '@astrojs/rss';
import { getPublishedArticles, articleHref } from '../lib/articles';
import { SECTIONS } from '../lib/sections';

export async function GET(context) {
  const articles = await getPublishedArticles();

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
    // 🚨 이 사이트는 `trailingSlash:'never'` 라 정규 주소에 끝 슬래시가 없다.
    // 이 옵션이 없으면 @astrojs/rss 가 링크와 guid에 슬래시를 붙여 308로 새는 주소를
    // 피드에 싣는다(구독기는 guid로 같은 글인지 가른다 — 정규 주소로 실어야 한다).
    trailingSlash: false,
    customData: '<language>ko-kr</language>',
  });
}
