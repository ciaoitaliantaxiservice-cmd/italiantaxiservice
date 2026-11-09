/**
 * Writes brand/logo-usage-sheet.html: the one-page logo usage sheet (clear
 * space, minimum sizes, colour versions), built from the same geometry as
 * every logo file. Render it to PNG/PDF with any browser's print or a
 * screenshot; the committed brand/logo-usage-sheet.png and .pdf were made
 * that way in headless Chrome at 1600x1000.
 *
 *   node scripts/make-usage-sheet.mjs
 *
 * The page loads the brand fonts from /fonts/, so open it through a server
 * rooted at public/ (e.g. `npx astro preview` after copying it to dist, or
 * any static server pointed at the repo with public/ as root).
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COLORS, VIEWBOX, ASPECT, emblem, favicon, horizontalSVG } from '../src/data/logo.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const vb = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`;
const svg = (inner, w, extra = '') =>
  `<svg viewBox="${vb}" width="${w}" height="${Math.round(w * ASPECT)}" aria-hidden="true"${extra}>${inner}</svg>`;

// Clear space = the ribbon band's depth (28 units on the 230-unit emblem).
const CLEAR = 28;
const clearW = 300;
const k = clearW / VIEWBOX.w;
const pad = CLEAR * k;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Ciao Italian Taxi Service, logo usage</title>
<style>
@font-face{font-family:'Cormorant Garamond';src:url(/fonts/cormorant-garamond-latin-600.woff2) format('woff2');font-weight:600}
@font-face{font-family:Manrope;src:url(/fonts/manrope-latin-wght.woff2) format('woff2');font-weight:200 800}
*{box-sizing:border-box;margin:0}
body{width:1600px;height:1000px;padding:56px 64px;background:#fff;color:${COLORS.carbone};font:400 15px/1.5 Manrope,system-ui,sans-serif}
h1{font:600 44px/1.1 'Cormorant Garamond',Georgia,serif}
.lede{margin-top:6px;color:#5A605C}
.grid{display:grid;grid-template-columns:1.05fr 1fr 1fr;gap:28px;margin-top:32px}
.panel{border:1px solid #DADCD5;border-radius:6px;padding:24px;display:flex;flex-direction:column;gap:14px}
.label{font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#5A605C}
.dark{background:${COLORS.notte};border-color:${COLORS.notte};color:#F4F5F0}
.dark .label{color:${COLORS.chiaro}}
.center{display:flex;justify-content:center;align-items:center}
.clear{position:relative;padding:${pad}px;outline:1px dashed #00693A;background:repeating-linear-gradient(45deg,#fff 0 6px,#EEF5F0 6px 7px)}
.clear>svg{display:block;background:#fff}
.unit{position:absolute;left:0;top:0;width:${pad}px;height:${pad}px;background:#00693A;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
.sizes{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap}
.sizes figure{display:flex;flex-direction:column;align-items:center;gap:8px}
figcaption{font-size:12px;color:#5A605C;text-align:center}
.dark figcaption{color:#C9D3CC}
.swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.sw{border-radius:6px;overflow:hidden;border:1px solid #DADCD5;font-size:11px}
.sw i{display:block;height:38px}
.sw span{display:block;padding:6px 8px;line-height:1.3}
ul{padding-left:18px;color:#5A605C}
</style></head><body>
<h1>Ciao Italian Taxi Service · Logo usage</h1>
<p class="lede">Gear (a tyre with tread teeth), five spokes, the Stella d'Italia as the hub, and a red ribbon carrying the name. All lettering is outlined: no font is needed to reproduce it.</p>
<div class="grid">

<section class="panel">
 <p class="label">Clear space · equal to the ribbon's depth</p>
 <div class="center" style="flex:1"><div class="clear"><span class="unit">R</span>${svg(emblem(), clearW)}</div></div>
 <p style="color:#5A605C">Keep at least <strong>R</strong> (the depth of the red band) clear on every side. Nothing, including other text, enters that zone.</p>
</section>

<section class="panel">
 <p class="label">Minimum sizes · which reading where</p>
 <div class="sizes">
  <figure>${svg(emblem(), 150)}<figcaption>150px<br>name on ribbon<br>(never smaller)</figcaption></figure>
  <figure>${svg(emblem({ lettered: false }), 64)}<figcaption>64-80px<br>header: plain<br>ribbon</figcaption></figure>
  <figure>${svg(emblem({ lettered: false, heavy: true }), 48)}<figcaption>48-180px<br>app icon</figcaption></figure>
  <figure>${favicon().replace('<svg ', '<svg width="32" height="32" ')}<figcaption>16-48px<br>favicon</figcaption></figure>
 </div>
 <p class="label" style="margin-top:8px">Header lockup</p>
 <div>${horizontalSVG({ lang: 'en' }).replace(/width="(\d+)" height="(\d+)"/, (_m, w, h) => `width="${Math.round(w * 0.42)}" height="${Math.round(h * 0.42)}"`)}</div>
 <div>${horizontalSVG({ lang: 'it' }).replace(/width="(\d+)" height="(\d+)"/, (_m, w, h) => `width="${Math.round(w * 0.42)}" height="${Math.round(h * 0.42)}"`)}</div>
</section>

<section class="panel dark">
 <p class="label">Colour versions · reversed on Notte</p>
 <div class="center">${svg(emblem({ reversed: true }), 240)}</div>
 <div>${horizontalSVG({ lang: 'en', reversed: true }).replace(/width="(\d+)" height="(\d+)"/, (_m, w, h) => `width="${Math.round(w * 0.42)}" height="${Math.round(h * 0.42)}"`)}</div>
 <figcaption style="text-align:left">On #0F2A1E the gear turns Bianco #F4F5F0 and the green Verde Chiaro #5CC48C. The star and ribbon do not change.</figcaption>
</section>
</div>

<div class="grid" style="grid-template-columns:2fr 1fr;margin-top:24px">
<section class="panel">
 <p class="label">Colours</p>
 <div class="swatches">
  ${[
    ['Rosso', COLORS.rosso, 'ribbon, star outline'],
    ['Ribbon tail', COLORS.tail, 'swallowtail ends'],
    ['Fold', COLORS.fold, 'fold shadows'],
    ['Carbone', COLORS.carbone, 'gear'],
    ['Verde Felce', COLORS.felce, 'rim, spokes'],
    ['Verde Chiaro', COLORS.chiaro, 'green on dark'],
    ['Bianco', COLORS.bianco, 'gear on dark'],
    ['Notte', COLORS.notte, 'dark ground'],
  ]
    .map(([n, c, u]) => `<div class="sw"><i style="background:${c}"></i><span><strong>${n}</strong> ${c}<br>${u}</span></div>`)
    .join('')}
 </div>
</section>
<section class="panel">
 <p class="label">Do not</p>
 <ul>
  <li>Add gradients, drop shadows, bevels or outlines.</li>
  <li>Recolour, stretch, rotate or re-letter the mark.</li>
  <li>Use the lettered emblem below 150px wide.</li>
  <li>Add olive or oak branches or "Repubblica Italiana": it is not the state emblem.</li>
 </ul>
</section>
</div>
</body></html>
`;

await writeFile(join(root, 'brand', 'logo-usage-sheet.html'), html);
console.log('wrote brand/logo-usage-sheet.html');
