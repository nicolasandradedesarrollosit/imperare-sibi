import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, getSeccion } from '../config/site';
import { articuloUrl, getArticulos } from '../lib/content';

export async function GET(context: APIContext) {
  const articulos = (await getArticulos()).filter((a) => !a.data.noindex).slice(0, 50);
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articulos.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publicado,
      link: articuloUrl(a),
      categories: [getSeccion(a.data.seccion)?.nombre ?? a.data.seccion, ...a.data.tags],
    })),
    customData: `<language>es-ar</language>`,
    trailingSlash: true,
  });
}
