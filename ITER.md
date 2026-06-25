# ITER — Sito Movimento nel Bosco (memoria di progetto)

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
- **Indirizzo**: **Via Fontane 32, 25133 Brescia (Mompiano)** ovunque.
- **Insegnanti**: Sara Silvestrini **non c'è più** → la **Meditazione** è di **Camilla Rossini** (che fa anche Pilates). **Laura Albertini**: Yoga, Gravidanza, Mamma e Bimbo, Aromaterapia.

## 🏗️ Cosa è fatto (12 pagine complete)
`index.html` (HOME/hub) · `yoga.html` · `pilates.html` · `gravidanza.html` · `mamma-e-bimbo.html` ·
`meditazione.html` · `orari.html` · `abbonamenti.html` · `regolamento.html` · `prenota.html` ·
`laura-albertini.html` · `camilla-rossini.html`.
- Testo **fedele** dagli export GemPages (in `Pagine gempages/`).
- **Immagini reali** dalla CDN Shopify, posizionate pagina per pagina (mappa in [`PAGINE.md`](PAGINE.md)).
- **Logo + favicon + palette ufficiali** (Beamlight). CSS condiviso in `css/styles.css` (token colore nel blocco `:root`).
- Orari = **un solo palinsesto** (immagine `orari_complessivi_2026.png`).

## ⏳ Punti aperti / prossimi passi
1. **Form Tally** "richiedi prova": nell'originale erano embed Tally → ora i CTA puntano a `prenota.html` / WhatsApp / mail. Se servono i form veri, serve il link/ID Tally.
2. **Pagine eventi parcheggiate** (export presenti, NON costruite): *Bagno Sonoro con Handpan*, *Viaggio con Oli Essenziali*. Da rivalutare.
3. **Palinsesto**: ora è l'immagine complessiva; se cambiano gli orari va aggiornata l'immagine.
4. **Deploy** (GitHub → Netlify) e **dominio** (`movimentonelbosco.it`): solo quando concordato. **NON deployare** senza ok.
5. Eventuale rifinitura abbinamento foto↔sezione (alcune scelte sono ragionevoli ma migliorabili).

## 🧭 Come riprendere in una nuova chat
1. Apri `index.html` nel browser e naviga (tutti i link interni funzionano).
2. Leggi questo file + `BRAND.md` + `PAGINE.md`.
3. Gli export GemPages sorgente sono in `Pagine gempages/` (sono ZIP: dentro `1_<id>.json` con HTML; l'id combacia col template della pagina Shopify).
4. Continua dai "Punti aperti".

## 🗂️ Repo / git
- Repo GitHub: **`marketingemporio/movimento-nel-bosco-sito`**
- Branch di lavoro: **`rebrand-movimento`** (lo stato dell'arte è qui; `main` è collegato a Netlify → non pushare lì finché non si vuole pubblicare).
- Netlify `siteId` in `.netlify/state.json` (collegato, ma nessun deploy automatico attivato da noi).
