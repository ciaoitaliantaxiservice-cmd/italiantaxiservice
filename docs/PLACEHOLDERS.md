# Placeholders

Every `[[TYPE:ID]]` still on the site (see `docs/seo-site-expansion-playbook.md` §7).
The same ID is used in EN and IT, so one fix fills both. Delete a row when
it is filled.

Find them in the built site with
`grep -o 'data-placeholder="[^"]*"' -r dist | sort -u`, and in the source
with `grep -rn "PLACEHOLDER(" src`.

## Homepage: "Where We Serve" / "Dove operiamo"

Pages: `/en/` and `/it/`.

| ID | Type | What's needed | Where to fill it | Status |
|---|---|---|---|---|
| stat-1 | TEXT | Number of cities and areas served, e.g. "10+" | `home.areas.stats` in `src/data/content/en.ts` and `it.ts` | open |
| stat-2 | TEXT | Number of airports covered | same | open |
| stat-3 | TEXT | Years of service | same | open |
| city-rome | IMG | Rome: the Colosseum in evening light | `photo` in `src/data/service-areas.ts` | open |
| city-milan | IMG | Milan: the Duomo spires | same | open |
| city-florence | IMG | Florence: rooftops and Brunelleschi’s dome | same | open |
| city-venice | IMG | Venice: the Grand Canal | same | open |
| city-naples | IMG | Naples: the bay with Vesuvius | same | open |
| city-amalfi-coast | IMG | Positano on the Amalfi Coast | same | open |
| city-lake-como | IMG | Bellagio lakefront on Lake Como | same | open |
| city-pisa | IMG | The Leaning Tower, Piazza dei Miracoli | same | open |
| city-bologna | IMG | Bologna’s Two Towers | same | open |
| city-verona | IMG | The Arena, Piazza Bra | same | open |

**City photo spec:** portrait 4:5 crop (at least 960×1200), WebP, with the
subject centred, because a dark overlay and the city name sit over the middle.
Each photo's alt text (EN and IT) is already written in
`content/image-alt-text.md`; choose a photo that matches it, or update the row.
Put the file in `src/assets/` under the key from that table, for example
`rome-service-area-colosseum.webp`.

## The premium fleet (homepage "Vehicle types", Rome and Milan fleet sections, both booking forms)

Pages: `/en/`, `/it/`, the Rome page and the Milan page. One shared fleet
(owner decision, 24 Nov 2026: luxury cars only). All values go in
`src/data/fleet.ts`, and every page updates from there. Prices and capacities
are never added to the JSON-LD.

| ID | Type | What's needed | Status |
|---|---|---|---|
| vehicle-e-class, vehicle-5-series, vehicle-s-class, vehicle-7-series, vehicle-v-class | IMG | Photo of each car | open |
| e-class-pax, 5-series-pax, s-class-pax, 7-series-pax, v-class-pax | VEHICLE | Maximum passengers per car | open |
| e-class-bags, 5-series-bags, s-class-bags, 7-series-bags, v-class-bags | VEHICLE | Large suitcases per car | open |
| e-class-from, 5-series-from, s-class-from, 7-series-from, v-class-from | PRICE | One-way "from" price, EUR | open |

**Vehicle photo spec:** landscape 4:3 (at least 1200×900), WebP. Use the
actual car (or the same model and colour), front three-quarter view, with a
clean background. The alt text in `content/image-alt-text.md` assumes a black
car, so change it if the car is another colour.

**Adding or removing a car:** edit `fleet` in `src/data/fleet.ts`. The
homepage tabs and slides, the Rome and Milan fleet cards and every form's
vehicle list update from that.

## Rome page (`loc-rome`): `/en/locations/rome/` and `/it/localita/roma/`

Facts and copy live in `src/data/rome.ts`; each slot there has a
`// PLACEHOLDER(TYPE:ID)` comment. Prices and capacities never go into JSON-LD.

| ID | Type | What's needed | Status |
|---|---|---|---|
| (fleet) | — | The fleet cards use the shared fleet IDs above (`e-class-from`, `v-class-bags`…) | see above |
| loc-rome-fco-from, loc-rome-cia-from, loc-rome-civitavecchia-from, loc-rome-termini-from | PRICE | Fixed fare to central Rome, sedan | open |
| loc-rome-route-{florence, naples, amalfi-coast, positano, pisa, siena, orvieto, tivoli, civitavecchia}-from | PRICE | One-way "from" price per route, sedan | open |
| loc-rome-video | IMG | Intro video for "Why riders choose us", 16:9 | open |
| loc-rome-dest-{vatican, trevi, pantheon, spanish-steps, forum, trastevere, villa-borghese} | IMG | Destination photos, 4:3, at least 960×720, WebP (the Colosseum card uses the existing photo) | open |
| loc-rome-hotel-{hassler, de-russie, eden, st-regis, cavalieri, artemide} | IMG | Hotel photos you have the right to use, 4:3 | open |
| loc-rome-hotels | VERIFY | Confirm the hotel list and star ratings (no partnership is claimed) | open |
| loc-rome-faq-waiting | DATA | Free waiting time at the airports, in minutes | open |
| loc-rome-faq-payment | TEXT | Accepted payment methods and deposit policy | open |
| loc-rome-faq-cancellation | TEXT | Cancellation window and terms | open |

