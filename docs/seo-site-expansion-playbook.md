# Ciao Italian Taxi Service: Site Expansion & SEO Playbook

Standing rules for any agent that adds or edits pages on **https://www.ciaoitaliantaxiservice.com**.
Read this whole file before starting a task. If something here conflicts with what you find in the live code, **stop and report it** instead of guessing.

- Stack: Next.js (App Router, TypeScript, static output), Supabase for forms, hosted on a Cloudflare Worker.
- Canonical host: `https://www.ciaoitaliantaxiservice.com` (the bare domain 301s to `www`).
- Languages: English (`en`) and Italian (`it`), always built in parallel.
- Brand: "Ciao Italian Taxi Service". The service is a licensed **NCC** (noleggio con conducente, pre-booked private hire). "Taxi" is a regulated word in Italy, so copy should present the service as private transfers / NCC, and use "taxi" mainly as a search keyword (for example "taxi from Fiumicino to Rome" in EN copy, "alternativa al taxi" in IT copy).

Expansion order: **1. Location pages** (one at a time) → **2. Route pages** → **3. Airport transfers** → **4. Cross-border transfers**.

> **Owner decisions that override this playbook (13 November 2026).** Where the text below disagrees, these win.
>
> 1. **No licence, registration or authorisation claims, anywhere.** Not in the copy, titles, meta, alt text, badges, image file names or JSON-LD. That means:
>    - no "NCC" or "noleggio con conducente" as a claim, keyword or `serviceType`;
>    - no "licensed" badge;
>    - no licence, registration, VAT or P.IVA numbers;
>    - no `DATA:licence-*` placeholders.
>
>    Present the service as private transfers or chauffeured cars ("transfer privato", "auto con autista", "servizio con autista"). `scripts/verify-seo.mjs` enforces this and must keep passing.
>    - **§5.1:** IT primaries are `transfer privato {città}`, `transfer {da} {a}` and similar, never `NCC …`.
>    - **§5.4:** `serviceType` is "Private transfer" / "Transfer privato".
>    - **§6.1:** use two trust badges, fixed price and meet & greet, plus a third that makes no licence claim (for example 24/7 service).
> 2. **Titles use the full brand name.** The suffix is "| Ciao Italian Taxi Service", never a shortened form. Longer titles are accepted: §5.2's 50–60 character target is a guide, and the build check allows up to 75.
> 3. **No phone number, `tel:` link or WhatsApp** anywhere on the site, so there's no secondary phone CTA. Contact goes through the quote form, info@ (enquiries) and booking@ (bookings).

---

## 0. Golden rules (never break these)

1. **Preserve the existing site.** Do not change the theme, colour tokens, fonts, spacing scale, component styling, header/footer, or any existing URL. Reuse existing components and CSS variables. New UI must look like it was always part of the site.
2. **Never change a published URL.** If a URL must change, add a 301 redirect from the old one and update every internal link, the sitemap and hreflang.
3. **Every page ships in EN and IT together**, in the same commit/PR. No page goes live in one language only.
4. **Never skip a section** because content, images, prices or vehicle data are missing. Build the section fully and drop in a visible placeholder (see §7).
5. **No thin or duplicate pages.** Each page must have content that is genuinely about that place/route. Do not create pages by find-and-replacing a city name.
6. **No invented facts in structured data.** No fake prices, reviews, ratings, addresses or phone numbers in JSON-LD. If a value is unknown, leave it out of schema and use a placeholder in the visible page.
7. **Design, not text walls.** Every page is built from designed sections with layout, icons/imagery and subtle motion (see §6).

---

## 1. Inspect before you build

Before writing any page, check and note:

- `next.config.*`: `trailingSlash` setting, `output: 'export'`, `images` config.
- How the existing `/en/` and `/it/` routes are structured in `app/` (for example `app/[lang]/...` or separate `app/en`, `app/it` trees).
- Existing design tokens (CSS variables / Tailwind theme), heading/body fonts, button and card components, section wrappers, animation utilities.
- Existing metadata helpers, JSON-LD helpers, sitemap (`app/sitemap.ts`), `robots.ts`.
- Existing URLs (known so far): `/en/`, `/en/locations/`, `/en/about/`, `/en/contact/` and `/it/`, `/it/localita/`, `/it/chi-siamo/`, `/it/contatti/`.

**Match whatever trailing-slash convention the site already uses** (current URLs end with `/`). Every internal link, canonical, hreflang and sitemap entry must use exactly the same form.

