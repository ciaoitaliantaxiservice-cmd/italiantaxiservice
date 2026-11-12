import type { NextConfig } from 'next';

/**
 * Fully static site: `next build` writes plain HTML files to ./dist, one
 * folder per page (trailingSlash keeps every URL exactly as before, e.g.
 * /en/about/). ./dist is the folder the site has always deployed from, so
 * the host's build settings need no change. Node 20.9+ (see .nvmrc).
 */
const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  // Photos are pre-sized by scripts/build-assets.mjs (WebP, fixed widths).
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Bilingual root 404 (/404.html): the site has two root layouts (the
    // language gate and /[lang]), so the 404 is its own full document.
    globalNotFound: true,
  },
};

export default nextConfig;
