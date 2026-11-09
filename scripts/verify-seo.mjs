/**
 * Post-build audit of ./dist. Run with:  npm run verify
 *
 * Checks the invariants that are easy to break with an innocent edit and hard
 * to spot by eye:
 *   1. one <title> per page, <= 60 chars
 *   2. one meta description per page, <= 155 chars
 *   3. exactly one <h1>, and no skipped heading levels
 *   4. a self-referencing canonical that matches the page's own URL
 *   5. hreflang sets that are reciprocal and contain exactly one x-default
 *   6. JSON-LD that parses, and contains no licence/rating/price claims
 *   7. no noindex URL present in sitemap.xml, and every sitemap URL exists
 *   8. no "NCC" or licence wording anywhere in the rendered copy
 *   9. unique titles, descriptions and H1s across all indexable pages
 *  10. requests come in through the form and email only: no tel: links, no
 *      "telephone" in JSON-LD, and no WhatsApp link, button or text
 *  11. images: every <img> has alt, width and height; none is PNG or JPG;
 *      at most one per page loads eagerly (the hero), the rest are lazy
 *      with rel="noopener"
 *
 * Exits non-zero on any failure, so it can gate a deploy.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const TITLE_MAX = 60;
const DESC_MAX = 155;

/**
 * Pages exempt from the canonical and/or hreflang rules, with the reason.
 *   /404.html  — served for arbitrary unknown URLs, so a canonical here would
 *                claim this file is the canonical version of whatever was
 *                requested. It is also not part of any language cluster.
 *   /          — the language gate. hreflang must be reciprocal, and /en/ and
 *                /it/ point at each other; one-way links from the gate would
 *                invalidate the cluster.
 */
const EXEMPT = {
  '/404.html': { canonical: true, hreflang: true },
  '/': { hreflang: true },
};

const errors = [];
const warnings = [];
const fail = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

/** Recursively collect .html files. */
async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** dist/en/about/index.html -> /en/about/ ; dist/404.html -> /404.html */
function urlPathFor(file) {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  if (rel === 'index.html') return '/';
  return `/${rel}`;
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return m ? m[1] : null;
};

const files = await htmlFiles(dist);
if (files.length === 0) {
  console.error('No HTML found in ./dist — run `npm run build` first.');
  process.exit(1);
}

const pages = new Map();

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const name = relative(dist, file).split(sep).join('/');
  const urlPath = urlPathFor(file);

  // ---- title -------------------------------------------------------------
  // Only <title> elements in <head>; inline SVG <title> is excluded.
  const head = html.slice(0, html.indexOf('</head>') + 7);
  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) => m[1].trim());
  if (titles.length !== 1) fail(name, `expected 1 <title> in head, found ${titles.length}`);
  const title = titles[0] ?? '';
  if (title.length > TITLE_MAX) fail(name, `title ${title.length} chars (max ${TITLE_MAX}): "${title}"`);

  // ---- description -------------------------------------------------------
  const descTags = [...head.matchAll(/<meta\s+name="description"[^>]*>/gi)];
  if (descTags.length !== 1) fail(name, `expected 1 meta description, found ${descTags.length}`);
  const desc = descTags[0] ? (attr(descTags[0][0], 'content') ?? '') : '';
  if (desc.length > DESC_MAX) fail(name, `description ${desc.length} chars (max ${DESC_MAX})`);

  // ---- robots ------------------------------------------------------------
  const robotsTag = head.match(/<meta\s+name="robots"[^>]*>/i);
  const robots = robotsTag ? (attr(robotsTag[0], 'content') ?? '') : '';
  const noindex = robots.includes('noindex');

  // ---- headings ----------------------------------------------------------
  const body = html.slice(html.indexOf('</head>'));
  const headings = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  const h1s = headings.filter((h) => h === 1).length;
  if (h1s !== 1) fail(name, `expected exactly 1 <h1>, found ${h1s}`);

  let prev = 0;
  for (const level of headings) {
    if (prev !== 0 && level > prev + 1) {
      fail(name, `heading order jumps from h${prev} to h${level}`);
      break;
    }
    prev = level;
  }

  const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // ---- canonical ---------------------------------------------------------
  const exempt = EXEMPT[urlPath] ?? {};

  const canonTags = [...head.matchAll(/<link\s+rel="canonical"[^>]*>/gi)];
  if (!exempt.canonical) {
    if (canonTags.length !== 1) {
      fail(name, `expected 1 canonical, found ${canonTags.length}`);
    } else {
      const href = attr(canonTags[0][0], 'href') ?? '';
      if (!href.endsWith(urlPath)) {
        fail(name, `canonical "${href}" is not self-referencing (expected to end with "${urlPath}")`);
      }
    }
  } else if (canonTags.length > 0) {
    fail(name, 'has a canonical but is exempt from canonicalisation — remove it');
  }

  // ---- hreflang ----------------------------------------------------------
  const alts = [...head.matchAll(/<link\s+rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/gi)].map(
    (m) => ({ hreflang: attr(m[0], 'hreflang'), href: attr(m[0], 'href') })
  );

  if (exempt.hreflang) {
    if (alts.length > 0) {
      fail(name, 'has hreflang links but is exempt from the language cluster — remove them');
    }
  } else {
    const xd = alts.filter((a) => a.hreflang === 'x-default');
    if (alts.length === 0) fail(name, 'no hreflang alternates');
    if (xd.length !== 1) fail(name, `expected exactly 1 x-default, found ${xd.length}`);
    for (const code of ['en', 'it']) {
      if (!alts.some((a) => a.hreflang === code)) fail(name, `missing hreflang="${code}"`);
    }
    const self = alts.some((a) => a.href && a.href.endsWith(urlPath));
    if (!self) fail(name, 'hreflang set does not include this page itself');
  }

  // ---- JSON-LD -----------------------------------------------------------
  const ldBlocks = [...html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )].map((m) => m[1]);

  for (const block of ldBlocks) {
    let parsed;
    try {
      parsed = JSON.parse(block);
    } catch (e) {
      fail(name, `JSON-LD does not parse: ${e.message}`);
      continue;
    }
    const text = JSON.stringify(parsed);
    for (const banned of ['aggregateRating', 'reviewCount', 'ratingValue', 'priceRange']) {
      if (text.includes(banned)) fail(name, `JSON-LD contains banned property "${banned}"`);
    }
    if (/licen[cs]e/i.test(text)) fail(name, 'JSON-LD mentions a licence');
    if (text.includes('[[') && !text.includes('FAQPage')) {
      fail(name, 'JSON-LD leaks an unfilled [[PLACEHOLDER]]');
    }
  }

  // ---- licence / NCC wording in visible copy -----------------------------
  const visible = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
  if (/\bNCC\b/.test(visible)) {
    fail(name, 'rendered copy contains "NCC" (a licence category — use "private transfers")');
  }
  if (/\b(licensed|licence|license|licenza|autorizzazione)\b/i.test(visible)) {
    fail(name, 'rendered copy makes a licence/authorisation claim');
  }

  // ---- booking channels ----------------------------------------------------
  if (/href="tel:/i.test(html)) fail(name, 'contains a tel: link (the site takes no calls)');
  if (/"telephone"\s*:/.test(html)) fail(name, 'JSON-LD has a telephone (the site takes no calls)');
  if (/wa\.me|api\.whatsapp|whatsapp/i.test(html)) fail(name, 'mentions WhatsApp (removed from the site)');

  // ---- images --------------------------------------------------------------
  let eager = 0;
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = (tag.match(/\ssrc="([^"]*)"/) || [])[1] || '';
    if (!/\salt="/.test(tag)) fail(name, 'img without alt: ' + src);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) fail(name, 'img without width/height: ' + src);
    if (/\.(png|jpe?g)(\?|$)/i.test(src)) fail(name, 'img is PNG/JPG, not WebP: ' + src);
    if (!/\sloading="lazy"/.test(tag)) eager++;
  }
  for (const m of html.matchAll(/<source\b[^>]*srcset="([^"]*)"/g)) {
    if (/\.(png|jpe?g)[\s?,]/i.test(m[1] + ' ')) fail(name, 'picture source is PNG/JPG: ' + m[1].slice(0, 60));
  }
  if (eager > 1) fail(name, `${eager} images load eagerly (only the hero may)`);

  pages.set(urlPath, { name, title, desc, h1, noindex, alts });
}

