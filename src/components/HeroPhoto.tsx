/**
 * The photo in a page's hero slot (.hero__media), used on Home and About.
 *
 * The slot is always 560px tall and 358-977px wide depending on the screen
 * (measured), so a 3:2 photo set to cover always renders 840-977px wide.
 * `sizes` says that, so the browser picks the file for the rendered width
 * rather than the narrower box. The <img> is absolutely positioned inside a
 * box sized by CSS alone, so the photo can never shift layout as it loads.
 *
 * Loading: eager, but fetchpriority="low". On desktop the photo is the LCP
 * element and must be found at parse time; on phones it sits below the fold and
 * the LCP is the headline text. Measured (Lighthouse, median of 5):
 *   fetchpriority="high"  phone LCP 2.12s, desktop 0.42s, About phone score 94
 *   fetchpriority="low"   phone LCP 1.44s, desktop 0.34s, all scores 100
 * High priority made the photo compete with the fonts the headline needs.
 */
import Picture from './Picture';

interface Props {
  /** Source file name in src/assets (no extension). */
  name: string;
  alt: string;
  /** CSS object-position, to keep the subject in frame when cover crops it. */
  position?: string;
}

export default function HeroPhoto({ name, alt, position = '50% 50%' }: Props) {
  return (
    <Picture
      name={name}
      alt={alt}
      sizes="(min-width: 65rem) 840px, (min-width: 56.5rem) calc(100vw - 3rem), 840px"
      loading="eager"
      fetchPriority="low"
      style={{ objectPosition: position }}
      className="hero__photo"
    />
  );
}
