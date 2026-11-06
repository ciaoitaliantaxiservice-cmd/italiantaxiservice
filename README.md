# Ciao Italian Taxi Service — bilingual site, v1

Static, bilingual (EN/IT) marketing site for a private-transfer business.
Built with [Astro](https://astro.build) 5, output as plain HTML with 1.6 KB of
inlined JavaScript and no runtime framework.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> ./dist
npm run preview    # serve ./dist locally
npm run check      # Astro + TypeScript diagnostics
npm run verify     # audit ./dist against the SEO invariants
npm run audit      # build + verify in one go
```

---

## Read this first

Two things about this build you need to know before reviewing it.

**1. The design concept was not in the repo.** The brief named an approved brand
board, logo, fonts and home-page layouts as the design source of truth. The
repository was empty, so only the four colour tokens from the brief itself could
be honoured. Everything else is a reasoned stand-in, isolated so it can be
swapped without touching page code:

| Decision | Where | Status |
|---|---|---|
| Colour tokens | `src/styles/global.css` `:root` | **From the brief.** Correct. |
| Type pairing — DM Serif Display + Inter | `src/styles/fonts.css`, `--font-display` / `--font-body` | **Assumption.** Swap the two `@font-face` blocks and the tokens. |
| Spacing grid — 8px with a 4px half-step | `--s-*` in `global.css` | **Assumption.** |
| Logo | `src/components/Logo.astro`, `public/favicon.svg`, `public/images/logo.svg` | **Placeholder mark.** |
| Home-page section order | `src/components/sections/HomeBody.astro` | **Assumption**, built to a conventional transfer-site funnel. |

Send the brand board and these are mechanical changes.

**2. No licence is claimed anywhere, and that is enforced.** The brief ruled out
taxi and NCC licence claims. In Italian this is a live trap: the highest-intent
commercial term in that market, `NCC` (*noleggio con conducente*), **is** a
licence category, so the obvious Italian copy would have breached the rule.
The Italian pages are built on `transfer privato`, `auto con autista` and
`servizio con autista` instead.

`npm run verify` fails the build if `NCC`, `licence`, `license`, `licensed`,
`licenza` or `autorizzazione` reaches rendered copy, and if any licence
property appears in JSON-LD. There is a redaction note at the top of
`src/data/content/it.ts` for whoever edits the copy next.

---

## URL map

Lowercase, hyphenated slugs. Trailing slash on every page
(`trailingSlash: 'always'`, `build.format: 'directory'`).

| Page | English | Italian |
|---|---|---|
| Home | `/en/` | `/it/` |
| Locations hub | `/en/locations/` | `/it/localita/` |
| About | `/en/about/` | `/it/chi-siamo/` |
| Contact | `/en/contact/` | `/it/contatti/` |
| 404 (per language) | `/en/404/` | `/it/404/` |

Plus:

| Path | Purpose | Indexed |
|---|---|---|
| `/` | Language gate: detects browser language and redirects client-side; both languages as plain links without JS | no |
| `/404.html` | Bilingual catch-all served for unknown paths | no |
| `/en/locations/{rome,milan,florence,venice,naples,amalfi-coast}/` | City stubs | **no — see below** |
| `/it/localita/{roma,milano,firenze,venezia,napoli,costiera-amalfitana}/` | City stubs | **no — see below** |
| `/sitemap.xml` | Generated, with hreflang alternates | — |
| `/robots.txt` | Generated so the `Sitemap:` line tracks `SITE_URL` | — |

24 pages build. 8 indexable, 16 `noindex`.

### Adding a language or a page

URLs are keyed, never hardcoded. `routes` in `src/data/i18n.ts` maps a stable
page key to a localised path per language; `hreflang`, the language switch, the
nav, breadcrumbs and the sitemap all derive from it. Add a key there and the
plumbing follows.

City slugs differ per language (`florence` / `firenze`) and live on each city in
`src/data/cities.ts`.

---

## Project structure

```
src/
  data/
    site.mjs          business details + SITE_URL + FORM_ENDPOINT — all placeholders live here
    i18n.ts           routes, nav order, UI chrome strings, x-default choice
    seo.ts            per-page title/description/H1, canonical + hreflang helpers, CITY_PAGES_INDEXABLE
    schema.ts         JSON-LD builders (placeholder-aware)
    cities.ts         the six areas, per-language slugs, names and card text
    content/
      en.ts           English page copy
      it.ts           Italian page copy — written natively, NOT a translation
      index.ts        typed so neither language can lose a key
  layouts/Base.astro  <head>, SEO, JSON-LD graph, header/footer/mobile bar
  components/
    Header, Footer, LangSwitch, MobileBar, Breadcrumbs, CtaBand, QuoteForm,
    Seo, Logo, Icon, Placeholders
    sections/         HomeBody, LocationsBody, AboutBody, ContactBody,
                      CityStubBody, NotFoundBody — one per page type, lang-driven
  pages/              thin: each sets SEO props and renders a section body
  styles/             fonts.css, global.css (tokens + base), components.css
scripts/
  copy-fonts.mjs      re-copy latin woff2 subsets from @fontsource
  verify-seo.mjs      post-build audit (see below)
```

**Why page files are thin.** Each language's page file only declares SEO
metadata and renders a shared section component with a `lang` prop. The
*template* is shared; the *copy* is not — it comes from `content/en.ts` or
`content/it.ts`. So layout changes happen once, and the two languages' wording
can never accidentally converge.

`content/index.ts` types `it` against `typeof en`, so a missing key in either
language is a type error, not a blank space on the page. That is a structural
guarantee only — it does **not** mean the copy is parallel, and it should not
become parallel.

---

## SEO decisions, and why

**Self-referencing canonicals** on all 22 real URLs. Two deliberate exceptions:

- `/404.html` has **no canonical**. It is served for arbitrary unknown URLs, so
  a canonical here would tell crawlers that `/404.html` is the canonical version
  of whatever the visitor actually requested.
- `/` has a self-canonical but **no hreflang**.

**hreflang** — `en`, `it` and one `x-default` per page, reciprocal, including a
self-reference. Emitted in `<head>` *and* as `xhtml:link` alternates in
`sitemap.xml`.

`x-default` points at the **English** URL, not at `/`. The textbook target for
`x-default` is a language selector, and `/` is one — but `/` is `noindex` and
redirects, and advertising a noindex page as `x-default` means search engines
ignore it. Set via `X_DEFAULT_LANG` in `src/data/i18n.ts` if you disagree.

The language gate carries no hreflang at all. hreflang must be reciprocal, and
`/en/` and `/it/` point at each other; one-way links from `/` would invalidate
the whole cluster. The gate's body links and the sitemap handle discovery.

**The language switch links to the matching page in the other language**, not to
the homepage — `/en/about/` ↔ `/it/chi-siamo/`, derived from the same `routes`
map as hreflang, so the two cannot disagree.

**Titles ≤ 60 chars, descriptions ≤ 155**, unique per page per language, with
one `<h1>` each and no skipped heading levels. All machine-checked.

**JSON-LD** — one `@graph` per page carrying `Organization`, `LocalBusiness`,
`WebSite`, `BreadcrumbList` (where there is a breadcrumb trail), and `FAQPage`
on the two homepages only, because they are the only pages with a real FAQ.

Three rules enforced in `src/data/schema.ts`:

1. No licence, permit or authorisation properties.
2. No `aggregateRating`, `review`, `ratingValue` or `priceRange` — the site
   publishes no ratings and no prices, so claiming them in markup would be
   fabrication.
3. Any field still holding a `[[PLACEHOLDER]]` is **omitted**, not emitted. The
   markup is valid now and fills itself in as `site.mjs` gets real values. This
   covers `telephone`, `email`, `address`, `geo`, `vatID` and `sameAs`.

**`BreadcrumbList` is generated from the same array that renders the visible
breadcrumbs**, so markup and page can't drift.

**Breadcrumbs are omitted on the homepages**, where a single-item trail adds
nothing.

**`robots.txt` disallows nothing.** Pages that should stay out of the index say
so with a `robots` meta tag, which is the only directive that reliably keeps a
URL out. Disallowing them in `robots.txt` would stop crawlers reading that tag.

**City stubs.** `noindex, follow` and excluded from the sitemap — a URL must
never be both `noindex` and in the sitemap. One flag,
`CITY_PAGES_INDEXABLE` in `src/data/seo.ts`, drives both, so they cannot
disagree. `follow` is kept so internal links still flow back to the hub.

### `npm run verify`

`scripts/verify-seo.mjs` audits `./dist` and exits non-zero on failure, so it
can gate a deploy. It checks title and description lengths and uniqueness,
exactly one `<h1>` and no skipped heading levels, self-referencing canonicals,
hreflang reciprocity and exactly one `x-default`, JSON-LD parsing plus the three
rules above, no `noindex` URL in the sitemap and no sitemap URL that was not
built, an absolute `Sitemap:` line, and the licence-wording ban.

It found seven real defects on first run, including a 63-character 404 title, a
156-character Italian description and a non-reciprocal hreflang set on the
language gate. Run it after any content edit.

---

## Accessibility

Targeting WCAG 2.1 AA.

Contrast was the constraint that shaped the palette's use. Measured against
white: `#00693A` **6.81:1** (body text, buttons), `#CD212A` **5.46:1** (white
text on the CTA), `#008C45` **4.34:1** — which fails AA for normal text. The
flag green is therefore used only for graphics, rules, icons and the eyebrow
labels, exactly as the brief specified. Body text is `#14241C` on white or
`#F4F5F0`. **Do not** use `#008C45` for body-weight text.

