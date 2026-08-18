import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS, formatByline } from './sections';

export type Article = CollectionEntry<'articles'>;

export async function getAllArticles(): Promise<Article[]> {
  const all = await getCollection('articles');
  return all.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function getArticlesBySection(section: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.data.section === section);
}

export function readingLabel(a: Article): string {
  return `${a.data.readingMinutes}분`;
}

export function bylineOf(a: Article): string {
  return formatByline(a.data.reporter, a.data.publishedAt);
}

export function dateLabel(a: Article, format: 'short' | 'dot' = 'dot'): string {
  const d = a.data.publishedAt;
  const y = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return format === 'short' ? `${mm}.${dd}` : `${y}.${mm}.${dd}`;
}

export function sectionLabel(a: Article): string {
  return SECTIONS[a.data.section].label;
}

export function articleHref(a: Article): string {
  return `/article/${a.slug}`;
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