Alt text for every pending photo is already in `content/image-alt-text.md`
(section "Pending photos (Rome page…)"); the file name is the row key.

## Contact page: `/en/contact/` and `/it/contatti/`

Copy lives in `contact` in `src/data/content/en.ts` and `it.ts`.

| ID | Type | What's needed | Status |
|---|---|---|---|
| contact-response-time | TEXT | How soon you reply to messages (e.g. "2 hours"); shown in the success message, the "Fast reply" card and the first FAQ | open |
| contact-faq-payment | TEXT | Accepted payment methods and deposit policy (FAQ "How do I pay?") | open |
| contact-address | DATA | The address card: fill `site.address` in `src/data/site.mjs` (`[[STREET ADDRESS]]`, `[[POSTCODE]]`, `[[CITY]]`, `[[REGION]]`). Once real, it also appears in the Organization schema automatically | open |

## Milan page (`loc-milan`): `/en/locations/milan/` and `/it/localita/milano/`

Facts and copy live in `src/data/milan.ts`; each slot there has a
`// PLACEHOLDER(TYPE:ID)` comment. Fleet slots use the shared fleet IDs above.
Prices never go into JSON-LD.

| ID | Type | What's needed | Status |
|---|---|---|---|
| loc-milan-mxp-from, loc-milan-lin-from, loc-milan-bgy-from, loc-milan-centrale-from | PRICE | Fixed fare to central Milan, E-Class | open |
| loc-milan-route-{como, bellagio, stresa, lugano, serravalle, fidenza, franciacorta, turin, verona, venice}-from | PRICE | One-way "from" price per route, E-Class | open |
| loc-milan-video | IMG | Intro video for "Why us", 16:9 | open |
| loc-milan-dest-{duomo, galleria, last-supper, navigli, brera, porta-nuova, castello, scala} | IMG | Destination photos, 4:3 (the first tile shows larger), WebP | open |
| loc-milan-hotel-{four-seasons, park-hyatt, armani, mandarin, bulgari, palazzo-parigi, principe, gallia} | IMG | Hotel photos you have the right to use, square crop | open |
| loc-milan-hotels | VERIFY | Confirm the hotel list and star ratings (no partnership is claimed) | open |
| loc-milan-faq-waiting | DATA | Free waiting time at the airports, in minutes (also shown in the Milan airport guide) | open |
| loc-milan-faq-uber | VERIFY | Uber's current options in Milan (premium cars with professional drivers; city taxis through the app) | open |
| loc-milan-faq-flat-fare | VERIFY | That city taxis still apply a flat fare Malpensa ↔ Milan, and that Linate and Bergamo rides are metered | open |

Alt text for every pending photo is already in `content/image-alt-text.md`
(section "Pending photos (Milan page…)"); the file name is the row key.

## Blog: `/en/blog/` and `/it/blog/`

| ID | Type | What's needed | Status |
|---|---|---|---|
| blog-rome-taxi-flat-fares | VERIFY | The current official Rome taxi flat fares from Fiumicino and Ciampino to inside the Aurelian Walls, in "Rome taxi prices" (`src/data/blog.ts`) | open |
| post-milan-taxi-guide, post-milan-airport-taxi, post-milan-taxi-or-uber, post-milan-taxi-fares, post-milan-day-trips | IMG | Lead photo per Milan guide, 16:9, at least 1600×900; brief and alt text in `content/image-alt-text.md` ("Pending photos (Milan blog posts)") | open |
| blog-milan-malpensa-flat-fare | VERIFY | Malpensa ↔ Milan taxi flat fare still in force (airport guide, fares guide) | open |
| blog-milan-taxi-tariffs | VERIFY | Current Milan taxi tariff structure (starting charges by time of day, per-km and per-minute rates, supplements) matches the fares guide | open |
| blog-milan-uber-options | VERIFY | Uber's current options in Milan, as described in "Taxi or Uber in Milan" | open |

## Location pages linked from the homepage but not built yet

The "Where We Serve" cards link to these on purpose, ahead of the pages, so
they return 404 until built. Build each one per the playbook (EN and IT
together).

| Area | EN | IT | Status |
|---|---|---|---|
| Lake Como | `/en/locations/lake-como/` | `/it/localita/lago-di-como/` | missing (404) |
| Pisa | `/en/locations/pisa/` | `/it/localita/pisa/` | missing (404) |
| Bologna | `/en/locations/bologna/` | `/it/localita/bologna/` | missing (404) |
| Verona | `/en/locations/verona/` | `/it/localita/verona/` | missing (404) |

These exist only as thin noindex stubs. They are not missing, but they still
need the full playbook build:

| Area | EN | IT | Status |
|---|---|---|---|
| Florence | `/en/locations/florence/` | `/it/localita/firenze/` | stub (noindex) |
| Venice | `/en/locations/venice/` | `/it/localita/venezia/` | stub (noindex) |
| Naples | `/en/locations/naples/` | `/it/localita/napoli/` | stub (noindex) |
| Amalfi Coast | `/en/locations/amalfi-coast/` | `/it/localita/costiera-amalfitana/` | stub (noindex) |
