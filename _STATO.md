# Movimento nel Bosco — STATO (leggimi per primo)

> **Handoff per riprendere in una nuova chat.** Ultimo aggiornamento: **2026-08-03**.
> Stato: **branch `restyling-v3`** — anteprima come **draft Netlify** (sito `movimento-nel-bosco-75b5b2ef`, account Paola; ogni `netlify deploy --no-build --dir .` senza `--prod` genera un nuovo link), NON in produzione. Il restyling-v2 resta intatto sul suo branch; snapshot pre-restyling nel tag **`versione-1`**.
> 👉 **Parti dalla sezione [🆕 Sessione 2026-07-06/07](#-sessione-2026-07-0607--revisione-struttura-home-e-navbar) qui sotto**: è lo stato più recente.
> Leggi anche: [`FILOSOFIA.md`](FILOSOFIA.md) (essenza e struttura della scuola — NUOVO), [`BRAND.md`](BRAND.md) (logo, palette, font), [`PAGINE.md`](PAGINE.md) (mappa pagine, contenuti, immagini) e [`BLOG.md`](BLOG.md) (sezione racconti: come aggiungerne).

## 🆕 Sessione 2026-08-03 — numero WhatsApp ufficiale

- **La scuola ha il suo numero: +39 352 088 5613.** Confermato da Paola come numero ufficiale di Movimento nel Bosco.
- **Sostituito ovunque nel sito**: 107 sostituzioni in 25 pagine (link `wa.me/393520885613`, il numero scritto per esteso in home, e i commenti `SEGNAPOSTO WHATSAPP` rimossi perché non serve più cercarli). Il vecchio numero Emporio `393520885612` non compare più in nessun file del sito.
- ⚠️ **Da verificare prima di pubblicare**: che il 5613 sia attivo su WhatsApp e risponda. Differisce di **una sola cifra** dal numero Emporio.
- **QR code WhatsApp** con messaggio precompilato (prova Pilates e prova Yoga) in `brains/movimento-brain/Materiali/`.

## 🆕 Sessione 2026-07-06/07 — revisione struttura, home e navbar
> Richieste di Paola, in sequenza. Tutto verificato con screenshot/click reali in locale.

- **Meditazione non è più un corso**: tolta da menu, home, palinsesto e catalogo abbonamenti; vive tra gli **eventi** ("Cicli di Meditazione", card in `eventi.html` e in home). `meditazione.html` resta la sua pagina (a cicli) con acquisto diretto delle 2 formule (120€/20€). `js/shop.js`: tolta dalla `DISC_ORDER`.
- **Orari giornalieri**: `orari.html` ora ha **tab Lun–Sab** (stile nalumilano.com/booking), un giorno alla volta, default = giorno corrente (`js/orari.js`, nuovo). Niente più tabella settimanale.
- **Home ristrutturata**: hero "Yoga, Pilates e consapevolezza, a Brescia" + sottotitolo su corsi+eventi; sezione **"Corsi ed eventi, una direzione"** (2 card + "+", dalla filosofia); video **"Ci presentiamo"**; corsi = solo Vinyasa Yoga e Pilates; poi eventi, prova in 3 passi, sala nel verde (foto Piazzetta Braille), recensioni, "Qualche informazione utile" (ex FAQ), banda Emporio ("nati da Emporio nel Bosco"). Rimossi: sezione insegnanti, citazione Laura.
- **Grafica home "bosco magico"**: sfondi a macchie sfumate della palette (radial-gradient per sezione), bordi superiori strappati (clip-path), card leggermente ruotate che si raddrizzano al hover, evidenziatore organico `.mark`, timbro brand in filigrana (`assets/timbro.svg`, da Brand DEF → copiato anche in `immagini/Branding/`). Foto: angoli arrotondati uniformi (`--arch: 24px`), niente più forma ad arco.
- **Copy**: via tutte le etichette sopra i titoli (`.eyebrow`, "scritte piccoline"); titolo struttura "Corsi ed eventi" (non "due percorsi": si sommano, non si escludono).
- **Font**: dopo prove con DM Serif Display e Fraunces (Montas Light e Roca One sono a pagamento), **si resta su Rubik**.
- **Navbar nuovo** (identico su tutte le 25 pagine): Yoga (link + tendina: Vinyasa/Gravidanza/Mamma e Bimbo) · Pilates · Orari · Abbonamenti · Eventi · **Chi siamo** (tendina: Movimento nel Bosco → `la-visione.html`, Le insegnanti → `il-team.html`) · Blog. Sparito il contenitore "Corsi"; CSS aggiornato per il caso "link+freccetta" a livello principale.
- **NUOVO `FILOSOFIA.md` + `FILOSOFIA.html`**: l'essenza della scuola (corpo come strumento di consapevolezza; corsi settimanali = lavoro costante, eventi = pratiche cicliche su suono/aromaterapia/natura). È la bussola per contenuti futuri.
- **Netlify**: sito draft `movimento-nel-bosco-75b5b2ef` creato il 2026-07-06 (site_id `bb91b528-…`, team Paola). Deploy anteprima: `netlify deploy --no-build --dir . --site bb91b528-5f0c-4999-b082-8c86bb0dc953 --message "..."`. **Mai `--prod`.**

## 🆕 Sessione 2026-07-03 — RESTYLING COMPLETO v3 (branch `restyling-v3`)
> Richiesta di Paola: **restyling completo, contenuti + grafica**, mantenendo solo **palette Brand DEF e font (Rubik + DM Sans)**. Obiettivo: un sito che rispecchi i documenti di lavoro del vault emporio-brain (`Movimento nel Bosco/Piano azione - nuovo sito e Instagram`, `Instagram - Primi 9 post`), cioè la "nuova veste" della scuola.

**Principi applicati (dal piano d'azione):**
- **CTA unica dominante ovunque: "Prenota la lezione di prova"** (bottone ambra; l'app resta come link sobrio nel navbar). Ogni pagina chiude con la CTA prova.
- **Mobile-first**: nuova **barra CTA fissa in basso** su mobile (prova + WhatsApp) su tutte le pagine.
- **Frizione zero**: bottoni **WhatsApp** (`wa.me`) in home, prova, barra mobile e footer. Numero: **+39 352 088 5613** (numero ufficiale della scuola; fino al 2026-08-03 era il segnaposto Emporio +39 352 088 5612).
- **Insegnanti in primo piano** (sezione "Facce vere" in home, team-grid con ritratti tondi). Foto Mantratzi/Parisi = placeholder iniziali (cerca `FOTO:`).
- **Regola copy**: niente promesse di cura; benessere/equilibrio/ascolto/percorso. Claim brand in home: "Il benessere non è una destinazione, ma un percorso".
- Recensioni Google reali con stelline su home e pagine corso.

**Cosa è stato rifatto:** `css/styles.css` **da zero** (nuovo design system: foto ad arco stile crocus, sezioni tinte, reveal allo scroll, accordion FAQ nativi `<details>`); tutte le **24 pagine** rigenerate con header/footer/meta uniformi. Meditazione ora è **evergreen** (a cicli, senza date fisse). Gli eventi yoga-all'aperto vivono in `eventi.html#yoga-aperto`. **Invariati e funzionanti**: `js/shop.js` (catalogo/cassa, stesse classi), Netlify Forms (`ordine-abbonamento`, `avvisami-eventi`), loader Tally in prova-gratuita, `netlify/functions/`. Blog: stesse classi e procedura `BLOG.md` (modello incluso). SEO: meta/JSON-LD per pagina + `sitemap.xml` (21 URL) + robots (aggiunto Disallow grazie-avvisami).
- Le pagine sono state generate con script usa-e-getta nello scratchpad della sessione (non nel repo): il sito resta **HTML statico puro senza build**.

**Revisione tono (2026-07-03, richiesta Paola):** copy allineato alla regola del Brain **"Tono di voce copy — regola generale"** (Metodi e Strumenti, feedback Michele 2026-07-02: asciutto e concreto, frasi corte, niente prosa poetica) e al TOV Emporio di `BRAND-STYLE.md` (niente slogan/fiabesco, off-brand words evitate — "prendersi cura di" resta ok). Titoli diretti: hero home = **"Yoga e Pilates a Brescia"**, H1 delle pagine = nomi delle cose ("Corsi di Pilates a Brescia", "Orari dei corsi", "Il team"…). Le uniche zone dove resta un tono più narrativo, di proposito: **Blog dal Bosco** (diario di Paola, come da `BLOG.md`) e — in misura ridotta — `la-visione.html`.

**Testato il 2026-07-03**: tutte le pagine HTTP 200 in locale; link interni tutti validi (script di verifica); screenshot desktop 1280px (home, orari, abbonamenti, pilates, prova, checkout) e mobile 500px (home): catalogo con filtri/tendine ok, checkout carica il prodotto da `?p=`, barra mobile ok.

**Da fare / decisioni aperte (oltre alla lista "Cosa deve fare Michele"):**
- Foto reali dallo shooting (10-11 lug) → sostituire hero/ritratti (cerca `FOTO:` e i commenti nei file).
- ~~Numero WhatsApp dedicato?~~ **Risolto il 2026-08-03**: la scuola ha il suo numero, **+39 352 088 5613** (vedi sessione in cima).
- Link Instagram nel footer punta a `instagram.com/movimentonelbosco` (account previsto ~14 lug — verificare handle al lancio).
- Anteprima locale: **`npx serve . -l 3000`** (⚠️ su questo PC `python` non funziona, è solo l'alias dello Store).

## 🆕 Sessione 2026-06-30 — restyling + nuove pagine (branch `restyling-v2`)
> Lavoro fatto sul branch **`restyling-v2`** (creato dallo snapshot **tag `versione-1`**, che congela lo stato "sito completo" del 27/06). `versione-1` resta recuperabile in ogni momento.

**Navigazione & corsi**
- Menu **"Corsi"** a tendina: dentro c'è **Yoga** (voce cliccabile → pagina panoramica) con sotto-menu **Vinyasa Yoga · Gravidanza · Mamma e Bimbo**, più **Pilates** e **Meditazione**. Aggiunta la voce **"Il team"** in navbar (tra Corsi e Orari) su tutte le pagine.
- **`yoga.html`** ora è la **panoramica** "Corsi di Yoga a Mompiano" (presenta i tipi di yoga). **NUOVA `vinyasa-yoga.html`** = ex "yoga adulti", solo Vinyasa (rimosso "Over 60"). Schede corsi: tolto "Con + insegnante"; Meditazione senza "Aromatica" né riferimenti agli oli essenziali.

**Home ridisegnata** (ispirazione: Alma, MYA, Samya)
- **Hero** con foto **"Yoga Ronchi"** (lezione di gruppo al tramonto), immersivo e centrato; testi aggiornati.
- Struttura: **striscia marquee** in alto · **discipline in 3 card con foto circolari** (Yoga/Pilates/Meditazione) · **Manifesto del nome** (Bosco + Movimento) · **fascia immagine full-bleed** (foto "Valle di Mompiano") · **esperienze in elenco numerato** · **"Il nostro spazio"** (ex sezione "aromaterapia", ridimensionata: ambiente + cura erboristica dell'Emporio).
- Comunicata l'**identità "Movimento nel Bosco"** (fonti marketing in `Marketing-Brain/Movimento nel Bosco/`: *Piano azione…* e *Instagram - Primi 9 post*).

**Team**
- **NUOVA `il-team.html`**: **Laura Albertini, Laura Mantratzi, Paola Parisi** (Vinyasa Yoga) e **Camilla Rossini** (Pilates e Meditazione). **Foto e bio sono PLACEHOLDER** — cerca i commenti `FOTO:` e `BIO:` nel file. Sezione insegnanti **tolta dalla home**; footer "Insegnanti" → `il-team.html`.
- ⚠️ Questo **aggiorna** la riga "Insegnanti" più in basso: il team Yoga è Laura Albertini + Laura Mantratzi + Paola Parisi (tutte Vinyasa); Camilla fa Pilates e Meditazione.

**Branding**
- **Font invariati** (Rubik + DM Sans). Palette = **brand iniziale (viola/lilla)**; come accento verde si usa **solo il lime della palette** (`#9dbf43`). Tolto il "verde bosco" custom. Gli header dei corsi interni mantengono i colori palette (Pilates ambra, Meditazione periwinkle).
- Immagini locali in **`immagini/`** (`Valle di Mompiano.jpeg`, `Yoga Rochi.jpg`).

**Da fare (prossimi passi)**
- Inserire **foto e bio reali** del team; creare le pagine dedicate per **Mantratzi** e **Parisi** (come `laura-albertini.html` / `camilla-rossini.html`).
- **Estendere il restyling della home alle pagine interne** (ora hanno ancora l'impostazione precedente).
- Eventuali: menu con anteprime fotografiche, animazioni leggere allo scroll.
- Anteprima locale di questa fase: `npx serve . -l 3000` → **http://localhost:3000**.

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
- **Branch di lavoro attuale: `restyling-v2`** (pushato su GitHub il 2026-06-30) — è qui lo stato dell'arte.
- Snapshot congelato: **tag `versione-1`** (stato "sito completo" pre-restyling). Branch `rebrand-movimento` fermo a quel punto.
- `main` è collegato a Netlify → **non pushare/mergiare lì** finché non si vuole pubblicare.
- Netlify `siteId` in `.netlify/state.json` (collegato, ma nessun deploy automatico attivato da noi).
