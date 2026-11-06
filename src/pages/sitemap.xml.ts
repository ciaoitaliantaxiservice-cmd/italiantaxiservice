import type { APIRoute } from 'astro';
import { routes, LANGS, X_DEFAULT_LANG, type Lang, type RouteKey } from '../data/i18n';
import { absolute, CITY_PAGES_INDEXABLE } from '../data/seo';
import { cities, cityPath } from '../data/cities';

/**
 * Hand-rolled rather than @astrojs/sitemap so that:
 *  - every entry carries a full xhtml:link alternate set including x-default;
 *  - noindex pages are excluded by construction, not by a filter that can drift
 *    (the language gate at `/`, both 404s, and city stubs while they are stubs).
 *
 * A URL must never be both noindex and in the sitemap, so the single
 * CITY_PAGES_INDEXABLE flag in src/data/seo.ts drives both.
 */

interface Entry {
  /** Equivalent URL path per language. */
  paths: Record<Lang, string>;
  priority: string;
  changefreq: string;
}

const indexableRoutes: RouteKey[] = ['home', 'locations', 'about', 'contact'];

const entries: Entry[] = indexableRoutes.map((key) => ({
  paths: { en: routes[key].en, it: routes[key].it },
  priority: key === 'home' ? '1.0' : '0.8',
  changefreq: 'monthly',
}));

if (CITY_PAGES_INDEXABLE) {
  for (const city of cities) {
    entries.push({
      paths: { en: cityPath(city, 'en'), it: cityPath(city, 'it') },
      priority: '0.7',
      changefreq: 'monthly',
    });
  }
}

function alternateLinks(paths: Record<Lang, string>): string {
  const links = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(paths[l])}"/>`
  );
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(
      paths[X_DEFAULT_LANG]
    )}"/>`
  );
  return links.join('\n');
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = entries
    .flatMap((entry) =>
      LANGS.map((lang) =>
        [
          '  <url>',
          `    <loc>${absolute(entry.paths[lang])}</loc>`,
          alternateLinks(entry.paths),
          `    <lastmod>${lastmod}</lastmod>`,
          `    <changefreq>${entry.changefreq}</changefreq>`,
          `    <priority>${entry.priority}</priority>`,
          '  </url>',
        ].join('\n')
      )
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
