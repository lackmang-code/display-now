import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS, formatByline } from './sections';

export type Article = CollectionEntry<'articles'>;

/**
 * 기사 전부. **발행 예정분(미래 날짜)도 포함한다.**
 *
 * 호 편성·표지 카드처럼 **발행 전에 만들어 둬야 하는 것**이 이 함수를 쓴다.
 * 독자에게 보이는 목록에는 {@link getPublishedArticles}를 쓴다.
 */
export type Lang = 'ko' | 'en';

/** 기사의 언어. 프론트매터에 없으면 한글로 본다. */
export function langOf(a: Article): Lang {
  return (a.data.lang ?? 'ko') as Lang;
}

export async function getAllArticles(lang: Lang | 'all' = 'ko'): Promise<Article[]> {
  const all = await getCollection('articles');
  const scoped = lang === 'all' ? all : all.filter((a) => (a.data.lang ?? 'ko') === lang);
  return scoped.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

/**
 * **빌드 시점(한국 시각) 기준으로 이미 발행일이 된 기사만.**
 *
 * 테커·클레임은 수집 주간 개념이 없어 기사를 미리 써 둔다. 그런데 완성될 때마다 push하면
 * `publishedAt`이 며칠 뒤인 기사가 그날로 라이브에 떠 버린다. 목록에서 걸러 두면
 * **완성되는 대로 push해도 안전하고, 발행일에 재빌드만 하면 저절로 올라온다.**
 *
 * **UTC가 아니라 한국 날짜로 비교한다.** `publishedAt`은 `2026-08-25` 같은 날짜만 있는 값이라
 * UTC 자정으로 파싱되는데, 그대로 비교하면 한국 시각 8월 25일 오전 9시가 되어야 공개된다.
 * 발행일 아침에 올리는 운영과 어긋나므로 날짜 문자열끼리 비교한다.
 *
 * **정적 사이트라 판단은 빌드 시점에 한 번만 일어난다.** 발행일이 됐다고 저절로 나타나지
 * 않는다. 그날 push하거나 Cloudflare Pages에서 재배포해야 한다. 어차피 호를 낼 때 push하므로
 * 절차가 늘지는 않는다.
 */
export async function getPublishedArticles(lang: Lang | 'all' = 'ko'): Promise<Article[]> {
  const all = await getAllArticles(lang);
  const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
  const todayKst = new Date(Date.now() + KST_OFFSET_MS).toISOString().slice(0, 10);
  return all.filter((a) => a.data.publishedAt.toISOString().slice(0, 10) <= todayKst);
}

/** 꼭지 목록. 발행된 것만 보여준다 */
export async function getArticlesBySection(section: string, lang: Lang = 'ko'): Promise<Article[]> {
  const all = await getPublishedArticles(lang);
  return all.filter((a) => a.data.section === section);
}

export function readingLabel(a: Article): string {
  return langOf(a) === 'en' ? `${a.data.readingMinutes} min` : `${a.data.readingMinutes}분`;
}

export function bylineOf(a: Article): string {
  return formatByline(a.data.reporter, a.data.publishedAt, langOf(a));
}

export function dateLabel(a: Article, format: 'short' | 'dot' = 'dot'): string {
  const d = a.data.publishedAt;
  const y = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return format === 'short' ? `${mm}.${dd}` : `${y}.${mm}.${dd}`;
}

export function sectionLabel(a: Article): string {
  const s = SECTIONS[a.data.section];
  return langOf(a) === 'en' ? s.labelEn : s.label;
}

/**
 * 한글판과 영문판을 잇는 열쇠.
 *
 * 영문판은 `src/content/articles/en/<한글판 slug>.md`에 두므로 Astro가 준 slug가
 * `en/2026-09-08-foo`가 된다. 짝을 찾을 때는 이 접두사를 뗀 값을 쓴다.
 * `translationOf`를 적어 두면 그 값이 우선한다.
 */
export function baseSlug(a: Article): string {
  return a.data.translationOf ?? a.slug.replace(/^en\//, '');
}

export function articleHref(a: Article): string {
  return langOf(a) === 'en' ? `/en/article/${baseSlug(a)}` : `/article/${a.slug}`;
}

/**
 * 반대 언어판. **없으면 undefined** — 전환 버튼도 hreflang도 그때는 달지 않는다.
 *
 * 버튼을 헤더에 전역으로 달면 영문판이 없는 페이지에서 404가 된다. 짝이 실제로
 * 존재하는 페이지에만 뜨게 하는 것이 이 함수의 존재 이유다.
 */
export async function counterpartOf(a: Article): Promise<Article | undefined> {
  const key = baseSlug(a);
  const other: Lang = langOf(a) === 'en' ? 'ko' : 'en';
  const all = await getAllArticles(other);
  return all.find((x) => baseSlug(x) === key);
}

/**
 * 기사 본문에 실제로 쓰인 첫 이미지 경로를 뽑는다.
 *
 * 표지·호 목차의 시각자료로 쓴다. 프론트매터에 따로 필드를 두지 않는 것은,
 * 기자가 기사에 이미 넣은 자료(원발행사 자료·특허 도면·시뮬레이션 캡처)를
 * 그대로 쓰는 것이 이 매체의 시각자료 원칙에 맞기 때문이다.
 */
export function leadImage(a: Article): string | undefined {
  const body = a.body ?? '';
  const candidates: Array<{ at: number; src: string }> = [];

  const md = body.match(/!\[[^\]]*\]\((\/[^)\s]+)\)/);
  if (md?.index !== undefined && md[1]) candidates.push({ at: md.index, src: md[1] });

  const html = body.match(/<img[^>]+src="(\/[^"]+)"/);
  if (html?.index !== undefined && html[1]) candidates.push({ at: html.index, src: html[1] });

  if (candidates.length === 0) return undefined;
  return candidates.sort((x, y) => x.at - y.at)[0].src;
}
