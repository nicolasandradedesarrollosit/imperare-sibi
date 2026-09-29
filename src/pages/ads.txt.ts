import type { APIRoute } from 'astro';
import { ADSENSE } from '../config/site';

/**
 * Authorized Digital Sellers file required by AdSense. Built from the configured
 * client id (ca-pub-XXXX → pub-XXXX); empty until AdSense is set up.
 */
export const GET: APIRoute = () => {
  const publisher = ADSENSE.client.replace(/^ca-/, '');
  const body = publisher ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n` : '';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
