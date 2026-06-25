# ITER — Sito Movimento nel Bosco (rebrand + migrazione da Emporio)

> Nota di handoff per riprendere il lavoro. Ultimo aggiornamento: **2026-06-24 (sera)**.
> Stato: **WIP — TUTTE le pagine in scope migrate. Da valutare con Michele. NON deployato online.**

## 🎯 Obiettivo
Scorporare il mondo **Yoga / Pilates / Meditazione** dal sito Emporio nel Bosco (sezione *Corsi*, fatta in GemPages) e ricostruirlo come **sito con identità propria** del brand **Movimento nel Bosco**, collegato all'app esistente **Yoga nel Bosco**.

## ✅ Decisioni prese (bloccate)
- **Sito da zero** (vecchio prototipo React parcheggiato in `_vecchio-prototipo/`, non cancellato).
- **Abbonamenti/acquisti restano sullo Shopify di Emporio**: il sito è la vetrina, i bottoni "Acquista" mandano al checkout Shopify; le prenotazioni vanno sull'app.
- **Brand** (da `Movimento nel bosco brand_Rev.1.pdf`, Beamlight): **palette ver.2** (luminosa), **logo crocus ver.1** (gambo corposo), **font Rubik** (titoli) + **DM Sans** (testi).
- **Insegnanti**: Sara Silvestrini **non c'è più** → la **Meditazione** è di **Camilla Rossini** (che fa anche Pilates). Laura Albertini: Yoga, Gravidanza, Mamma e Bimbo, Aromaterapia.

## 🏗️ Fatto — sito completo (12 pagine)
Tutte costruite con `css/styles.css` condiviso, testo **fedele** dagli export GemPages:
- `index.html` — **HOME** (dalla hub Corsi)
- `yoga.html` · `pilates.html` · `gravidanza.html` · `mamma-e-bimbo.html` · `meditazione.html`
- `orari.html` · `abbonamenti.html` (prezzi reali dai prodotti Shopify) · `regolamento.html` (6 punti integrali) · `prenota.html`
- `laura-albertini.html` · `camilla-rossini.html`

## 📌 Parcheggiate (fuori scope, da rivalutare)
- `Bagno Sonoro con Handpan` · `Viaggio con Oli Essenziali` (export presenti, non costruite).

## ⚠️ PUNTI APERTI da sciogliere con Michele
1. **Indirizzo incoerente**: alcune pagine dicono **Via Fermi 2** (hub, mamma-bimbo, Regolamento §5), altre **Via Fontane 32** (yoga, pilates, gravidanza, meditazione). Ho uniformato a **Via Fontane 32** ovunque, TRANNE nel Regolamento dove ho lasciato il testo fedele (Via Fermi 2). → decidere quello giusto.
2. **URL app "Yoga nel Bosco"**: in `prenota.html` il bottone "Vai all'applicazione" è un segnaposto `href="#"` → inserire il link reale.
3. **Palinsesto Yoga e Gravidanza**: nell'export era un widget/immagine, non testo → in `orari.html` ho messo solo Pilates / Mamma e Bimbo / Meditazione (orari noti) + nota. Servono gli orari di Yoga/Gravidanza.
4. **Form "Richiedi prova"**: nell'originale erano embed **Tally.so** → ora i CTA puntano a `prenota.html` / mail. Se servono i form, reinserire l'embed Tally.
5. **Foto**: sono reali dal CDN Shopify ma l'abbinamento foto↔sezione è una mia scelta, da rifinire.

## ⏳ In attesa da Beamlight
Logo ver.1 in **SVG**, **HEX esatti** palette ver.2, **pattern** crocus, **favicon** → sostituire i segnaposto (palette nel blocco `:root` di `css/styles.css`, logo = SVG inline nelle pagine).

## ▶️ Come riprendere
1. Apri `index.html` e naviga il sito (tutti i link interni funzionano).
2. Valuta con Michele; correggi i 5 punti aperti qui sopra.
3. Sostituisci asset provvisori con quelli Beamlight.
4. Collega CTA acquisto → prodotti Shopify (già fatto sulle pagine principali) e prenotazione → app.
5. **Deploy** (GitHub + Netlify) e dominio — solo quando concordato.

## 🚫 Note importanti
- **Non deployare** finché Michele non dà l'ok. Lo stato dell'arte è pushato sulla branch **`rebrand-movimento`** (non `main`; Netlify è collegato a questo repo).
- Repo GitHub: `marketingemporio/movimento-nel-bosco-sito`.
- Export GemPages sorgente in `Pagine gempages/`.
