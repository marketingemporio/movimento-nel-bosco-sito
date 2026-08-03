// Palinsesto: interruttore fra "Panoramica settimana" e "Giorno per giorno",
// e dentro la vista giornaliera un giorno alla volta (default = oggi).
document.addEventListener('DOMContentLoaded', function () {
  // ---------- Interruttore vista settimana / giorno ----------
  var viewBtns = document.querySelectorAll('.view-btn');
  var viewPanels = document.querySelectorAll('.view-panel');
  if (viewBtns.length && viewPanels.length) {
    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.dataset.view;
        viewBtns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        viewPanels.forEach(function (p) {
          var active = p.dataset.viewPanel === view;
          p.classList.toggle('is-active', active);
          p.hidden = !active;
        });
      });
    });
  }

  // ---------- Vista giornaliera ----------
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
