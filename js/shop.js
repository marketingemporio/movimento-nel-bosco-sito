/* Movimento nel Bosco — catalogo abbonamenti + checkout
   Tutti i prezzi vivono QUI (un solo posto). Le card e il checkout li leggono da qui. */

const PRODOTTI = [
  { id: 'yoga-1',        disc: 'yoga',        tag: 'Yoga',          titolo: '1 lezione',        prezzo: 17,  nota: 'da usare entro 1 mese' },
  { id: 'yoga-4',        disc: 'yoga',        tag: 'Yoga',          titolo: '4 lezioni',        prezzo: 64,  nota: 'da usare entro 1 mese' },
  { id: 'yoga-12',       disc: 'yoga',        tag: 'Yoga',          titolo: '12 lezioni',       prezzo: 167, nota: 'da usare entro 3 mesi' },
  { id: 'yoga-privata',  disc: 'yoga',        tag: 'Yoga',          titolo: 'Lezione privata',  prezzo: 45,  nota: '1:1 con l’insegnante' },
  { id: 'pilates-1',     disc: 'pilates',     tag: 'Pilates',       titolo: '1 lezione',        prezzo: 17,  nota: 'da usare entro 1 mese' },
  { id: 'pilates-4',     disc: 'pilates',     tag: 'Pilates',       titolo: '4 lezioni',        prezzo: 64,  nota: 'da usare entro 1 mese' },
  { id: 'pilates-12',    disc: 'pilates',     tag: 'Pilates',       titolo: '12 lezioni',       prezzo: 167, nota: 'da usare entro 3 mesi' },
  { id: 'medit-percorso',disc: 'meditazione', tag: 'Meditazione',   titolo: 'Percorso completo',prezzo: 120, nota: '7 pratiche settimanali' },
  { id: 'medit-singola', disc: 'meditazione', tag: 'Meditazione',   titolo: 'Pratica singola',  prezzo: 20,  nota: 'una meditazione' },
  { id: 'grav-1',        disc: 'gravidanza',  tag: 'Gravidanza',    titolo: '1 lezione',        prezzo: 17,  nota: '' },
  { id: 'grav-4',        disc: 'gravidanza',  tag: 'Gravidanza',    titolo: '4 lezioni',        prezzo: 64,  nota: '' },
  { id: 'grav-8',        disc: 'gravidanza',  tag: 'Gravidanza',    titolo: '8 lezioni',        prezzo: 124, nota: '' },
  { id: 'grav-12',       disc: 'gravidanza',  tag: 'Gravidanza',    titolo: '12 lezioni',       prezzo: 167, nota: '' },
  { id: 'mb-1',          disc: 'mamma',       tag: 'Mamma e Bimbo', titolo: '1 lezione',        prezzo: 17,  nota: '' },
  { id: 'mb-4',          disc: 'mamma',       tag: 'Mamma e Bimbo', titolo: '4 lezioni',        prezzo: 55,  nota: '' },
  { id: 'mb-12',         disc: 'mamma',       tag: 'Mamma e Bimbo', titolo: '12 lezioni',       prezzo: 167, nota: '' },
  { id: 'open',          disc: 'open',        tag: 'Open',          titolo: 'Tutte le lezioni', prezzo: 275, nota: 'ogni corso incluso — Yoga e Pilates' }
];

// Ordine e titoli delle discipline (l'Open resta per ultimo)
const DISC_ORDER = ['yoga', 'pilates', 'gravidanza', 'mamma', 'open'];
const DISC_LABEL = { yoga: 'Yoga', pilates: 'Pilates', meditazione: 'Meditazione', gravidanza: 'Yoga Gravidanza', mamma: 'Yoga Mamma e Bimbo', open: 'Open' };
const DISC_TITLE = { yoga: 'Abbonamento Yoga', pilates: 'Abbonamento Pilates', meditazione: 'Meditazione e Chakra', gravidanza: 'Yoga Gravidanza', mamma: 'Yoga Mamma e Bimbo', open: 'Abbonamento Open' };

function trovaProdotto(id) {
  return PRODOTTI.find(function (p) { return p.id === id; });
}
function variantiDi(disc) {
  return PRODOTTI.filter(function (p) { return p.disc === disc; });
}

