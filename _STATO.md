# Movimento nel Bosco — STATO (leggimi per primo)

> **Handoff per riprendere in una nuova chat.** Ultimo aggiornamento: **2026-06-27**.
> Stato: **sito completo in anteprima locale, NON deployato online.**
> Leggi anche: [`BRAND.md`](BRAND.md) (logo, palette, font), [`PAGINE.md`](PAGINE.md) (mappa pagine, contenuti, immagini) e [`BLOG.md`](BLOG.md) (sezione racconti: come aggiungerne).

## 🎯 Obiettivo del progetto
Scorporare tutto il mondo **Yoga / Pilates / Meditazione** dal sito Emporio nel Bosco
(dove vive nella sezione *Corsi*, costruita in GemPages) e ricostruirlo come **sito con
identità propria** del brand **Movimento nel Bosco**, collegato all'app esistente **Yoga nel Bosco**.
Risultato = **sito + app**.

## ✅ Decisioni prese (bloccate)
- **Sito ricostruito da zero** (static HTML + CSS + un po' di JS, no build, deployabile su Netlify). Il vecchio prototipo React è in `_vecchio-prototipo/` (preservato, non cancellare).
- **Commerce (NUOVO, 2026-06-26)**: **niente più vendite su Shopify**. Gli abbonamenti si vendono **solo sul sito**, con pagamento **fittizio**: l'ordine si completa con **bonifico** o **in sede** alla prima lezione. Tolti tutti i link `emporionelbosco.it/products/...`.
- **Due percorsi distinti nel navbar**: **"App prenotazione"** (clienti già attivi → app) e **"Prova gratuita"** (nuovi → `prova-gratuita.html`). L'app si raggiunge **solo dal navbar** (niente bottoni app sparsi nel corpo, non sono CTA di vendita).
- **App prenotazioni**: **`https://movimentonelbosco.it/app`** (pulsante "App prenotazione" nel navbar di ogni pagina).
- **Brand ufficiale Beamlight** applicato (cartella `Brand DEF/`): logo, palette, font. Dettagli in [`BRAND.md`](BRAND.md).
- **Indirizzo**: **Via Fontane 32, 25133 Brescia (Mompiano)** ovunque (anche per gli eventi).
- **Insegnanti**: Sara Silvestrini **non c'è più** → la **Meditazione** è di **Camilla Rossini** (che fa anche Pilates). **Laura Albertini**: Yoga, Gravidanza, Mamma e Bimbo, Aromaterapia.
- **Posizionamento brand**: claim hero home = **"a Mompiano dal 2024"**; footer = **"progetto nato da Emporio nel Bosco"** (dal 2026-06-26 «Emporio nel Bosco» è un **link dofollow** a `emporionelbosco.it`, per link building, su tutte le 18 pagine).

## 🛒 E-commerce abbonamenti (NUOVO 2026-06-26) — come funziona
- **`abbonamenti.html`** = **catalogo** in stile shop: si sceglie la **disciplina** dalle chip (Yoga/Pilates/Meditazione/Gravidanza/Mamma e Bimbo/Open — **niente "Tutti"**, si vede **una disciplina alla volta**) e dentro la card un **menu a tendina** sceglie il pacchetto (1/4/12 lezioni…) aggiornando **prezzo** e pulsante "Acquista". L'**Open (275€)** è l'ultima chip.
- **I prezzi vivono in UN SOLO posto**: `js/shop.js` (array `PRODOTTI`). Card e checkout leggono da lì. Per cambiare un prezzo si edita solo `js/shop.js`.
- Flusso: catalogo → **"Acquista"** (`checkout.html?p=<id>`) → **`checkout.html`** (riepilogo + dati cliente + scelta pagamento bonifico/in sede) → invio → **`grazie.html`** (conferma).
- Il form della cassa usa **Netlify Forms** (`name="ordine-abbonamento"`): cattura gli ordini **quando il sito è online su Netlify** (in locale il submit non parte, è normale). `action="/grazie.html"`.
- **Mail di conferma al cliente**: scaffold pronto in **`netlify/functions/submission-created.mjs`** (usa Resend). DA ATTIVARE con le chiavi (vedi "Cosa deve fare Michele").

## 🆕 Blog dal Bosco (2026-06-27) — sezione racconti
Nuova sezione **narrativa**: il diario di **Paola** sul movimento nel bosco (passeggiate,
fiori, stagioni). **Nome "Blog dal Bosco" PROVVISORIO** (da cambiare). Pagine nuove:
`blog.html` (vetrina), `blog-le-primule-sotto-il-faggio.html` (racconto di **esempio**,
da sostituire), `blog-modello-racconto.html` (modello da duplicare, `noindex`). Voce
**"Blog"** aggiunta a menu e footer di **tutte** le 18 pagine. Stili nel blocco
`/* Blog dal Bosco */` di `css/styles.css`. SEO + `sitemap.xml` aggiornati; modello in
`robots.txt` Disallow. **I racconti li scrive Paola** con questo strumento (no CMS):
procedura passo-passo in [`BLOG.md`](BLOG.md).

## 🏗️ Pagine (17 totali)
HOME/hub `index.html` · corsi: `yoga.html` `pilates.html` `gravidanza.html` `mamma-e-bimbo.html` `meditazione.html` ·
`orari.html` · **`abbonamenti.html`** (catalogo shop) · `regolamento.html` ·
**`prova-gratuita.html`** (nuovi: modulo Tally) · `prenota.html` (clienti: come usare l'app) ·
**`checkout.html`** (cassa) · **`grazie.html`** (conferma ordine) ·
`laura-albertini.html` · `camilla-rossini.html` ·
eventi: `eventi.html` (hub) · `bagno-sonoro.html` · `viaggio-oli-essenziali.html`.

## 🆕 Fatto nella sessione 2026-06-26 (notturna, autonoma)
1. **Stop Shopify**: rimossi i 9 link `/products/` (abbonamenti, pilates, meditazione) e ogni "Acquista".
2. **Catalogo e-commerce** (`abbonamenti.html` + `js/shop.js` + CSS `.shop-*`): card + filtri, Open in fondo.
3. **Cassa e conferma**: `checkout.html` (form Netlify, bonifico/in sede) + `grazie.html`.
4. **Scaffold email**: `netlify/functions/submission-created.mjs` (Resend) + `netlify.toml`.
5. **Un solo Open** (era doppio in Yoga+Pilates+pagina Pilates): ora unico, 275€, valido per tutto.
6. **Navbar 2 pulsanti**: "App prenotazione" + "Prova gratuita" su tutte le pagine; tolti i bottoni app dal corpo. Fix wrapping (testo dei pulsanti andava a capo): `white-space:nowrap`, il menu testuale collassa nell'hamburger sotto **1024px**, "App prenotazione" nascosto sotto **620px**.
7. **Prova gratuita** (`prova-gratuita.html`): nuova pagina nuovi-clienti con **modulo Tally embeddato** (loader in fondo pagina) + sezione contatti.
8. **prenota.html**: ora è la pagina-aiuto dei **clienti** (come prenotare con l'app), niente bottone app nel corpo (rimanda al navbar).
9. **Video di Laura ripristinati** dalla CDN Shopify nei blocchi "Ciao sono Laura": `yoga.html` → `0227fe05…mp4`, `gravidanza.html` e `mamma-e-bimbo.html` → `5e5cb923…mp4` (blocchi diventati a 2 colonne testo+video, stile `.laura-video`).
10. **pilates.html / meditazione.html**: tolti i listini propri, rimandano al catalogo.
11. **regolamento.html**: testo pagamenti allineato (no carta online; bonifico o in sede).
12. **Testato** desktop (1280/1100) e mobile con Chrome headless. Link interni: tutti validi. Catalogo: 16 prodotti renderizzati, Open ultima, checkout prende prodotto+prezzo da `?p=`.
13. **SEO completa (2026-06-26)** su tutte le 16 pagine indicizzabili (checkout/grazie restano `noindex`): **title + description** unici (focus **Mompiano/Brescia** + esperienza insegnanti), **canonical**, **Open Graph + Twitter Card**, meta `geo`/`theme-color`, **alt** degli hero arricchiti, **JSON-LD** (`@graph`: LocalBusiness/HealthClub a Mompiano + WebPage + BreadcrumbList; **Course** sulle pagine corso, **Person** su Laura/Camilla). Aggiunti **`sitemap.xml`** (16 URL) e **`robots.txt`**. JSON-LD validati (16/16 ok), nessun title duplicato.

## ⏳ Cosa deve fare Michele (per andare live davvero)
1. **Tally — UN form unico**: in `prova-gratuita.html` ora c'è il form **Yoga (`w2LvYg`)** come **TEMPORANEO**. Crea **un solo** form con una tendina **"Disciplina"** e sostituisci `w2LvYg` con il nuovo ID (cerca `SEGNAPOSTO MODULO TALLY` nel file). (L'altro form ricevuto era Pilates `q4ZPz9`.)
2. **Contatti reali**: in `prova-gratuita.html` ci sono `[numero da inserire]` (WhatsApp) e `[email da inserire]` — sostituiscili (cerca `[numero da inserire]`).
3. **Mail di conferma cliente**: crea account **Resend** (gratis), verifica il dominio mittente, poi su Netlify aggiungi le env `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_BCC` (istruzioni in cima a `netlify/functions/submission-created.mjs`). Senza chiave l'ordine si salva comunque su Netlify Forms.
4. **Notifica ordini a te**: su Netlify → Forms → notifiche email verso la tua casella.
5. **IBAN bonifico**: si invia a mano via email al cliente (di proposito NON è messo in pagina).
6. **Deploy**: il checkout e le email funzionano **solo online** (Netlify). Quando vuoi pubblicare, si fa il merge in `main` (collegato a Netlify). **NON pushare su `main` senza ok.**
7. **SEO — da verificare/completare dopo il deploy**: (a) le **coordinate geo** nel JSON-LD sono **approssimative** (Mompiano ~45.571, 10.236) → metti quelle esatte di Via Fontane 32; (b) eventuale **telefono/email/Instagram** nell'attività locale (ora omessi per non inventarli); (c) dopo la pubblicazione, invia **`sitemap.xml`** a **Google Search Console** e registra l'attività su **Google Business Profile** (Mompiano) per la SEO locale; (d) immagine social (og:image) ora = foto hero da CDN Shopify: se vuoi, sostituiscila con una grafica dedicata 1200×630.

## ⏳ Punti aperti minori
- Rifinitura abbinamento foto↔sezione (alcune scelte migliorabili).
- Footer mobile: link di testo ~20px (ideale ~44px per il tocco) — non bloccante.
- Test sotto i 500px solo a calcolo: Chrome headless qui ha viewport minimo 500px; il fit a 360–414px è verificato sulle larghezze reali misurate (brand 127 + pulsante 140 + hamburger 44), con stretta CSS dedicata `@media (max-width:620px)`.

## 🧭 Come riprendere in una nuova chat
1. Anteprima locale: dalla cartella del sito lancia `python3 -m http.server 8000` → apri **http://localhost:8000**.
2. Leggi questo file + `BRAND.md` + `PAGINE.md`.
3. Prezzi/prodotti: `js/shop.js`. Catalogo/cassa: `abbonamenti.html` + `checkout.html` + `grazie.html`.
4. Continua da "Cosa deve fare Michele".

## 🗂️ Repo / git
- Repo GitHub: **`marketingemporio/movimento-nel-bosco-sito`**
- Branch di lavoro: **`rebrand-movimento`** (lo stato dell'arte è qui; `main` è collegato a Netlify → non pushare lì finché non si vuole pubblicare).
- Netlify `siteId` in `.netlify/state.json` (collegato, ma nessun deploy automatico attivato da noi).
