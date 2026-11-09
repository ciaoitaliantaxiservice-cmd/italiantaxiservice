/**
 * Converts every piece of lettering in the logo and the Open Graph card into
 * plain SVG outlines, so no file that carries the brand needs a font.
 *
 *   npm run icons      (runs this first, then make-icons.mjs)
 *
 * Output: src/data/logo-outlines.json, read by src/data/logo.mjs. Commit it:
 * the site build only reads the JSON and never needs the font files.
 *
 * The glyphs come straight from the brand fonts (via fontkitten, which reads
 * the woff/woff2 files fontsource installs). fontkitten does not apply the
 * fonts' kerning, so the pairs that occur in these strings are listed in KERN
 * below. Those values were measured from the fonts themselves in Chrome
 * (canvas measureText with font-kerning normal vs none, at 1000px), so they
 * are the fonts' own GPOS kerning, not guesses. If a string changes, measure
 * any new pairs the same way.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { create } from 'fontkitten';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = (p) => readFileSync(join(root, 'node_modules', p));

const cormorant700 = create(nm('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff'));
const cormorant600 = create(nm('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff'));
// Static cuts of the same Manrope the site serves as a variable font:
// fontkitten cannot instance a variable font, so it reads these instead.
const manrope700 = create(nm('@fontsource/manrope/files/manrope-latin-700-normal.woff'));
const manrope400 = create(nm('@fontsource/manrope/files/manrope-latin-400-normal.woff'));

/** Pair kerning in thousandths of an em, measured from each font's GPOS. */
const KERN = {
  cormorant700: { AO: -12, TA: -70, RV: -70 },
  cormorant600: { Ta: -70, ce: -6 },
  manrope700: { VA: -70, AT: -60, TA: -20, OT: -20, YO: -40, AV: -70 },
  manrope400: {
    va: -30, te: -20, ra: -20, fe: -20, rs: -20, nd: -3, re: -10, ro: -10,
    os: -5, Tr: -50, to: -20, co: -15,
  },
};

const r2 = (n) => Math.round(n * 100) / 100;

/** Lays a string out on a straight baseline: one entry per glyph. */
function layout(font, kern, text, size, tracking = 0) {
  const k = size / font.unitsPerEm;
  const glyphs = [];
  let x = 0;
  for (let i = 0; i < text.length; i++) {
    const glyph = font.glyphForCodePoint(text.codePointAt(i));
    const adv = glyph.advanceWidth * k;
    glyphs.push({ glyph, x, adv });
    x += adv + tracking;
    const pair = text.slice(i, i + 2);
    if (pair.length === 2 && kern[pair]) x += (kern[pair] / 1000) * size;
  }
  // Tracking after the last letter is not part of the visible width.
  return { glyphs, width: x - tracking, k };
}

/** Writes a glyph's outline through an affine map (a b c d e f). */
function glyphPath(glyph, [a, b, c, d, e, f]) {
  const map = (x, y) => `${r2(a * x + c * y + e)} ${r2(b * x + d * y + f)}`;
  let out = '';
  for (const { command, args } of glyph.path.commands) {
    if (command === 'moveTo') out += `M${map(args[0], args[1])}`;
    else if (command === 'lineTo') out += `L${map(args[0], args[1])}`;
    else if (command === 'quadraticCurveTo') out += `Q${map(args[0], args[1])} ${map(args[2], args[3])}`;
    else if (command === 'bezierCurveTo') out += `C${map(args[0], args[1])} ${map(args[2], args[3])} ${map(args[4], args[5])}`;
    else if (command === 'closePath') out += 'Z';
  }
  return out;
}

/** A line of text on a straight baseline at y = 0, starting at x = 0. */
function straight(font, kern, text, size, tracking = 0) {
  const { glyphs, width, k } = layout(font, kern, text, size, tracking);
  const d = glyphs.map(({ glyph, x }) => glyphPath(glyph, [k, 0, 0, -k, x, 0])).join('');
  return { d, width: r2(width), size };
}

/**
 * Sets text centred along a quadratic curve, the way SVG textPath does with
 * text-anchor middle: each glyph's centre sits on the curve, its baseline on
 * the tangent there.
 */
function onCurve(font, kern, text, size, tracking, [x0, y0, cx, cy, x1, y1]) {
  const at = (t) => {
    const u = 1 - t;
    return {
      x: u * u * x0 + 2 * u * t * cx + t * t * x1,
      y: u * u * y0 + 2 * u * t * cy + t * t * y1,
      dx: 2 * u * (cx - x0) + 2 * t * (x1 - cx),
      dy: 2 * u * (cy - y0) + 2 * t * (y1 - cy),
    };
  };
  // Arc-length table, fine enough for sub-hundredth placement.
  const N = 4000;
  const lens = [0];
  let prev = at(0);
  for (let i = 1; i <= N; i++) {
    const p = at(i / N);
    lens.push(lens[i - 1] + Math.hypot(p.x - prev.x, p.y - prev.y));
    prev = p;
  }
  const total = lens[N];
  const pointAt = (s) => {
    let lo = 0, hi = N;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (lens[mid] < s) lo = mid; else hi = mid;
    }
    const t = (lo + (s - lens[lo]) / (lens[hi] - lens[lo] || 1)) / N;
    return at(t);
  };

  const { glyphs, width, k } = layout(font, kern, text, size, tracking);
  const start = (total - width) / 2;
  const d = glyphs
    .map(({ glyph, x, adv }) => {
      const p = pointAt(start + x + adv / 2);
      const len = Math.hypot(p.dx, p.dy);
      const cos = p.dx / len, sin = p.dy / len;
      // translate(p) . rotate . translate(-adv/2, 0) . scale(k, -k)
      const ox = -adv / 2;
      return glyphPath(glyph, [
        cos * k, sin * k, sin * k, -cos * k,
        p.x + cos * ox, p.y + sin * ox,
      ]);
    })
    .join('');
  return { d, width: r2(width), size };
}

const outlines = {
  // The emblem's ribbon: Cormorant Garamond Bold, 11 units, +0.6 tracking,
  // centred on the ribbon's middle curve (from the approved reference SVG).
  ribbon: onCurve(cormorant700, KERN.cormorant700, 'CIAO ITALIAN TAXI SERVICE', 11, 0.6, [8, 167.5, 100, 213.5, 192, 167.5]),
  // Horizontal lockup, set at 100 units and scaled where it is used.
  wordmark: straight(cormorant600, KERN.cormorant600, 'Ciao Italian Taxi Service', 100),
  tagline: {
    en: straight(manrope700, KERN.manrope700, 'PRIVATE TRANSFERS · ITALIA', 100, 20),
    it: straight(manrope700, KERN.manrope700, 'TRANSFER PRIVATI · ITALIA', 100, 20),
  },
  // Open Graph card, at the card's own sizes.
  og: {
    title: straight(cormorant600, KERN.cormorant600, 'Ciao Italian Taxi Service', 68),
    en: straight(manrope400, KERN.manrope400, 'Private transfers and chauffeured rides across Italy', 28),
    it: straight(manrope400, KERN.manrope400, 'Transfer privati e auto con autista in tutta Italia', 28),
    kicker: straight(manrope700, KERN.manrope700, 'FIXED QUOTE BEFORE YOU TRAVEL', 20, 2.8),
  },
};

const out = join(root, 'src', 'data', 'logo-outlines.json');
writeFileSync(out, JSON.stringify(outlines, null, 1) + '\n');
console.log(`wrote src/data/logo-outlines.json (${(JSON.stringify(outlines).length / 1024).toFixed(1)} KB)`);
