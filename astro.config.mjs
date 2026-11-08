import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/data/site.mjs';

// NOTE: `site` drives canonicals, hreflang and sitemap.xml.
// Change SITE_URL in src/data/site.mjs when the production domain is confirmed.
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
  // Tailwind CSS v4 via its Vite plugin, which is what `astro add tailwind`
  // sets up for Tailwind 4. The entry stylesheet is src/styles/main.css.
  vite: { plugins: [tailwindcss()] },
});
