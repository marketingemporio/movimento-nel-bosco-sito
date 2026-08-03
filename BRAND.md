# BRAND — Movimento nel Bosco

> Specifiche del brand applicate al sito. Fonte: cartella **`Brand DEF/`** (Beamlight) + `Brand DEF/Palette.pdf`.

## Palette ufficiale (HEX esatti)
Definiti come variabili CSS nel blocco `:root` di `css/styles.css`.

| Ruolo nel sito | Variabile CSS | HEX | Note |
|---|---|---|---|
| Viola primario | `--viola` | `#601d7d` | colore principale, bottoni, titoli accento |
| Viola profondo | `--viola-scuro` | `#2e0644` | sfondi scuri, footer, hover (è il viola del logo) |
| Testo scuro | `--melanzana` | `#33252d` | corpo testo |
| Viola medio | `--violetto` | `#826fc5` | accenti secondari |
| Periwinkle | `--periwinkle` | `#889be2` | accenti azzurro-viola |
| Lilla chiaro | `--lilla` | `#d1b4ed` | dettagli, bordi |
| Lilla pastello | `--lilla-tenue` | `#efe6fb` | sfondi tenui (tint derivato) |
| Verde lime | `--lime` | `#9dbf43` | accento (tag, dettagli) |
| Ambra | `--ambra` | `#f2ac20` | accento caldo (CTA) |
| Off-white | `--panna` | `#faf8f5` | sfondi chiari |

## Tipografia
Fonte: `Movimento nel bosco brand_Rev.1.pdf`, pagina tipografia — Rubik per i **titoli**
("contemporaneo e amichevole", dialoga col segno del logo), DM Sans per i **contenuti**
("chiarezza, leggibilità e versatilità", neutralità che bilancia i titoli).

- **Titoli**: **Rubik SemiBold (600)** (Google Fonts) — variabile `--font-title`
  - Il peso non è opzionale: nel PDF Rev.1 **ogni** occorrenza di Rubik è SemiBold
    (verificato sui font incorporati: il claim "Il benessere è un movimento naturale.",
    "Concept di brand", "Movimento nel Bosco"). Con Regular (400) o Medium (500) i
    titoli "non sembrano lo stesso font" del documento, pur essendo Rubik.
  - Spaziatura: il documento usa `Tc -0.021`, cioè ≈ `letter-spacing: -.021em`.
    Nel CSS i titoli stanno a `-.025em`: equivalente.
  - Il peso è dichiarato **una volta sola**, su `h1,h2,h3,h4` in `css/styles.css`.
    Non reintrodurre `font-weight` sui singoli titoli: è così che l'`h1` della home
    era finito a 400.
- **Sottotitoli, paragrafi, occhielli, didascalie, meta, etichette form**: **DM Sans** — `--font-body`
- Caricati via `@import` in cima a `css/styles.css`. Entrambi gratuiti, nessun problema di licenza.

### Chi usa cosa (per non far ri-scivolare l'assegnazione)
| Rubik (`--font-title`) | DM Sans (`--font-body`) |
|---|---|
| `h1`–`h4` | occhielli: `.hero-eyebrow`, `.pillar-tag`, `.scroll-cue`, `.eyebrow` |
| citazioni display: `.quote-band blockquote`, `.post-quote` | sottotitoli: `.teacher .role`, `.review cite` |
| capolettera `.post-body ::first-letter` | meta/date: `.post-meta`, `.post-date`, `.post-card .date`, `.event .when` |
| numeri display: `.pkg-price`, `.step .n` | didascalie: `.equip figcaption` |
| domande FAQ `.faq summary`, firma `.post-signature` | form: `label`, `legend`, `strong` dentro i paragrafi |
| | dati palinsesto: `.class-time`, `.class-name`, `.week-slot b`, `.tt-legend` |

**Etichette d'interfaccia** (menu, bottoni, chip, tab: `--font-ui`) sono un caso a parte: il brand
book non le classifica né come titoli né come testo. Oggi puntano a Rubik per dare carattere ai
comandi; per spostarle tutte su DM Sans basta cambiare `--font-ui: var(--font-body)` nel `:root`.

I pesi caricati devono coprire quelli usati: Rubik 300→800, DM Sans 400/500/600/700 + corsivo 400.
Se assegni un peso non importato il browser lo simula (finto grassetto, resa sporca).

## Logo e icone (file in `assets/`, sorgente in `Brand DEF/`)
- `assets/logo-positivo.svg` → **header** (su sfondo chiaro) — lockup crocus + lettering "movimento nel bosco".
- `assets/logo-negativo.svg` → **footer** (su sfondo scuro), versione chiara.
- `assets/favicon.svg` → favicon (icona tonda = "Icona 1" di Beamlight).
- `assets/solo-icona.svg` → solo il fiore (crocus), per usi futuri.
- Disponibili anche in `Brand DEF/Png/` (PNG) e `Brand DEF/Svg/` (tutte le varianti: Logo positivo/negativo, Solo icona, Icona 1/2/3, Timbro).

Il logo scelto è il **crocus con gambo corposo** (era "ver.1" nel primo brand Rev.1; ora è il logo definitivo Beamlight).

## Concept / tono
"Il benessere non è una destinazione ma un percorso in continua evoluzione." Linguaggio naturale,
accogliente e contemporaneo; professionale senza rinunciare alla spontaneità.

## Note
- I PDF di riferimento: `Brand DEF/Movimento nel Bosco_Brand DEF.pdf` (brand book definitivo) e
  `Movimento nel bosco brand_Rev.1.pdf` (prima versione, storica).
- Pattern crocus disponibile nei PDF del brand (non ancora usato come texture nel sito).
