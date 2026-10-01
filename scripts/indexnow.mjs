// IndexNow (https://www.indexnow.org): tells Bing, Yandex and the engines that share
// their index which URLs are new or updated, so they are crawled within minutes.
// Google does not take part; it relies on the sitemaps.
//
// Runs at the end of `npm run build`, but only submits on Vercel production deploys.
// It reads the sitemap that was just built and sends the home page plus every article
// published or updated in the last two days. It never fails the build.
//
// The key is public by design: it must match public/<KEY>.txt, which proves ownership.
import { existsSync, readFileSync } from 'node:fs';

const KEY = 'ba286b53722dc84c9aa3ade86fb8c09c';
const SITEMAP = 'dist/sitemap-0.xml';
const RECENT_MS = 2 * 24 * 60 * 60 * 1000;

if (process.env.VERCEL_ENV !== 'production') {
  console.log('[indexnow] skipped (not a production deploy)');
  process.exit(0);
}

try {
  if (!existsSync(SITEMAP)) throw new Error(`${SITEMAP} not found`);
  const entries = [...readFileSync(SITEMAP, 'utf8').matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)];
  if (entries.length === 0) throw new Error('no URLs in the sitemap');

  const origin = new URL(entries[0][1]).origin;
  const since = Date.now() - RECENT_MS;
  const recent = entries.filter(([, , lastmod]) => lastmod && Date.parse(lastmod) >= since).map(([, loc]) => loc);

  if (recent.length === 0) {
    console.log('[indexnow] nothing published or updated in the last two days');
    process.exit(0);
  }

  const urlList = [`${origin}/`, ...recent];
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
  });
  console.log(`[indexnow] submitted ${urlList.length} URLs: HTTP ${response.status}`);
} catch (error) {
  console.warn(`[indexnow] not submitted: ${error instanceof Error ? error.message : error}`);
}
