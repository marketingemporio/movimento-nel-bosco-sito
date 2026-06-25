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
- **Titoli**: **Rubik** (Google Fonts)
- **Testi / paragrafi**: **DM Sans** (Google Fonts)
- Caricati via `@import` in cima a `css/styles.css`. Entrambi gratuiti, nessun problema di licenza.

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
