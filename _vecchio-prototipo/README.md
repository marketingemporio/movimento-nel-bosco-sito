# Movimento nel Bosco — Sito

Sito ufficiale di Movimento nel Bosco · Yoga, Pilates & Meditazione · Brescia.

## Struttura

```
index.html         → pagina + tutti gli stili CSS
app.jsx            → componenti React, dati (corsi, palinsesto, FAQ, testimonianze)
tweaks-panel.jsx   → kit del pannello "Tweaks" (toggle di palette/font/forma/densità)
image-slot.js      → web component drag-and-drop per le immagini
fonts/             → file woff2 self-hosted (Cormorant Garamond, Agrandir, ecc.)
```

## Come funziona

Apri `index.html` con qualunque static server (o doppio click in locale).

- React + Babel sono caricati da CDN — nessuna build necessaria.
- I componenti `<image-slot>` mostrano una foto di default (da `loremflickr.com`,
  Creative Commons) e accettano drag-and-drop di immagini reali — la scelta
  persiste in `.image-slots.state.json` accanto a `index.html`.
- Il pannello **Tweaks** è in basso a destra: cambia palette, font dei titoli,
  forma delle immagini e densità degli spazi.

## Modificare i contenuti

- **Corsi, insegnanti, descrizioni** → `COURSES` in `app.jsx`
- **Palinsesto settimanale** → `SCHEDULE` in `app.jsx`
- **Testimonianze** → `TESTIMONIALS` in `app.jsx`
- **Domande frequenti** → `FAQS` in `app.jsx`
- **Palette / font / forme di default** → `TWEAK_DEFAULTS` in `app.jsx`
- **Stili (colori, spacing, tipografia)** → blocco `<style>` in `index.html`

## Sostituire le foto

Tre modi:

1. **Drag-and-drop** sull'`<image-slot>` corrispondente (live, salva su sidecar JSON).
2. Modificare `placeholderSrc` / `coursePlaceholderSrc` nei `COURSES` per le
   tile dei corsi.
3. Modificare l'attributo `src=` sulle `<image-slot>` hard-coded in `app.jsx`
   (hero, testimonianze, contatti).