Reference brand values (only if you need to confirm the existing tokens, never to restyle): headings Cormorant Garamond, body/UI Manrope; Verde Profondo `#00693A` for text/links, Rosso Scarlatto `#CD212A` only for the primary CTA, Bianco Brillante `#F4F5F0` surfaces, Carbone `#1C1F1D` text, Notte Verde `#0F2A1E` dark bands; 8px grid, square corners, 1.5-stroke line icons, the 3px tricolore rule used once per page.

---

## 2. URL architecture

### 2.1 Slug rules

- Lowercase, ASCII only, words separated by hyphens. No accents (`localita`, not `località`), no underscores, no spaces, no capitals, no file extensions, no query strings for content.
- Short and descriptive: 1 to 5 words. Drop stop words except where needed for meaning ("to" in EN route slugs).
- EN slugs use English place names, IT slugs use Italian place names (Florence → `florence` / `firenze`, Venice → `venice` / `venezia`, Geneva → `geneva` / `ginevra`).
- One URL per page. No duplicates by case, trailing slash, `index`, or `www`/non-`www`.
- Language prefix is always the first segment: `/en/...` and `/it/...`.
- Max depth after the language prefix: **3 segments**.

### 2.2 Page types and patterns

| Page type | EN pattern | IT pattern | Example EN | Example IT |
|---|---|---|---|---|
| Home | `/en/` | `/it/` | `/en/` | `/it/` |
| Locations hub | `/en/locations/` | `/it/localita/` | | |
| Location | `/en/locations/{city}/` | `/it/localita/{citta}/` | `/en/locations/rome/` | `/it/localita/roma/` |
| Routes hub | `/en/routes/` | `/it/tratte/` | | |
| Route | `/en/routes/{from}-to-{to}/` | `/it/tratte/{da}-{a}/` | `/en/routes/rome-to-florence/` | `/it/tratte/roma-firenze/` |
| Airport hub | `/en/airport-transfers/` | `/it/transfer-aeroporto/` | | |
| Airport | `/en/airport-transfers/{airport}/` | `/it/transfer-aeroporto/{aeroporto}/` | `/en/airport-transfers/rome-fiumicino/` | `/it/transfer-aeroporto/roma-fiumicino/` |
| Airport → destination | `/en/airport-transfers/{airport}/{destination}/` | `/it/transfer-aeroporto/{aeroporto}/{destinazione}/` | `/en/airport-transfers/rome-fiumicino/rome-city-centre/` | `/it/transfer-aeroporto/roma-fiumicino/roma-centro/` |
| Cross-border hub | `/en/cross-border-transfers/` | `/it/transfer-internazionali/` | | |
| Cross-border route | `/en/cross-border-transfers/{from}-to-{to}/` | `/it/transfer-internazionali/{da}-{a}/` | `/en/cross-border-transfers/milan-to-lugano/` | `/it/transfer-internazionali/milano-lugano/` |
| Static pages | existing | existing | `/en/about/`, `/en/contact/` | `/it/chi-siamo/`, `/it/contatti/` |

Notes:

- **Airport slug** = `{city}-{airport-name}`: `rome-fiumicino`, `rome-ciampino`, `milan-malpensa`, `milan-linate`, `venice-marco-polo`, `naples-capodichino`, `florence-peretola`, `pisa-galilei`. IT: `roma-fiumicino`, `milano-malpensa`, `venezia-marco-polo`, `napoli-capodichino`, `firenze-peretola`, `pisa-galilei`. Mention the IATA code (FCO, MXP, VCE...) in the H1/body, not the slug.
- **Route direction:** create one page per direction **only** when there is unique content for both (different pickup logistics, different FAQs). Otherwise create the most-searched direction only, and mention the return trip on that page. Never make two near-identical pages.
- **Airport vs route:** anything starting at an airport lives under airport transfers, not routes. Destinations that are both a location and an airport destination link to each other.
- **Ambiguous foreign names:** check before using an Italian exonym. "Monaco" in Italian means both Monaco and Munich; use `monaco-principato` vs `monaco-di-baviera` style slugs or choose clearer wording, and decide once.
- Hubs list their children; children never exist without their hub being live.

### 2.3 Central page registry (required)

Keep a single source of truth, for example `src/data/pages.ts` (or extend the existing one if present):

