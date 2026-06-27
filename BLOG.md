# BLOG dal Bosco — come funziona e come aggiungere un racconto

> ⚠️ **Il nome "Blog dal Bosco" è PROVVISORIO.** Quando decidiamo il nome vero
> (es. "Diario del Bosco", "Taccuino del Bosco"…) va cambiato in: voce di menu e
> footer di tutte le pagine, titoli dentro `blog.html`, e — se vogliamo URL diversi —
> i nomi dei file. Finché il sito non è online, cambiarlo costa poco.

## Cos'è
La sezione **racconti** di Movimento nel Bosco: il **diario di Paola**. Non un blog
"enciclopedico" sulle piante, ma il racconto personale di come Paola vive il movimento
nella natura — passeggiate, fiori che incontra, stagioni, scoperte. Tono caldo, in prima
persona, lento. Yoga/Pilates restano una cosa a parte.

## I file (tutti nella cartella del sito)
| File | Cos'è |
|---|---|
| `blog.html` | La **vetrina**: elenco dei racconti (una "cartolina" per ciascuno). |
| `blog-le-primule-sotto-il-faggio.html` | **Racconto di esempio** (modello reale). Si può sostituire o tenere. |
| `blog-modello-racconto.html` | **Modello vuoto da duplicare** per un nuovo racconto. Non è pubblico (è `noindex`). |
| `css/styles.css` | Gli stili del blog sono nel blocco `/* Blog dal Bosco */` (in fondo). |

## Come aggiungere un nuovo racconto (per Paola)
Quello che serve da te: **il testo del racconto**, **un titolo**, **la data**, e
**le foto** (i link delle foto, o le foto da caricare). Poi, con questo stesso strumento
(Claude), chiedi: *"aggiungi un racconto al blog"* e si seguono questi passi:

1. **Duplica** `blog-modello-racconto.html` con un nuovo nome:
   `blog-` + titolo-con-i-trattini `.html`
   (es. *"Il bosco dopo la pioggia"* → `blog-il-bosco-dopo-la-pioggia.html`).
2. Nel file nuovo, **sostituisci i segnaposti in MAIUSCOLO** (sono elencati nei
   commenti in cima al file): titolo, sommario, data (estesa + in formato `2026-03-12`),
   categoria, foto di copertina, minuti di lettura. **Importante:** cambia anche
   `noindex, nofollow` in **`index, follow`** (è scritto nel commento accanto).
3. **Scrivi il racconto** dentro `<div class="post-body">`. Strumenti disponibili:
   - paragrafi normali `<p>…</p>` (la prima lettera diventa grande in automatico);
   - sottotitolo `<h2>…</h2>`;
   - foto con didascalia: blocco `<div class="post-figure">…</div>`;
   - frase in evidenza: `<p class="post-quote">…</p>`.
4. **Aggiungi la "cartolina"** in cima alla vetrina `blog.html` (nel blocco
   `<div class="cards">`): copia un blocco `<article class="card">…</article>`
   esistente e cambia foto, data, categoria, titolo, anteprima e link.
5. **Aggiungi 1 riga** in `sitemap.xml` con il nuovo indirizzo (per Google).
6. Controlla in anteprima (vedi sotto) e poi si committa.

> I passi 1–2, 4–5 li fa Claude in automatico: a te basta dare testo, foto, titolo e data.

## Vedere l'anteprima in locale
Dalla cartella del sito:
```
python3 -m http.server 8000
```
poi apri **http://localhost:8000/blog.html**

## Foto
Le foto del sito stanno sulla CDN di Shopify
(`https://cdn.shopify.com/s/files/1/0562/4512/5328/files/…`). Per i racconti puoi usare
foto già lì o caricarne di nuove. Nell'esempio le immagini sono **segnaposto**: vanno
sostituite con le foto vere delle passeggiate di Paola.

## Note tecniche
- Sito **statico** (no programmi dietro): un racconto = una pagina `.html`. Niente CMS.
- Menu e footer del blog sono **uguali** a tutte le altre pagine (voce "Blog").
- SEO curata come il resto del sito (titolo, descrizione, anteprima social, dati
  strutturati tipo articolo con autore *Paola* e data).
