import { preload } from 'react-dom';

/** All three faces render above the fold (hero headline, body, labels), so
 *  all three are preloaded to keep the swap off the critical path. */
export function preloadFonts() {
  for (const href of [
    '/fonts/cormorant-garamond-latin-500.woff2',
    '/fonts/cormorant-garamond-latin-600.woff2',
    '/fonts/manrope-latin-wght.woff2',
  ]) {
    preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  }
}
