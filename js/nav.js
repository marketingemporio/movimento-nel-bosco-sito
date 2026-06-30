// Menu di navigazione: hamburger (mobile) + tendine "Corsi" / "Yoga" (dropdown).
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var toggle = header.querySelector('.nav-toggle');

  // ---------- Tendine (dropdown) ----------
  // Il bottone-freccetta di un livello sta dentro <span class="dropdown-parent"> nel suo <li>.
  function parentToggleBtn(li) {
    return li.querySelector(':scope > .dropdown-parent > .nav-dropdown-toggle');
  }

  function closeDropdown(li) {
    li.classList.remove('open');
    var btn = parentToggleBtn(li);
    if (btn) btn.setAttribute('aria-expanded', 'false');
    // chiude anche eventuali sotto-tendine al suo interno
    li.querySelectorAll('.has-dropdown.open').forEach(function (sub) {
      sub.classList.remove('open');
      var sbtn = parentToggleBtn(sub);
      if (sbtn) sbtn.setAttribute('aria-expanded', 'false');
    });
  }

  function closeAllDropdowns() {
    header.querySelectorAll('.has-dropdown.open').forEach(function (li) {
      li.classList.remove('open');
      var btn = parentToggleBtn(li);
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  header.querySelectorAll('.nav-dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var li = btn.closest('.has-dropdown');
      if (!li) return;
      var willOpen = !li.classList.contains('open');
      // chiude le tendine "sorelle" allo stesso livello
      li.parentElement.querySelectorAll(':scope > .has-dropdown.open').forEach(function (sib) {
        if (sib !== li) closeDropdown(sib);
      });
      li.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  // clic fuori dal menu: chiude tutte le tendine
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) closeAllDropdowns();
  });

  // ---------- Hamburger (mobile) ----------
  function setOpen(open) {
    header.classList.toggle('open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    }
    if (!open) closeAllDropdowns();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('open'));
    });
  }

  // chiude il menu quando si clicca una voce con link reale
  header.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // chiude tutto con il tasto Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
});
