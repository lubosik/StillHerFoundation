import type { APIRoute } from 'astro';

/**
 * Generated so the Sitemap line always points at the host the site is actually
 * served from. A hardcoded robots.txt pointing at a different domain fails
 * validation and, once the real domain is live, would point crawlers at the
 * wrong place.
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://stillherfoundation.org')).origin;

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
