# ITER — Sito Movimento nel Bosco (rebrand + migrazione da Emporio)

> Nota di handoff per riprendere il lavoro. Ultimo aggiornamento: **2026-06-24**.
> Stato: **WIP — anteprima home pronta, NON deployata online.**

## 🎯 Obiettivo
Scorporare tutto il mondo **Yoga / Pilates / Meditazione** dal sito Emporio nel Bosco
(dove vive dentro la sezione *Corsi*, fatta in GemPages) e ricostruirlo come **sito
con identità propria** del brand **Movimento nel Bosco**, collegato all'app esistente
**Yoga nel Bosco**. Risultato finale = **sito + app**.

## ✅ Decisioni prese (bloccate)
- **Sito da zero** (il vecchio prototipo React è parcheggiato in `_vecchio-prototipo/`, non cancellato).
- **Abbonamenti/acquisti restano sullo Shopify di Emporio**: il sito è la vetrina brandizzata,
  i bottoni mandano al checkout Shopify già attivo e l'app gestisce le prenotazioni.
- **Brand** (dal PDF `Movimento nel bosco brand_Rev.1.pdf`, di Beamlight):
  - **Palette ver.2** (quella di destra, luminosa: viola, verde lime, ambra, lilla, periwinkle, melanzana, off-white).
  - **Logo = crocus ver.1** (gambo corposo, con foglia + ricciolo pieno).
  - **Font: Rubik** (titoli) + **DM Sans** (testi).
- **Insegnanti**: Sara Silvestrini **non c'è più** → la **Meditazione** ora è di **Camilla Rossini** (che fa anche Pilates). Laura Albertini: Yoga, Gravidanza, Mamma e Bimbo, Aromaterapia.

## 📦 Contenuti — fonte e stato
I testi si traghettano **fedeli** dagli export GemPages forniti da Michele, in `Pagine gempages/`.
**NON si reinventa nulla.** Quando manca una pagina, si chiede l'export a Michele.

Mappa export → pagina (tutte GemPages, scaricate ✓):

| Pagina | File export | In scope |
|---|---|---|
| Corsi (hub → **HOME**) | page_export…20-31-47 / …57 | ✅ |
| Corsi di Yoga | page_export…20-31-47 | ✅ |
| Yoga in Gravidanza | page_export…20-31-47 | ✅ |
| Yoga Mamma e Bimbo | page_export…20-31-47 | ✅ |
| Pilates | page_export…20-31-57 | ✅ |
| Sessioni di Meditazione | page_export…20-32-09 | ✅ |
| Orari (+ widget palinsesto) | Orari.gempages | ✅ |
| Abbonamenti | Abbonamenti.gempages | ✅ |
| Regolamento | Regolamento.gempages | ✅ |
| Prenota Lezione | Prenota Lezione.gempages | ✅ |
| Laura Albertini | Laura Albertini.gempages | ✅ |
| Camilla Rossini | Camilla Rossini.gempages | ✅ |
| Bagno Sonoro con Handpan | page_export…20-32-09 | 📌 PARCHEGGIATA |
| Viaggio con Oli Essenziali | Viaggio con Oli Essenziali.gempages | 📌 PARCHEGGIATA |

➕ **9 prodotti "Abbonamento"** (Yoga, Pilates, Gravidanza, Annuale, Private, Mamma e Bimbo,
Meditazione e Chakra, ecc.): testi già recuperati dall'API Shopify.

## 🏗️ Fatto finora
- Vecchio prototipo → `_vecchio-prototipo/` (preservato).
- Scaffold sito nuovo: `index.html` + `css/styles.css` (design tokens + Rubik/DM Sans).
- **HOME costruita** dalla hub "Corsi", testo verbatim. Concesso solo un *minimo* riadattamento:
  header/nav + footer nuovi, riordino sezioni in flusso da homepage, coerenza insegnanti,
  micro-descrizione "Mamma e Bimbo" presa dalla scheda prodotto reale.

## ⚠️ Provvisorio (in attesa asset da Beamlight)
- 🎨 **Palette HEX = stimati** dal PDF → blocco `:root` in cima a `css/styles.css`, da sostituire con i valori esatti.
- 🪻 **Logo = crocus segnaposto** disegnato a mano → sostituire con l'**SVG ver.1** di Beamlight.
- 🖼️ **Foto** = reali dal CDN Shopify, ma l'abbinamento foto↔sezione è da rifinire.
- 🔤 Eventuale **favicon** e **pattern** crocus mancano (arrivano da Beamlight).

## ⏭️ Prossimi passi (in ordine)
1. **Pagina Yoga** → definisce il modello "pagina disciplina" da riusare (Pilates, Gravidanza, Mamma e Bimbo, Meditazione).
2. Pagine servizio: **Orari** (+palinsesto), **Abbonamenti**, **Regolamento**, **Prenota Lezione**.
3. Pagine **insegnanti** (Laura, Camilla).
4. Sostituire asset provvisori con quelli **Beamlight** (logo SVG, HEX, pattern, favicon).
5. Collegare le **CTA**: acquisto → checkout Shopify Emporio; prenotazione → app **Yoga nel Bosco**.
6. **Deploy** (GitHub + Netlify) e **dominio** — solo quando concordato con Michele.

## ▶️ Come riprendere
1. Apri `index.html` nel browser per vedere l'anteprima home.
2. Leggi questo file.
3. Riparti dal punto 1 dei "Prossimi passi" (pagina **Yoga**).
4. Per estrarre il testo di una pagina: gli export `.gempages` sono ZIP → dentro c'è
   `1_<id-template>.json` con il contenuto (HTML). L'id template combacia con la pagina su Shopify.

## 🚫 Note importanti
- **Non deployare** finché Michele non dà l'ok: il push dello stato dell'arte va su una **branch dedicata**, non su `main` (Netlify è collegato, `main` potrebbe pubblicare).
- Repo GitHub: `marketingemporio/movimento-nel-bosco-sito`.
