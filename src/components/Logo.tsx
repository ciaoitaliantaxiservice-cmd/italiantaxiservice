/**
 * The brand mark as inline SVG, built from the shared geometry in
 * src/data/logo.mjs (the same source as every master and icon file).
 *
 * Variants:
 *   mark     plain ribbon, no lettering: the header reading (64px wide)
 *   emblem   ribbon with the name in outlines: only 150px wide and up
 *
 * The lettered emblem as an image (footer, gate pages) is LogoEmblem.tsx, an
 * <img> of a cached file: its outlined name is about 20 KB of path data,
 * which should not be inlined into every page.
 *
 * In the header the mark sits inside a link whose visible wordmark already
 * names it, so by default the SVG is aria-hidden; reading it as well would
 * announce the name twice. Pass `label` where the mark stands alone.
 */
import { emblem, viewBox, VIEWBOX } from '../data/logo.mjs';

interface Props {
  variant?: 'mark' | 'emblem';
  reversed?: boolean;
  label?: string;
  className?: string;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export default function Logo({ variant = 'mark', reversed = false, label, className }: Props) {
  const inner = emblem({ reversed, lettered: variant === 'emblem' });
  // Intrinsic size, so the mark reserves its box before CSS arrives.
  return (
    <svg
      className={className}
      viewBox={viewBox}
      width={VIEWBOX.w}
      height={VIEWBOX.h}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: (label ? `<title>${esc(label)}</title>` : '') + inner }}
    />
  );
}