```ts
export type PageType = 'location' | 'route' | 'airport' | 'airport-destination' | 'cross-border' | 'hub' | 'static';

export interface PageEntry {
  id: string;              // stable, language-neutral, e.g. 'loc-rome', 'route-rome-florence'
  type: PageType;
  parentId?: string;       // hub or airport id, used for breadcrumbs
  slug: { en: string; it: string };    // full path, e.g. '/en/locations/rome/'
  name: { en: string; it: string };    // breadcrumb/anchor label, e.g. 'Rome' / 'Roma'
  status: 'draft' | 'live';
  related?: string[];      // ids of related pages for internal linking
  nearby?: string[];       // ids of nearby locations
  lastmod: string;         // ISO date, update when content meaningfully changes
}
```

Use this registry to generate: page routes (`generateStaticParams`), the language switcher, hreflang, canonicals, breadcrumbs, the sitemap, hub listings and "related" link blocks. **Never hardcode a counterpart URL by hand.**

`draft` pages are not linked, not in the sitemap, and use `robots: noindex`.

---

## 3. Breadcrumbs

Visible breadcrumbs on every page except the home page, placed directly under the header and above the H1, styled with existing tokens (small Manrope, muted colour, `/` or chevron separator). The last item is the current page, not a link, with `aria-current="page"`. Wrap in `<nav aria-label="Breadcrumb">` (IT: `aria-label="Percorso di navigazione"`).

Trails:

| Page | EN trail | IT trail |
|---|---|---|
| Location | Home › Locations › Rome | Home › Località › Roma |
| Route | Home › Routes › Rome to Florence | Home › Tratte › Roma - Firenze |
| Airport | Home › Airport Transfers › Rome Fiumicino (FCO) | Home › Transfer Aeroporto › Roma Fiumicino (FCO) |
| Airport destination | Home › Airport Transfers › Rome Fiumicino › Rome City Centre | Home › Transfer Aeroporto › Roma Fiumicino › Roma Centro |
| Cross-border | Home › Cross-Border Transfers › Milan to Lugano | Home › Transfer Internazionali › Milano - Lugano |

Each breadcrumb also outputs `BreadcrumbList` JSON-LD with **absolute** URLs that match the visible trail exactly:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ciaoitaliantaxiservice.com/en/" },
    { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.ciaoitaliantaxiservice.com/en/locations/" },
    { "@type": "ListItem", "position": 3, "name": "Rome" }
  ]
}
```

Generate both from the registry (`parentId` chain) with one shared component.

---

## 4. Technical SEO

### 4.1 Canonicals

- Every indexable page has a **self-referencing absolute canonical** on the `www` host with the site's trailing-slash form.
- EN and IT pages are **not** canonical to each other. Each language canonicalises to itself; they are connected by hreflang.
- Use a cross-page canonical only for true duplicates (for example a filtered or tracking variant). Do not use canonicals to hide thin pages: improve them or don't publish them.
- `draft` pages: `noindex, follow` and no canonical games.

### 4.2 hreflang

Every page outputs three alternates (in Next.js `metadata.alternates.languages`):

```ts
alternates: {
  canonical: 'https://www.ciaoitaliantaxiservice.com/en/locations/rome/',
  languages: {
    'en': 'https://www.ciaoitaliantaxiservice.com/en/locations/rome/',
    'it': 'https://www.ciaoitaliantaxiservice.com/it/localita/roma/',
    'x-default': 'https://www.ciaoitaliantaxiservice.com/en/locations/rome/',
  },
},
```

- `x-default` points to the **EN** version.
- Must be reciprocal: the IT page lists exactly the same three URLs.
- `<html lang="en">` / `<html lang="it">` must match the page language.
- The language switcher links to the exact counterpart page (from the registry), never to the other language's home page.

### 4.3 Sitemap & robots

- `app/sitemap.ts` generates from the registry: only `status: 'live'` pages, absolute `www` URLs, `lastModified` from `lastmod`, and `alternates.languages` (en, it, x-default) for each entry.
- `robots.ts`: allow all, point to `https://www.ciaoitaliantaxiservice.com/sitemap.xml`. Do not block CSS/JS or `/_next/`.
- After adding pages, confirm the built `sitemap.xml` contains both languages of each new page.

### 4.4 Redirects & hosting

- Keep the existing bare-domain → `www` 301.
- Non-canonical slash form → canonical form 301 (handled in the Worker or Next config, whichever the site already uses).
- Any renamed URL gets a 301 entry in the existing redirects file. No redirect chains.

