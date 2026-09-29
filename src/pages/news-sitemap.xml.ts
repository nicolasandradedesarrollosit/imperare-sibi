import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { articleUrl, getArticles } from '../lib/content';
import { absUrl } from '../lib/seo';

/**
 * Google News sitemap: only articles from the last 2 days (max 1000).
 * Regenerated on every build, so publishing = deploying.
 */
const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export const GET: APIRoute = async () => {
  const since = Date.now() - TWO_DAYS;
  const recent = (await getArticles())
    .filter((a) => !a.data.noindex && a.data.publishedAt.valueOf() >= since)
    .slice(0, 1000);

  const urls = recent
    .map(
      (a) => `  <url>
    <loc>${absUrl(articleUrl(a))}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE.name)}</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${a.data.publishedAt.toISOString()}</news:publication_date>
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