Also in place: a skip link; `aria-current="page"` in the nav and on breadcrumbs;
a real `<button>` with `aria-expanded` for the mobile nav (not a checkbox hack),
closing on Escape with focus returned; native `<details>`/`<summary>` for the
FAQ so it needs no JavaScript; 48px minimum touch targets; visible 3px focus
rings; `prefers-reduced-motion` honoured; the form's error summary is
`role="alert"`, focused on failed submit, with links to each bad field and
`aria-invalid` on the inputs; decorative SVG is `aria-hidden`; the decorative
tricolour and placeholder frames carry no meaning that text does not also carry.

**Not verified:** no screen-reader pass (NVDA/VoiceOver) and no axe/Lighthouse
run — see *Not done* below.

## Performance

Static HTML, one CSS bundle, **1.6 KB of inlined JavaScript** across the whole
site (mobile nav ~0.4 KB, form validation ~1.2 KB), no framework runtime, no
third-party scripts, no cookie banner, no analytics yet. Whole `dist` is 515 KB
including fonts.

Fonts are self-hosted, latin subset only, two woff2 files totalling 73 KB, both
preloaded with `font-display: swap`. Self-hosted rather than Google Fonts so
there is no third-party connection on the critical path.

Watch these when real assets land:

- **The hero image is a CSS placeholder, so there is currently no image LCP.**
  Real photography is the single biggest risk to the 90+ target. Use
  `<picture>`, explicit `width`/`height`, `loading="eager"` and
  `fetchpriority="high"` on the hero; `loading="lazy"` and `decoding="async"`
  everywhere else.
