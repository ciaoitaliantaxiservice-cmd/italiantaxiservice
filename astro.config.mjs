import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/data/site.mjs';

// NOTE: `site` drives canonicals, hreflang and sitemap.xml.
// Change SITE_URL in src/data/site.mjs when the production domain is confirmed.
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
