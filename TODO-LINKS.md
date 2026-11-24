# Links to add later

Pages that the site already points at with `href="#"` (or not at all yet),
because the page they should open does not exist. When one is built, swap
the `#` for its URL (EN and IT) and delete its row here. In the code, each
spot is marked `// TODO: link … page when created`.

## Rome page: "Major cities near Rome" (`src/components/sections/RomeBody.tsx`, data in `src/data/rome.ts` → `romeNearby`)

| City | EN page to create | IT page to create | Status |
|---|---|---|---|
| Florence | `/en/locations/florence/` (noindex stub today) | `/it/localita/firenze/` | `href="#"` |
| Naples | `/en/locations/naples/` (noindex stub today) | `/it/localita/napoli/` | `href="#"` |
| Pisa | `/en/locations/pisa/` | `/it/localita/pisa/` | `href="#"` |
| Siena | `/en/locations/siena/` | `/it/localita/siena/` | `href="#"` |
| Perugia | `/en/locations/perugia/` | `/it/localita/perugia/` | `href="#"` |
| Orvieto | `/en/locations/orvieto/` | `/it/localita/orvieto/` | `href="#"` |
| Assisi | `/en/locations/assisi/` | `/it/localita/assisi/` | `href="#"` |
| Viterbo | `/en/locations/viterbo/` | `/it/localita/viterbo/` | `href="#"` |

## Rome page: "Top destinations in Rome" (`romeDestinations`)

No URL pattern for sight pages exists in the playbook yet; decide one before
building them (for example a blog guide per sight).

| Destination | Status |
|---|---|
| Colosseum | `href="#"` |
| Vatican & St. Peter's | `href="#"` |
| Trevi Fountain | `href="#"` |
| Pantheon | `href="#"` |
| Spanish Steps | `href="#"` |
| Roman Forum | `href="#"` |
| Trastevere | `href="#"` |
| Villa Borghese | `href="#"` |

## Rome page: cards that should link to their own page once built

Today these cards only have a "Book" button that fills in the form.

| Card | EN page to create | IT page to create |
|---|---|---|
| Fiumicino Airport (FCO) | `/en/airport-transfers/rome-fiumicino/` | `/it/transfer-aeroporto/roma-fiumicino/` |
| Ciampino Airport (CIA) | `/en/airport-transfers/rome-ciampino/` | `/it/transfer-aeroporto/roma-ciampino/` |
| Rome → Florence | `/en/routes/rome-to-florence/` | `/it/tratte/roma-firenze/` |
| Rome → Naples | `/en/routes/rome-to-naples/` | `/it/tratte/roma-napoli/` |
| Rome → Amalfi Coast | `/en/routes/rome-to-amalfi-coast/` | `/it/tratte/roma-costiera-amalfitana/` |
| Rome → Positano | `/en/routes/rome-to-positano/` | `/it/tratte/roma-positano/` |
| Rome → Pisa | `/en/routes/rome-to-pisa/` | `/it/tratte/roma-pisa/` |
| Rome → Siena | `/en/routes/rome-to-siena/` | `/it/tratte/roma-siena/` |
| Rome → Orvieto | `/en/routes/rome-to-orvieto/` | `/it/tratte/roma-orvieto/` |
| Rome → Tivoli | `/en/routes/rome-to-tivoli/` | `/it/tratte/roma-tivoli/` |
| Rome → Civitavecchia | `/en/routes/rome-to-civitavecchia/` | `/it/tratte/roma-civitavecchia/` |

## Milan page: "Cities near Milan" (`src/components/sections/MilanBody.tsx`, data in `src/data/milan.ts` → `milanNearby`)

| City | EN page to create | IT page to create | Status |
|---|---|---|---|
| Monza | `/en/locations/monza/` | `/it/localita/monza/` | `href="#"` |
| Pavia | `/en/locations/pavia/` | `/it/localita/pavia/` | `href="#"` |
| Como | `/en/locations/como/` (or the planned `/en/locations/lake-como/`) | `/it/localita/como/` (or `/it/localita/lago-di-como/`) | `href="#"` |
| Bergamo | `/en/locations/bergamo/` | `/it/localita/bergamo/` | `href="#"` |
| Lugano | `/en/cross-border-transfers/milan-to-lugano/` (playbook §2.2) | `/it/transfer-internazionali/milano-lugano/` | `href="#"` |
| Brescia | `/en/locations/brescia/` | `/it/localita/brescia/` | `href="#"` |
| Turin | `/en/locations/turin/` | `/it/localita/torino/` | `href="#"` |
| Verona | `/en/locations/verona/` | `/it/localita/verona/` | `href="#"` |

## Milan page: "Top destinations in Milan" (`milanDestinations`)

Same open question as Rome: no URL pattern for sight pages yet.

| Destination | Status |
|---|---|
| Duomo di Milano | `href="#"` |
| Galleria Vittorio Emanuele II | `href="#"` |
| The Last Supper / Il Cenacolo | `href="#"` |
| Navigli | `href="#"` |
| Brera | `href="#"` |
| Porta Nuova | `href="#"` |
| Castello Sforzesco | `href="#"` |
| Teatro alla Scala | `href="#"` |

## Milan page: cards that should link to their own page once built

Today these only fill in the booking form.

| Card | EN page to create | IT page to create |
|---|---|---|
| Malpensa (MXP) | `/en/airport-transfers/milan-malpensa/` | `/it/transfer-aeroporto/milano-malpensa/` |
| Linate (LIN) | `/en/airport-transfers/milan-linate/` | `/it/transfer-aeroporto/milano-linate/` |
| Bergamo (BGY) | `/en/airport-transfers/milan-bergamo/` | `/it/transfer-aeroporto/bergamo-orio-al-serio/` |
| Milan → Como, Bellagio, Stresa, Turin, Verona, Venice | `/en/routes/milan-to-{city}/` | `/it/tratte/milano-{citta}/` |
| Milan → Serravalle, Fidenza Village, Franciacorta Village | decide: route pages or day-trip pages | |
| Milan → Lugano | `/en/cross-border-transfers/milan-to-lugano/` | `/it/transfer-internazionali/milano-lugano/` |

The route and airport hubs (`/en/routes/`, `/en/airport-transfers/` and
their IT versions) must go live first (playbook §2.2: children never exist
without their hub). The homepage "Where We Serve" links to Lake Como, Pisa,
Bologna and Verona are tracked in `docs/PLACEHOLDERS.md`.
