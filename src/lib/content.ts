import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;
export type Author = CollectionEntry<'authors'>;

const isPublished = (a: Article) => import.meta.env.DEV || !a.data.draft;

export const byDateDesc = (a: Article, b: Article) =>
  b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();

/** All published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', isPublished);
  return all.sort(byDateDesc);
}

export const articleUrl = (a: Article) => `/${a.data.section}/${a.id}/`;
export const authorUrl = (id: string) => `/autores/${id}/`;
export const sectionUrl = (slug: string) => `/${slug}/`;
export const provinceUrl = (slug: string) => `/edicion/${slug}/`;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const tagUrl = (tag: string) => `/temas/${slugify(tag)}/`;

export const bySection = (articles: Article[], section: string) =>
  articles.filter((a) => a.data.section === section);

export const byProvince = (articles: Article[], province: string) =>
  articles.filter((a) => a.data.province === province);

/**
 * Related articles: scores shared tags (x2) and same section (x1).
 * Feeds internal linking between topic clusters.
 */
export function related(current: Article, articles: Article[], limit = 3): Article[] {
  const tags = new Set(current.data.tags.map(slugify));
  return articles
    .filter((a) => a.id !== current.id)
    .map((a) => {
      const shared = a.data.tags.filter((t) => tags.has(slugify(t))).length;
      return { a, score: shared * 2 + (a.data.section === current.data.section ? 1 : 0) };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score || byDateDesc(x.a, y.a))
    .slice(0, limit)
    .map(({ a }) => a);
}

/**
 * Takes up to `n` articles from `pool` that are not in `used`, and marks them as used.
 * Lets the home page fill every block without repeating a story.
 */
export function take(pool: Article[], used: Set<string>, n: number, filter: (a: Article) => boolean = () => true) {
  const picked = pool.filter((a) => !used.has(a.id) && filter(a)).slice(0, n);
  picked.forEach((a) => used.add(a.id));
  return picked;
}

export const wordCount = (body: string | undefined) => (body ?? '').split(/\s+/).filter(Boolean).length;

/** Estimated reading time in minutes (~200 words/min). */
export const readingTime = (body: string | undefined) => Math.max(1, Math.round(wordCount(body) / 200));
