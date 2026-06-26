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

// Ordine e titoli delle discipline (l'Open resta per ultimo)
const DISC_ORDER = ['yoga', 'pilates', 'meditazione', 'gravidanza', 'mamma', 'open'];
const DISC_LABEL = { yoga: 'Yoga', pilates: 'Pilates', meditazione: 'Meditazione', gravidanza: 'Gravidanza', mamma: 'Mamma e Bimbo', open: 'Open' };
const DISC_TITLE = { yoga: 'Abbonamento Yoga', pilates: 'Abbonamento Pilates', meditazione: 'Meditazione e Chakra', gravidanza: 'Yoga in Gravidanza', mamma: 'Yoga Mamma e Bimbo', open: 'Abbonamento Open' };

function trovaProdotto(id) {
  return PRODOTTI.find(function (p) { return p.id === id; });
}
function variantiDi(disc) {
  return PRODOTTI.filter(function (p) { return p.disc === disc; });
}

/* ---- Catalogo (abbonamenti.html): una card per disciplina + selettore pacchetto ---- */
function initCatalogo(grid) {
  grid.innerHTML = DISC_ORDER.map(function (disc) {
    var vs = variantiDi(disc);
    if (!vs.length) return '';
    var first = vs[0];
    var open = disc === 'open' ? ' shop-card--open' : '';

    var picker;
    if (vs.length > 1) {
      var options = vs.map(function (v) {
        return '<option value="' + v.id + '" data-prezzo="' + v.prezzo + '" data-nota="' + (v.nota || '') + '">' + v.titolo + ' — ' + v.prezzo + '€</option>';
      }).join('');
      picker = '<label class="variant-pick">Scegli il pacchetto<select class="variant-select">' + options + '</select></label>';
    } else {
      picker = '<p class="variant-single">' + first.titolo + '</p>';
    }

    return '<article class="shop-card shop-card--disc' + open + '" data-disc="' + disc + '">' +
             '<span class="tag">' + DISC_LABEL[disc] + '</span>' +
             '<h3>' + DISC_TITLE[disc] + '</h3>' +
             picker +
             '<div class="shop-price"><span class="vp-num">' + first.prezzo + '</span>€</div>' +
             '<p class="shop-note vp-nota">' + (first.nota || '&nbsp;') + '</p>' +
             '<a class="btn btn-primary vp-buy" href="checkout.html?p=' + first.id + '">Acquista</a>' +
           '</article>';
  }).join('');

  // Aggiorna prezzo / nota / link "Acquista" al cambio di pacchetto
  grid.querySelectorAll('.shop-card--disc').forEach(function (card) {
    var sel = card.querySelector('.variant-select');
    if (!sel) return;
    sel.addEventListener('change', function () {
      var opt = sel.options[sel.selectedIndex];
      card.querySelector('.vp-num').textContent = opt.dataset.prezzo;
      card.querySelector('.vp-nota').innerHTML = opt.dataset.nota || '&nbsp;';
      card.querySelector('.vp-buy').setAttribute('href', 'checkout.html?p=' + opt.value);
    });
  });

  // Filtri = selettore disciplina (niente "Tutti"): si vede una disciplina alla volta
  var chips = document.querySelectorAll('.shop-filters .chip');
  function mostra(f) {
    grid.querySelectorAll('.shop-card--disc').forEach(function (card) {
      card.style.display = (card.dataset.disc === f) ? '' : 'none';
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
