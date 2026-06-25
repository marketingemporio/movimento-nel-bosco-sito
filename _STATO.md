# Movimento nel Bosco — STATO (leggimi per primo)

> **Handoff per riprendere in una nuova chat.** Ultimo aggiornamento: **2026-06-25**.
> Stato: **sito completo in anteprima locale, NON deployato online.**
> Leggi anche: [`BRAND.md`](BRAND.md) (logo, palette, font) e [`PAGINE.md`](PAGINE.md) (mappa pagine, contenuti, immagini).

## 🎯 Obiettivo del progetto
Scorporare tutto il mondo **Yoga / Pilates / Meditazione** dal sito Emporio nel Bosco
(dove vive nella sezione *Corsi*, costruita in GemPages) e ricostruirlo come **sito con
identità propria** del brand **Movimento nel Bosco**, collegato all'app esistente **Yoga nel Bosco**.
Risultato = **sito + app**.

## ✅ Decisioni prese (bloccate)
- **Sito ricostruito da zero** (static HTML + CSS, no build, deployabile su Netlify). Il vecchio prototipo React è in `_vecchio-prototipo/` (preservato, non cancellare).
- **Commerce**: abbonamenti/acquisti **restano sullo Shopify di Emporio** → i bottoni "Acquista" puntano ai prodotti `emporionelbosco.it/products/...`.
- **Prenotazioni**: app **`https://movimentonelbosco.it/app`** (link nel bottone "Vai all'applicazione" di prenota.html).
- **Brand ufficiale Beamlight** applicato (cartella `Brand DEF/`): logo, palette, font. Dettagli in [`BRAND.md`](BRAND.md).
- **Indirizzo**: **Via Fontane 32, 25133 Brescia (Mompiano)** ovunque (anche per gli eventi).
- **Insegnanti**: Sara Silvestrini **non c'è più** → la **Meditazione** è di **Camilla Rossini** (che fa anche Pilates). **Laura Albertini**: Yoga, Gravidanza, Mamma e Bimbo, Aromaterapia.
- **Posizionamento brand**: claim hero della home = **"a Mompiano dal 2024"** (Movimento nel Bosco ha identità propria dal 2024); footer = **"progetto nato da Emporio nel Bosco"** (non "una realtà di").

## 🏗️ Cosa è fatto (15 pagine complete)
`index.html` (HOME/hub) · `yoga.html` · `pilates.html` · `gravidanza.html` · `mamma-e-bimbo.html` ·
`meditazione.html` · `orari.html` · `abbonamenti.html` · `regolamento.html` · `prenota.html` ·
`laura-albertini.html` · `camilla-rossini.html` ·
**`eventi.html`** (hub Eventi) · **`bagno-sonoro.html`** · **`viaggio-oli-essenziali.html`**.
- Testo **fedele** dagli export GemPages (in `Pagine gempages/`).
- **Immagini reali** dalla CDN Shopify, posizionate pagina per pagina (mappa in [`PAGINE.md`](PAGINE.md)).
- **Logo + favicon + palette ufficiali** (Beamlight). CSS condiviso in `css/styles.css` (token colore nel blocco `:root`).
- **Orari = palinsesto in HTML/CSS** (griglia settimanale `.timetable` + legenda in `orari.html`, stili in `css/styles.css`). NON è più un'immagine: per cambiare gli orari si edita direttamente la griglia in `orari.html` (dati trascritti dall'immagine `orari_complessivi_2026.png`).
- **Sezione Eventi**: voce "Eventi" in nav e footer di tutte le pagine; hub `eventi.html` con i due eventi nuovi (testi fedeli all'export) + rimando agli eventi di yoga all'aperto (`yoga.html#eventi-yoga`).
- **Fix (2026-06-25)**: l'hero di `yoga.html` era un'immagine cancellata da Shopify (404) → sostituita con `ea2c0925` (la "rituale" è passata a `c4e7099f`).
- **Menu mobile (2026-06-25)**: aggiunto **hamburger responsive** (compare sotto i 920px) su tutte le 15 pagine. Prima i link del menu sparivano in mobile/tablet senza alternativa (non c'era hamburger né JS). Ora: pulsante `.nav-toggle` nell'header, stili in `css/styles.css`, logica in **`js/nav.js`** (apre/chiude, icona ☰→✕, si chiude al clic su una voce o con Esc). Verificato con Chrome headless: menu apre su tutte le pagine, **zero overflow** da 1920px fino a 320px.

## ⏳ Punti aperti / prossimi passi
1. **Form Tally** "richiedi prova": nell'originale erano embed Tally → per ora i CTA puntano a `prenota.html`. Michele li **riaggancerà** lui (servono link/ID Tally). Lasciati così di proposito.
2. ~~Pagine eventi parcheggiate~~ → **FATTE (2026-06-25)**: `bagno-sonoro.html` e `viaggio-oli-essenziali.html`, raccolte nell'hub `eventi.html`. (L'export "Sessioni di Meditazione" era invece la pagina meditazione, già esistente.)
3. ~~Palinsesto immagine~~ → **ricostruito in HTML (2026-06-25)** in `orari.html`. Per modifiche orari: editare la griglia `.timetable` lì (non più un'immagine).
4. ~~Indirizzo eventi~~ → **risolto (2026-06-25)**: sempre **Via Fontane 32 (Mompiano)**, confermato da Michele (l'export Bagno Sonoro riportava "Via Fermi 2", non usato).
5. ~~Banner "Anteprima — palette & logo provvisori"~~ → **rimosso (2026-06-25)** da tutte le pagine, insieme alla regola CSS `.wip`.
6. **Deploy** (GitHub → Netlify) e **dominio** (`movimentonelbosco.it`): solo quando concordato. **NON deployare** senza ok.
7. Eventuale rifinitura abbinamento foto↔sezione (alcune scelte sono ragionevoli ma migliorabili).
8. ~~Analisi viewport completa~~ → **FATTA (2026-06-25)**: testate tutte le 15 pagine da 1920px a 320px (Chrome headless). Risultato: layout solido, **zero overflow e zero immagini rotte** ovunque; unico problema funzionale = menu mobile mancante → **risolto** (vedi "Menu mobile" sopra). Resta una **nota minore** non bloccante: i link di testo del footer in mobile sono alti ~20px (ideale ~44px per il tocco) — migliorabile quando si vuole.

## 🧭 Come riprendere in una nuova chat
1. Anteprima locale: dalla cartella del sito lancia `python3 -m http.server 8000` → apri **http://localhost:8000** (oppure apri `index.html` col doppio clic).
2. Leggi questo file + `BRAND.md` + `PAGINE.md`.
3. Gli export GemPages sorgente sono in `Pagine gempages/` (sono ZIP: dentro `1_<id>.json` con HTML; l'id combacia col template della pagina Shopify).
4. Continua dai "Punti aperti".

## 🗂️ Repo / git
- Repo GitHub: **`marketingemporio/movimento-nel-bosco-sito`**
- Branch di lavoro: **`rebrand-movimento`** (lo stato dell'arte è qui; `main` è collegato a Netlify → non pushare lì finché non si vuole pubblicare).
- Netlify `siteId` in `.netlify/state.json` (collegato, ma nessun deploy automatico attivato da noi).
