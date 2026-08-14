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
