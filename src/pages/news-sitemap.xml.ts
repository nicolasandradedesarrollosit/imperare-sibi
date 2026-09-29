import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { articuloUrl, getArticulos } from '../lib/content';
import { absUrl } from '../lib/seo';

/**
 * Sitemap de Google News: solo notas de los últimos 2 días (máx. 1000).
 * Se regenera en cada build/deploy; publicar = deploy.
 */
const DOS_DIAS = 2 * 24 * 60 * 60 * 1000;

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export const GET: APIRoute = async () => {
  const limite = Date.now() - DOS_DIAS;
  const recientes = (await getArticulos())
    .filter((a) => !a.data.noindex && a.data.publicado.valueOf() >= limite)
    .slice(0, 1000);

  const urls = recientes
    .map(
      (a) => `  <url>
    <loc>${absUrl(articuloUrl(a))}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE.name)}</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${a.data.publicado.toISOString()}</news:publication_date>
      <news:title>${escapeXml(a.data.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
