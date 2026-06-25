// Menu di navigazione mobile (hamburger). Compare sotto i 920px.
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (!header || !toggle) return;

  function setOpen(open) {
    header.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('open'));
  });

  // chiude il menu quando si clicca una voce
  header.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // chiude con il tasto Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
});
