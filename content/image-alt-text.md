# Image alt text

The single source of alt text for every image on the site. The build reads
this table (`src/data/image-alt.ts`): English goes on `/en/` pages, Italian on
`/it/` pages. Edit a cell here and rebuild; nothing else needs to change.

Rules the build enforces: every image the site renders must have a row, and
both cells must be filled. A missing row or an empty cell stops the build.

How to write one:

- Describe what is in the frame, as you would to someone on the phone.
- Write each language natively; do not translate word for word.
- Under about 160 characters. No "image of" or "photo of".
- Do not use alt text to stuff keywords; the file names and page copy do that.

| Image | English (`/en/`) | Italiano (`/it/`) |
|---|---|---|
| `private-chauffeur-transfer-italy` | A smiling chauffeur in a dark suit opens the rear door of a black saloon on a cobbled street of ochre houses with green shutters. | Su una via lastricata tra palazzi color ocra e persiane verdi, un autista sorridente in abito scuro apre la portiera posteriore di una berlina nera. |
| `italian-chauffeur-service-portrait` | A woman in a dark blazer and green silk scarf stands beside a black saloon on a sunlit street of ochre buildings. | Una donna in blazer scuro e foulard di seta verde, in piedi accanto a una berlina nera in una via assolata tra palazzi color ocra. |
| `rome-private-transfer-colosseum` | A chauffeur in a dark suit opens the rear door of a black saloon on a cobbled street, the Colosseum glowing in evening light behind. | Su una strada di sampietrini, l’autista in abito scuro apre la portiera posteriore di una berlina nera; alle spalle, il Colosseo nella luce del tramonto. |
| `milan-private-transfer-duomo-galleria` | Outside the Galleria Vittorio Emanuele II, with the Duomo beyond, a chauffeur holds open the door of a black saloon for a passenger carrying a briefcase. | Davanti alla Galleria Vittorio Emanuele II, con il Duomo sullo sfondo, l’autista tiene aperta la portiera della berlina nera per una passeggera con la valigetta. |
| `florence-private-transfer-duomo` | A black saloon waits in a narrow street of ochre houses and window boxes, with Brunelleschi’s dome and Giotto’s bell tower at the far end. | Una berlina nera ferma in una via stretta tra case color ocra e fioriere ai davanzali; in fondo, la cupola del Brunelleschi e il campanile di Giotto. |
| `venezia-transfer-piazzale-roma` | At Piazzale Roma in Venice, a chauffeur lifts a suitcase from a black saloon for a passenger, with the Ponte della Costituzione and a water taxi behind. | A Piazzale Roma, a Venezia, l’autista scarica una valigia dalla berlina nera per una passeggera; dietro, il Ponte della Costituzione e un taxi acqueo. |
| `naples-private-transfer-vesuvius` | A black saloon parked on the Naples waterfront under palm trees, with a ferry in the harbour and Vesuvius beyond. | Una berlina nera sul lungomare di Napoli, all’ombra delle palme, con un traghetto in porto e il Vesuvio sullo sfondo. |
| `amalfi-coast-private-transfer-positano` | A black saloon on the coast road above Positano, between a lemon tree and bougainvillea, with the village stepping down the cliff to the sea. | Una berlina nera sulla strada costiera sopra Positano, tra un limone e la bouganville, con il paese che scende a gradoni verso il mare. |
| `logo` | Ciao Italian Taxi Service | Ciao Italian Taxi Service, logo |
| `logo-emblem-reversed` | Ciao Italian Taxi Service | Ciao Italian Taxi Service, logo |

Images with no alt text on purpose (decorative, `alt=""` or `aria-hidden`):
the inline header logo mark (the wordmark beside it names the link), the
Lucide icons (each sits next to a text label) and the map tiles.
