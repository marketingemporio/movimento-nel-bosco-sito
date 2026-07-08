// Palinsesto giornaliero: mostra un giorno alla volta, di default quello di oggi.
document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.day-tab');
  var panels = document.querySelectorAll('.day-panel');
  if (!tabs.length || !panels.length) return;

  function showDay(day) {
    tabs.forEach(function (t) {
      var active = t.dataset.day === day;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      var active = p.dataset.dayPanel === day;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { showDay(tab.dataset.day); });
  });

  // Di default apre il giorno di oggi (chiuso la domenica: resta su lunedì).
  var codici = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
  var oggi = codici[new Date().getDay()];
  if (oggi !== 'dom') showDay(oggi);
});