/* Numero di lezioni ricavato dal titolo ("4 lezioni" -> 4); null se non applicabile. */
function numeroLezioni(p) {
  var m = /^(\d+)\s+lezion/i.exec(p.titolo);
  return m ? parseInt(m[1], 10) : null;
}
/* Prezzo a lezione (solo per i pacchetti da 4 o più lezioni). */
function perLezione(p) {
  var n = numeroLezioni(p);
  if (!n || n < 4) return null;
  return p.prezzo / n;
}
function formattaEuro(v) {
  return (Math.round(v * 100) / 100).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* Nel catalogo mostriamo solo le opzioni essenziali: 1 lezione e pacchetto da 12.
   Gli altri tagli (4, 8, privata) restano vendibili via link diretto, ma non in vetrina. */
function inCatalogo(v) {
  var n = numeroLezioni(v);
  return n === 1 || n === 12;
}
var CATALOG_DISC = ['yoga', 'pilates', 'gravidanza', 'mamma'];

/* ---- Catalogo (abbonamenti.html): per ogni disciplina, i pacchetti essenziali affiancati ---- */
function initCatalogo(grid) {
  grid.innerHTML = CATALOG_DISC.map(function (disc) {
    var vs = variantiDi(disc).filter(inCatalogo);
    if (!vs.length) return '';

    // Miglior prezzo a lezione della disciplina (per il badge "più conveniente")
    var minPer = null;
    vs.forEach(function (v) { var pl = perLezione(v); if (pl != null && (minPer == null || pl < minPer)) minPer = pl; });

    var cards = vs.map(function (v) {
      var pl = perLezione(v);
      var best = pl != null && pl === minPer && vs.length > 1;
      return '<article class="pkg' + (best ? ' pkg--best' : '') + '">' +
               (best ? '<span class="pkg-badge">Più conveniente</span>' : '') +
               '<h4>' + v.titolo + '</h4>' +
               '<div class="pkg-price"><span>' + v.prezzo + '</span>€</div>' +
               (pl != null ? '<p class="pkg-per">' + formattaEuro(pl) + '&nbsp;€ a lezione</p>' : '') +
               (v.nota ? '<p class="pkg-note">' + v.nota + '</p>' : '') +
               '<a class="btn btn-primary" href="checkout.html?p=' + v.id + '">Scegli</a>' +
             '</article>';
    }).join('');

    var openCls = disc === 'open' ? ' pkg-group--open' : '';
    var soloUno = vs.length === 1 ? ' pkg-cards--single' : '';
    return '<div class="pkg-group' + openCls + '" data-disc="' + disc + '">' +
             '<h3 class="pkg-group__title">' + DISC_TITLE[disc] + '</h3>' +
             '<div class="pkg-cards' + soloUno + '">' + cards + '</div>' +
           '</div>';
  }).join('');

  // Filtri = selettore disciplina + Open. La fascia Open resta sempre visibile
  // sotto i pacchetti (è l'alternativa "tutto incluso"); il chip Open mostra solo lei.
  var chips = document.querySelectorAll('.shop-filters .chip');
  function mostra(f) {
    grid.querySelectorAll('.pkg-group').forEach(function (g) {
      g.style.display = (g.dataset.disc === f) ? '' : 'none';
    });
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      mostra(chip.dataset.f);
    });
  });
  if (chips.length) {
    chips.forEach(function (c) { c.classList.remove('is-active'); });
    chips[0].classList.add('is-active');
    mostra(chips[0].dataset.f);
  }
}

/* ---- Fascia Open (abbonamenti.html): l'alternativa "tutto incluso", sempre visibile ---- */
function initOpen(box) {
  var p = trovaProdotto('open');
  if (!p) return;
  box.innerHTML =
    '<div class="open-band__text">' +
      '<span class="tag">Open</span>' +
      '<h3>Vuoi accedere a tutto?</h3>' +
      '<p>Un solo abbonamento per tutte le lezioni della settimana: Yoga e Pilates, ogni corso incluso. Vale 3 mesi dall’attivazione.</p>' +
    '</div>' +
    '<div class="open-band__buy">' +
      '<div class="pkg-price"><span>' + p.prezzo + '</span>€</div>' +
      '<p class="pkg-note">valido 3 mesi</p>' +
      '<a class="btn btn-cta" href="checkout.html?p=' + p.id + '">Scegli l’Open</a>' +
    '</div>';
}

/* ---- Checkout (checkout.html) ---- */
function initCheckout() {
  var id = new URLSearchParams(location.search).get('p');
  var p = id ? trovaProdotto(id) : null;
  var box = document.getElementById('ck-summary');
  var form = document.getElementById('ck-form');
  if (!box) return;

  if (!p) {
    box.innerHTML = '<p>Nessun abbonamento selezionato. Torna al <a href="abbonamenti.html">catalogo</a> e scegline uno.</p>';
    if (form) form.style.display = 'none';
    return;
  }

  box.innerHTML =
    '<div class="ck-line"><span>' + p.tag + ' · ' + p.titolo + '</span><strong>' + p.prezzo + '€</strong></div>' +
    (p.nota ? '<p class="shop-note">' + p.nota + '</p>' : '');

  var setVal = function (name, value) {
    var el = form && form.querySelector('[name="' + name + '"]');
    if (el) el.value = value;
  };
  setVal('abbonamento', p.tag + ' · ' + p.titolo);
  setVal('prezzo', p.prezzo + '€');
}

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('shop-grid');
  if (grid) initCatalogo(grid);
  var openBox = document.getElementById('open-box');
  if (openBox) initOpen(openBox);
  if (document.getElementById('ck-summary')) initCheckout();
});
