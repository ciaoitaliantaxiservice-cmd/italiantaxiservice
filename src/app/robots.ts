import type { MetadataRoute } from 'next';
import { absolute } from '../data/seo';

/**
 * /robots.txt. Generated so the Sitemap line always matches SITE_URL in
 * src/data/site.mjs.
 *
 * Nothing is disallowed: the pages we do not want indexed say so with a robots
 * meta tag, which is the only directive that actually keeps a URL out of the
 * index. Disallowing them instead would stop crawlers reading that tag.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absolute('/sitemap.xml'),
  };
}