- The contact map placeholder becomes a third-party iframe. Lazy-load it, or
  better, swap in a static image that links out.

---

## Placeholders to fill in

Every placeholder is `[[LIKE THIS]]`, highlighted in yellow on the rendered page
(`src/components/Placeholders.astro`) so none can ship unnoticed. Find them all
with:

```bash
grep -rn '\[\[' src/
```

### Blocking — the site should not go live with these

| Placeholder | File | Notes |
|---|---|---|
| `SITE_URL` | `src/data/site.mjs` | Currently `https://www.ciaoitaliantaxiservice.com`. **Drives every canonical, hreflang and sitemap URL.** Wrong here = wrong everywhere. |
| `FORM_ENDPOINT` | `src/data/site.mjs` | Empty. The form validates, then shows a notice pointing at WhatsApp/email rather than silently dropping the enquiry. Set it to a Formspree/Basin URL, a Netlify function or your own handler. |
| `phoneE164`, `phoneDisplay`, `whatsappE164` | `src/data/site.mjs` | `+390000000000` is a dummy and is suppressed from JSON-LD until replaced. |
| `[[hello@example.com]]` | `src/data/site.mjs` | |
| `[[REGISTERED COMPANY NAME]]`, `[[VAT / P.IVA]]` | `src/data/site.mjs` | Footer and `Organization.vatID`. Legally required in Italy. |
| Logo | `src/components/Logo.astro`, `public/favicon.svg`, `public/images/logo.svg` | |
| `public/images/og-default.svg` | — | **Must become a PNG or JPG.** Most social platforms will not render an SVG `og:image`. Export 1200×630 and update `ogImage` in `src/components/Seo.astro`. |

### Content

