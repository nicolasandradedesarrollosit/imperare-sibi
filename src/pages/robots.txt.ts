import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const news = new URL('news-sitemap.xml', site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
Sitemap: ${news}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