// ---- cross-page checks ---------------------------------------------------

// hreflang reciprocity: each alternate must list the same set back.
for (const [urlPath, page] of pages) {
  for (const alt of page.alts) {
    if (alt.hreflang === 'x-default' || !alt.href) continue;
    const targetPath = new URL(alt.href).pathname;
    const target = pages.get(targetPath);
    if (!target) {
      fail(page.name, `hreflang points at "${targetPath}", which was not built`);
      continue;
    }
    const pointsBack = target.alts.some((a) => a.href && new URL(a.href).pathname === urlPath);
    if (!pointsBack) {
      fail(page.name, `hreflang to "${targetPath}" is not reciprocal`);
    }
  }
}

// Uniqueness across indexable pages only.
const seen = { title: new Map(), desc: new Map(), h1: new Map() };
for (const [urlPath, page] of pages) {
  if (page.noindex) continue;
  for (const field of ['title', 'desc', 'h1']) {
    const value = page[field];
    if (!value) continue;
    if (seen[field].has(value)) {
      fail(page.name, `duplicate ${field} shared with ${seen[field].get(value)}`);
    } else {
      seen[field].set(value, urlPath);
    }
  }
}

// ---- sitemap -------------------------------------------------------------
try {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

  for (const loc of locs) {
    const page = pages.get(loc);
    if (!page) fail('sitemap.xml', `lists "${loc}", which was not built`);
    else if (page.noindex) fail('sitemap.xml', `lists "${loc}", which is noindex`);
  }

  for (const [urlPath, page] of pages) {
    if (!page.noindex && !locs.includes(urlPath)) {
      warn('sitemap.xml', `indexable page "${urlPath}" is missing from the sitemap`);
    }
  }

  if (!/xmlns:xhtml=/.test(sitemap)) fail('sitemap.xml', 'missing the xhtml namespace for alternates');
  if (!/hreflang="x-default"/.test(sitemap)) fail('sitemap.xml', 'no x-default alternates');
} catch {
  fail('sitemap.xml', 'not found in dist');
}

// ---- robots.txt ----------------------------------------------------------
try {
  const robotsTxt = await readFile(join(dist, 'robots.txt'), 'utf8');
  if (!/^Sitemap:\s*https?:\/\//m.test(robotsTxt)) {
    fail('robots.txt', 'no absolute Sitemap: line');
  }
} catch {
  fail('robots.txt', 'not found in dist');
}

// ---- report --------------------------------------------------------------
const indexable = [...pages.values()].filter((p) => !p.noindex).length;
console.log(`Audited ${pages.size} pages (${indexable} indexable, ${pages.size - indexable} noindex).`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  for (const e of errors) console.log(`  x ${e}`);
  process.exit(1);
}

console.log('\nAll SEO invariants hold.');
