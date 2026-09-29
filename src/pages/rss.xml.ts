import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, getSection } from '../config/site';
import { articleUrl, getArticles } from '../lib/content';

export async function GET(context: APIContext) {
  const articles = (await getArticles()).filter((a) => !a.data.noindex).slice(0, 50);
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishedAt,
      link: articleUrl(a),
      categories: [getSection(a.data.section)?.name ?? a.data.section, ...a.data.tags],
    })),
    customData: '<language>es-ar</language>',
    trailingSlash: true,
  });
}
