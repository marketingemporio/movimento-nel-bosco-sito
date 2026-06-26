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
  { id: 'open',          disc: 'open',        tag: 'Open',          titolo: 'Tutte le lezioni', prezzo: 275, nota: 'ogni corso incluso — Yoga, Pilates, Meditazione e oltre' }
];

function trovaProdotto(id) {
  return PRODOTTI.find(function (p) { return p.id === id; });
}

/* ---- Catalogo (abbonamenti.html) ---- */
function initCatalogo(grid) {
  grid.innerHTML = PRODOTTI.map(function (p) {
    var open = p.disc === 'open' ? ' shop-card--open' : '';
    return '<article class="shop-card' + open + '" data-disc="' + p.disc + '">' +
             '<span class="tag">' + p.tag + '</span>' +
             '<h3>' + p.titolo + '</h3>' +
             (p.nota ? '<p class="shop-note">' + p.nota + '</p>' : '<p class="shop-note">&nbsp;</p>') +
             '<div class="shop-price">' + p.prezzo + '€</div>' +
             '<a class="btn btn-primary btn-sm" href="checkout.html?p=' + p.id + '">Acquista</a>' +
           '</article>';
  }).join('');

  var chips = document.querySelectorAll('.shop-filters .chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var f = chip.dataset.f;
      grid.querySelectorAll('.shop-card').forEach(function (card) {
        card.style.display = (f === 'all' || card.dataset.disc === f) ? '' : 'none';
      });
    });
  });
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
  if (document.getElementById('ck-summary')) initCheckout();
});