### 4.5 Performance (Core Web Vitals)

- Images: `next/image` (or the site's existing image component), WebP/AVIF, explicit width/height, `priority` only for the hero image, lazy for the rest.
- Reserve space for every image and placeholder so nothing shifts (CLS ≈ 0).
- Fonts: reuse the existing font loading (`next/font`), no new font files.
- No new heavy libraries for animation or sliders. Prefer CSS + IntersectionObserver or whatever animation utility already exists.

---

## 5. Keywords & on-page rules

### 5.1 Keyword mapping

One primary keyword per page, 3 to 6 secondary keywords, and no two pages targeting the same primary keyword (no cannibalisation). Record them in the page's registry entry or a front-matter comment.

| Page type | EN primary (pattern) | EN secondary ideas | IT primary (pattern) | IT secondary ideas |
|---|---|---|---|---|
| Location | `private transfer {city}` / `{city} private driver` | taxi {city}, chauffeur {city}, {city} car service, {city} transfers | `NCC {città}` / `transfer privato {città}` | autista privato {città}, noleggio con conducente {città}, taxi {città} |
| Route | `{from} to {to} private transfer` | {from} to {to} taxi, car service, by car, distance, travel time | `transfer {da} {a}` / `NCC {da} {a}` | taxi {da} {a}, auto con autista, quanto dista, come arrivare |
| Airport | `{airport} transfer` / `{airport} to {city} taxi` | {IATA} transfer, airport pickup, meet and greet | `transfer aeroporto {aeroporto}` / `NCC {aeroporto}` | taxi {aeroporto} {città}, navetta privata, accoglienza in aeroporto |
| Cross-border | `{from} to {to} private transfer` | {from} to {to} taxi, cross-border car service | `transfer {da} {a}` | NCC {da} {a}, transfer internazionale |

Research IT keywords natively (Italian users search "NCC", "transfer", "autista privato" more than a word-for-word translation of the EN terms). Never stuff keywords; write for people first.

### 5.2 On-page rules

| Element | Rule |
|---|---|
| `<title>` | 50 to 60 characters. Primary keyword near the start, brand at the end: `Rome Private Transfers & Chauffeur | Ciao Italian Taxi`. Re-check IT length separately (Italian runs about 15 to 20% longer). Unique per page. |
| Meta description | 140 to 160 characters. Benefit + proof + CTA. Unique per page and per language. |
| H1 | Exactly one, contains the primary keyword, reads naturally. Not identical to the title. |
| H2 | One per major section, many include secondary keywords naturally. |
| H3 | Sub-points inside a section (each FAQ question, each vehicle, each pickup point). Never skip heading levels. |
| Intro | First 100 words include the primary keyword and say exactly what the page offers. |
| URL | Contains the primary place/route name (see §2). |
| Images | Descriptive file name in the page language (`rome-private-transfer-colosseum.webp` / `roma-transfer-privato-colosseo.webp`), alt text under 125 chars describing the real image, place name once. See `content/image-alt-text.md`. |
| Open Graph / Twitter | `og:title`, `og:description`, `og:url` (canonical), `og:image` (1200×630), `og:locale` `en_GB` / `it_IT` and `og:locale:alternate` the other. |
| Word count | Location pages 900+ words, route/airport/cross-border pages 700+, hubs 400+ plus the listing. Words must be useful, not padding. |

### 5.3 Unique content requirements

Each page must contain specifics that only apply to that page, such as:

- Real pickup points (station names, ports, hotel areas, terminals, meeting points).
- Distance in km and typical drive time, with a note on traffic peaks.
- Local practicalities: ZTL (limited traffic zones), luggage advice, ferry/port timing, cruise terminals, mountain roads, border documents for cross-border trips.
- Suggested stops for routes (for example Orvieto on Rome to Florence), sights or areas served for locations.
- 5 to 8 FAQs written for that page, not generic.

If a fact is not confirmed, mark it with `[VERIFY: ...]` (see §7) rather than inventing it.

### 5.4 Structured data (JSON-LD)

Output via one reusable `<JsonLd />` component. Validate with Google's Rich Results Test before marking a page done.

- **Site-wide (layout):** `Organization` (or `LocalBusiness` once the real address and phone are confirmed) with `name`, `url`, `logo`, `sameAs`, `contactPoint`. If NAP (name, address, phone) data is not confirmed, omit those fields; don't make them up.
- **Location / route / airport / cross-border pages:** `Service` with
  - `serviceType`: "Private transfer (NCC)" / "Transfer privato (NCC)"
  - `provider`: reference the Organization `@id`
  - `areaServed`: the `City` / `Airport` / `Place` names on that page
  - `offers`: **only** when a real price exists (`priceCurrency: "EUR"`, `price`). Never a placeholder price.
- **Every page with FAQs:** `FAQPage` with exactly the visible questions and answers, in the page language. (Google shows FAQ rich results only for a few site types now, but the markup still helps understanding; keep it accurate.)
- **Every non-home page:** `BreadcrumbList` (see §3).
- Never add `Review` or `AggregateRating` unless they come from real, verifiable customer reviews.

### 5.5 Internal linking

Hub-and-spoke, generated from the registry where possible.

- **Hub → children:** every hub links to all its live children (card grid).
- **Child → hub:** via breadcrumb plus one in-content link.
- **Location page links to:** 3 to 6 nearby locations (`nearby`), the routes starting or ending there, the airport(s) serving it, and the contact/booking page.
- **Route page links to:** both endpoint location pages, the reverse direction (if it exists), 2 to 4 related routes from the same origin, the relevant airport page.
- **Airport page links to:** the city location page, its airport-destination children, the top routes from that city.
- **Cross-border page links to:** the Italian origin location page, the nearest airport page, other cross-border routes from the same region.
- Contextual in-text links: 3 to 8 per page, placed where they help the reader.
- **Anchor text:** descriptive and varied ("private transfer from Rome to Florence", "our Naples drivers", "Fiumicino airport pickup"). Never "click here" or "read more" alone. Do not use the exact same anchor for every link to a page. Always in the page's language and pointing to the **same-language** page.
- Never link to `draft` pages. No orphan pages: every live page has at least 3 internal links pointing to it.
- Header/footer: add hub links (Locations, Routes, Airport Transfers, Cross-Border) once each hub is live.

---

## 6. Design & layout of new pages

Use only existing components, tokens and fonts. If a needed component doesn't exist, build it from the existing primitives so it matches.

### 6.1 Section blueprint

**Location page**
1. Hero: H1, one-line value proposition, hero image (or image placeholder), primary CTA (red, "Book your transfer" / "Prenota il transfer"), secondary CTA (WhatsApp/phone if the site has it), 3 trust badges (licensed NCC, fixed price, meet & greet).
2. Quick facts strip: icon tiles (airports served, main stations, typical transfer times, fleet types).
3. Services in {city}: card grid (airport transfers, station pickups, city-to-city, hourly driver, port/cruise) each linking to the relevant page.
4. Popular routes from {city}: cards with destination, km, drive time, "from € [PRICE]" placeholder, link.
5. Fleet: vehicle cards (image, name, passengers, luggage) with vehicle placeholders until real data exists.
6. Pickup points & local tips: two-column layout or map illustration with ZTL/traffic notes.
7. How it works: 3 or 4 numbered steps.
8. Why choose us: icon grid.
9. FAQ: accordion (also feeds FAQPage schema).
10. Nearby locations: link chips/cards.
11. Final CTA band (dark band style used elsewhere on the site) with the booking form or link.

**Route page:** Hero with route summary (from → to, km, time, "from € [PRICE]") → route overview/map → what's included → suggested stops → vehicles & prices table → pickup/drop-off details → FAQ → reverse/related routes → CTA band.

**Airport page:** Hero with terminal info → meet & greet explained (step visuals) → destinations from this airport (cards to children) → flight tracking/waiting time policy → vehicles & prices → terminal pickup points → FAQ → CTA band.

**Cross-border page:** Hero → route overview → border & documents notes → vehicles & prices → stops → FAQ → related cross-border routes → CTA band.

**Hub page:** Intro (400+ words, keyword-rich) → filterable/grouped card grid of children (grouped by region) → featured items → FAQ → CTA.

### 6.2 Layout rules

- Alternate section backgrounds (white / Bianco Brillante / dark band) the same way existing pages do, so long pages have rhythm.
- No paragraph longer than about 4 lines on desktop; break content into cards, lists, steps, tables, icon rows and pull quotes.
- Every section has a heading, a short lead line, and a visual element (icon, image, card, number, map).
- Mobile first: check 360px width, no horizontal scroll, tap targets 44px+, sticky or repeated CTA on long pages.
- Accessibility: AA contrast (body text never in the light flag green), visible focus states, semantic landmarks, `alt` on every meaningful image.

### 6.3 Motion

- Subtle only: fade/slide-up on section enter (8 to 16px, 300 to 500ms, ease-out), staggered card reveal, hover lift on cards, accordion height transitions.
- Use the existing animation approach; if none exists, CSS + IntersectionObserver.
- Respect `prefers-reduced-motion: reduce` (disable transforms, keep content visible).
- Content must be visible and readable without JavaScript (static export, SEO). Never hide text that only appears after an animation fires.
- No autoplay carousels for key content; no animation that causes layout shift.

---

## 7. Placeholder convention (missing images, prices, vehicles, text)

Never skip a section. Build it fully and insert a visible placeholder where content is missing.

### 7.1 Marker format

Every placeholder has a **type** and a **unique ID**:

```
[[TYPE:ID | short description]]
```

| TYPE | Use for | Example |
|---|---|---|
| `IMG` | Photos and illustrations | `[[IMG:loc-rome-hero | Black sedan near Colosseum, 1600×900]]` |
| `PRICE` | Any price | `[[PRICE:route-rome-florence-sedan | Sedan 1-3 pax, one way]]` |
| `VEHICLE` | Vehicle model, capacity, photo | `[[VEHICLE:fleet-van-8 | 8-seat van model + photo]]` |
| `TEXT` | Copy needing owner input | `[[TEXT:about-owner-bio | Owner's story, 80-120 words]]` |
| `DATA` | Contact details, hours, licence number, reviews | `[[DATA:licence-ncc-number | NCC licence no.]]` |
| `VERIFY` | A fact written but not yet confirmed | `[[VERIFY:route-rome-florence-time | 3h drive time, check]]` |

ID format: `{page-id}-{slot}` in lowercase kebab-case, shared by the EN and IT versions of the same slot (so one fix fills both).

### 7.2 Rendering

Create one component, e.g. `src/components/Placeholder.tsx`:

```tsx
<Placeholder type="IMG" id="loc-rome-hero" note="Black sedan near Colosseum" ratio="16/9" />
<Placeholder type="PRICE" id="route-rome-florence-sedan" note="Sedan 1-3 pax" />
```

- Renders a clearly visible box in the section's real position and real size: dashed 1px border, light surface background, small label showing `TYPE · ID` and the note. Images keep their aspect ratio so the layout is final.
- Prices render inline as `€ [PRICE]` styled as a tag, inside the real price layout.
- Add `data-placeholder="TYPE:ID"` on the element so placeholders can be found in the built HTML.
- Add a code comment `// PLACEHOLDER(TYPE:ID)` next to each one so `grep -rn "PLACEHOLDER(" src` lists them all.
- Placeholders never go into JSON-LD, `<title>`, meta description or alt text.
- Optional before launch: an env flag (for example `NEXT_PUBLIC_PLACEHOLDER_MODE=soft`) that switches price placeholders to "Quote on request / Preventivo su richiesta" and image placeholders to a branded neutral graphic. Default stays visible.

### 7.3 Tracking list

Maintain `docs/PLACEHOLDERS.md` in the repo (create it if missing). Add a row for every placeholder when you create it; delete the row when it's filled.

```md
| ID | Type | Page (EN) | Page (IT) | What's needed | Spec | Status |
|---|---|---|---|---|---|---|
| loc-rome-hero | IMG | /en/locations/rome/ | /it/localita/roma/ | Hero photo: black sedan near Colosseum | 1600×900 WebP, < 200 KB | open |
| route-rome-florence-sedan | PRICE | /en/routes/rome-to-florence/ | /it/tratte/roma-firenze/ | One-way sedan price | EUR, incl. VAT | open |
```

At the end of each task, report the new placeholder IDs in the PR description.

---

## 8. Bilingual (EN + IT) rules

- **Parallel creation:** each page is created in EN and IT in the same PR, with the same sections, same placeholders (same IDs), same internal-link structure (pointing to same-language pages) and equivalent depth.
- **Native Italian:** write the Italian as a native copywriter would, not a literal translation. Adapt idioms, tone (use formal "Lei" or a consistent friendly "tu"; pick what existing IT pages use and keep it), and keywords (see §5.1).
- **Localised slugs:** IT URLs use Italian words and place names (see §2.2). Decided: slugs are localised, not shared.
- **Translate everything:** title, meta description, H1-H3, body, button labels, form labels and errors, breadcrumbs, `aria-label`s, alt text, image file names, FAQ (and its schema), `og:*` tags, and the 404 page.
- **Local formats:** IT uses `€ 120` or `120 €` (pick one and stay consistent), decimal comma (`1.250,50`), 24-hour time, `km`, dates `13 novembre 2026`. EN uses `€120`, `1,250.50`, `13 November 2026`, and still 24-hour time and km.
- **Place names:** EN "Rome, Florence, Venice, Naples, Milan, Turin, Genoa, Livorno"; IT "Roma, Firenze, Venezia, Napoli, Milano, Torino, Genova". For foreign destinations use the standard name of each language (Geneva/Ginevra, Zurich/Zurigo, Nice/Nizza, Ljubljana/Lubiana).
- **Store content per language** in the site's existing pattern (dictionaries, MDX per locale, or `content/{en,it}/...`). Keep keys in sync; a missing key must fail the build or show a `[[TEXT:...]]` placeholder, never silently fall back to the other language.
- **Language switcher** maps to the counterpart from the registry and keeps the user on the equivalent page.

---

## 9. Per-page checklist (copy into every PR)

```md
### Page: <page id>  (EN: <url>  |  IT: <url>)

URL & structure
- [ ] Slugs follow §2 patterns (lowercase, hyphenated, localised, trailing-slash form matches site)
- [ ] Registry entry added (id, type, parentId, slugs, names, related, nearby, lastmod, status)
- [ ] Parent hub is live and lists this page
- [ ] No existing URL changed (or 301 added + links updated)

Design
- [ ] Uses existing theme, tokens, fonts, components only
- [ ] All blueprint sections present (§6.1), none skipped
- [ ] Section rhythm, cards/icons/visuals, no text walls
- [ ] Motion subtle, respects prefers-reduced-motion, content visible without JS
- [ ] Mobile (360px) checked, no horizontal scroll, no layout shift

Content & SEO
- [ ] Primary + secondary keywords chosen, no cannibalisation (EN and IT researched separately)
- [ ] Title 50-60 chars, meta 140-160 chars, both unique (EN and IT)
- [ ] One H1 with primary keyword; logical H2/H3
- [ ] Word count target met with page-specific facts (pickup points, km, times, local tips)
- [ ] 5-8 page-specific FAQs
- [ ] Alt text + image file names in page language

Technical
- [ ] Self-referencing absolute canonical (www)
- [ ] hreflang en / it / x-default, reciprocal on both pages
- [ ] <html lang> correct; language switcher points to counterpart
- [ ] Visible breadcrumbs + BreadcrumbList JSON-LD match
- [ ] Service + FAQPage JSON-LD valid (Rich Results Test), no placeholder values in schema
- [ ] OG/Twitter tags set, og:locale correct
- [ ] Page in sitemap.xml with alternates (only if status = live)

Linking
- [ ] Links to hub, nearby/related pages, airport/route pages per §5.5
- [ ] 3-8 contextual links with descriptive, varied, same-language anchors
- [ ] At least 3 internal links point TO this page; hub, related pages updated
- [ ] No links to draft pages, no broken links

Placeholders
- [ ] Every missing image/price/vehicle/text/data has a visible [[TYPE:ID]] placeholder
- [ ] Same IDs used in EN and IT
- [ ] docs/PLACEHOLDERS.md updated; new IDs listed in PR description

Bilingual
- [ ] EN and IT both complete in this PR, same sections and depth
- [ ] Italian is native-quality, local formats (€, numbers, dates) correct

Build
- [ ] `next build` passes, no console errors, Lighthouse SEO 100 / Accessibility 95+ on both pages
```

---

## 10. How to run a task (agent workflow)

1. Read this file and inspect the repo (§1).
2. Confirm the page id, type, EN/IT slugs and keywords; add the registry entry as `draft`.
3. Write the EN and IT content (or adapt provided content), with placeholders for anything missing.
4. Build the page from the §6 blueprint using existing components.
5. Add metadata, canonical, hreflang, breadcrumbs, JSON-LD.
6. Add internal links both ways; update the hub and related pages.
7. Update `docs/PLACEHOLDERS.md`.
8. Run the build and the §9 checklist; switch status to `live`.
9. Open a PR with the checklist, the list of new URLs (EN + IT), keywords used, and new placeholder IDs.

One location (or one route/airport/cross-border page) per PR, so each page gets a proper review.
