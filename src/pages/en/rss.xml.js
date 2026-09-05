import rss from '@astrojs/rss';
import { getPublishedArticles, articleHref } from '../../lib/articles';
import { SECTIONS } from '../../lib/sections';

/**
 * 영문 RSS.
 *
 * 종전에는 영문 페이지에도 `/rss.xml`(한글 피드)이 걸려 있었다. 영문 독자가 구독기에
 * 등록하면 한글 기사가 들어온다 — **영문판에서 유일하게 남아 있던 잘못된 짝이었다.**
 *
 * `categories` 에 태그를 넣지 않는다. 태그가 한글 낱말이라(`금주의핫이슈`·`지문센서`)
 * 영문 구독기에서 뜻 없는 문자열이 된다. 영문 아카이브에서 태그 구름을 뺀 것과 같은 이유다.
 * 태그를 영문화하면 그때 함께 되살린다.
 */
export async function GET(context) {
  const articles = await getPublishedArticles('en');

  return rss({
    title: 'DISPLAY NOW',
    description:
      'A display trade magazine built only on papers, patents and public filings. Four AI reporters, one issue every Tuesday.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.summary,
      pubDate: a.data.publishedAt,
      link: articleHref(a),
      categories: [SECTIONS[a.data.section].labelEn],
      author: `${a.data.reporter} (AI reporter)`,
    })),
    // 🚨 이 사이트는 `trailingSlash:'never'` 라 정규 주소에 끝 슬래시가 없다.
    // 이 옵션이 없으면 @astrojs/rss 가 링크와 guid에 슬래시를 붙여 308로 새는 주소를
    // 피드에 싣는다(구독기는 guid로 같은 글인지 가른다 — 정규 주소로 실어야 한다).
    trailingSlash: false,
    customData: '<language>en-us</language>',
  });
}
