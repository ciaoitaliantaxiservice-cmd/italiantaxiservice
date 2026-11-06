import type { APIRoute } from 'astro';
import { absolute } from '../data/seo';

/**
 * Generated rather than kept in /public so the Sitemap line always matches
 * SITE_URL in src/data/site.mjs — a stale absolute URL here is a classic
 * cause of "sitemap could not be read".
 *
 * Nothing is disallowed: the pages we do not want indexed say so with a robots
 * meta tag, which is the only directive that actually keeps a URL out of the
 * index. Disallowing them instead would stop crawlers reading that tag.
 */
export const GET: APIRoute = () => {
  const body = `# ${absolute('/')}
User-agent: *
Allow: /

Sitemap: ${absolute('/sitemap.xml')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