| Placeholder | File |
|---|---|
| `[[PRICE]]` ×6, `[[TARIFFA]]` ×6 — route tables | `content/en.ts`, `content/it.ts` |
| `[[FOUNDER NAME]]` / `[[NOME DEL FONDATORE]]`, `[[NUMBER]]` / `[[NUMERO]]`, `[[CITIES]]` / `[[CITTÀ]]`, `[[REGIONS]]` / `[[REGIONI]]`, `[[YEAR]]` / `[[ANNO]]` | About story + trust table |
| `[[OTHER LANGUAGES]]` / `[[ALTRE LINGUE]]`, `[[CITY, COUNTRY]]` / `[[CITTÀ, PAESE]]` | About trust table |
| `[[INTERVAL]]` / `[[INTERVALLO]]`, `[[DESCRIBE THE VETTING STEPS YOU ACTUALLY PERFORM]]` / `[[DESCRIVERE LE VERIFICHE EFFETTIVAMENTE SVOLTE]]` | About — driver vetting |
| `[[CONFIRM ACCEPTED PAYMENT METHODS AND DEPOSIT POLICY]]` / `[[CONFERMARE METODI DI PAGAMENTO E POLITICA DI ACCONTO]]` | Home FAQ. **This answer also goes into `FAQPage` JSON-LD** — fill it before submitting the site for rich results. |
| `[[RESPONSE TIME]]` / `[[TEMPO DI RISPOSTA]]`, `[[OPENING HOURS]]` / `[[ORARI]]` | Contact |
| `[[EMBED A MAP…]]` / `[[INSERIRE UNA MAPPA…]]` | Contact — or delete the section if there is no public office |
| Street, city, region, postcode, `[[LAT]]`, `[[LNG]]` | `src/data/site.mjs` — address and geo are suppressed from `LocalBusiness` until complete |
| `site.social` | `src/data/site.mjs` — empty strings are skipped in `sameAs` |
| `[[ADD twitter:site …]]` | `src/components/Seo.astro` |
| Hero, city and portrait photography | `media-placeholder` / `city-card__thumb` blocks; alt text is already written in both languages, as placeholder descriptions |

`site.hours` assumes 24/7 dispatch and feeds
`LocalBusiness.openingHoursSpecification`. **Confirm or change it** — it is an
assumption presented as fact, not a bracketed placeholder.

---

## Host configuration needed

**Root redirect.** `/` detects the browser language in a blocking inline script
and redirects, with both languages as links for anyone without JS. A static
build cannot issue a real 302. **Prefer a server-side redirect** on `/` keyed
off `Accept-Language` — it removes the client-side hop. Keep the gate as the
no-JS fallback.

**404 handling.** `/404.html` is the bilingual catch-all most static hosts serve
for any unknown path. `/en/404/` and `/it/404/` are per-language versions. If
your host can route by path prefix, serve those for `/en/*` and `/it/*` misses
and keep `/404.html` as the fallback — otherwise the per-language pages exist
but are only reachable directly. Both return the host's status code; make sure
that is a real **404**, not a 200.

**Trailing slashes.** The build emits directory-style URLs. Configure the host
to redirect `/en/about` → `/en/about/` with a 301, and do not let it also
redirect the other way, or you get a loop.

---

## Not done

Stated plainly so nothing here reads as verified when it is not.

- **No Lighthouse run and no axe pass.** The 90+ target is a design target that
  the architecture supports — static HTML, 1.6 KB JS, subset preloaded fonts —
  not a measured result. Measure after real images land, which is when the
  numbers will actually move.
- **No screenshots.** This environment has no browser tooling. Use
  `npm run preview` to view it.
- **No form backend.** By design for v1; see `FORM_ENDPOINT`.
- **No city page content.** Twelve stubs, `noindex`. See `KEYWORD-MAP.md` for
  what each needs before the flag flips.
- **No legal pages.** An Italian business site handling personal data through a
  form needs a privacy policy and cookie notice before launch. Not in the brief's
  scope, but it blocks go-live. The form already asks for explicit consent.
- **No keyword volume data.** `KEYWORD-MAP.md` is built on live SERP sampling,
  not licensed metrics, and says so.
- **Italian copy has not been reviewed by a native speaker.** It is written as
  Italian rather than translated, with its own structure and its own FAQs
  (ZTL, fattura elettronica, bagagli) — but have a native speaker read it.

## Deliverables

- Working code — this repo.
- `KEYWORD-MAP.md` — one primary cluster per page per language, city-page
  reservations, cannibalisation guard.
- This README — structure, URL map, SEO decisions, every placeholder.
