/* Abertura Essenes: abertura nos acessos diretos à home, sem cookies. */
(() => {
  'use strict';
  const intro = document.getElementById('essenes-intro');
  if (!intro) return;
  const root = document.documentElement;
  const button = intro.querySelector('button');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (location.hash || preference.matches) {
    root.classList.add('es-intro-arrived');
    return;
  }
  let holdTimer, exitTimer, safetyTimer;
  let finished = true, closing = false, pendingStart = false;

  const clearTimers = () => {
    clearTimeout(holdTimer); clearTimeout(exitTimer); clearTimeout(safetyTimer);
  };
  const finish = (restore = true) => {
    if (finished) return;
    finished = true;
    clearTimers();
    const moveFocus = restore && intro.contains(document.activeElement);
    intro.hidden = true;
    root.classList.remove('es-intro-open', 'es-intro-leaving');
    root.classList.add('es-intro-arrived');
    document.removeEventListener('keydown', onKey);
    if (moveFocus) {
      let content = document.getElementById('conteudo');
      if (location.hash.length > 1) {
        try { content = document.getElementById(decodeURIComponent(location.hash.slice(1))) || content; } catch (_) {}
      }
      if (content) {
        const hadTabindex = content.hasAttribute('tabindex');
        if (!hadTabindex) content.setAttribute('tabindex', '-1');
        content.focus({preventScroll: true});
        if (!hadTabindex) content.addEventListener('blur', () => content.removeAttribute('tabindex'), {once:true});
      }
    }
  };
  const close = () => {
    if (closing || finished) return;
    closing = true;
    if (preference.matches) { finish(); return; }
    root.classList.add('es-intro-leaving', 'es-intro-arrived');
    exitTimer = setTimeout(finish, 360);
  };
  const onKey = event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key === 'Tab') {
      const controls=[...intro.querySelectorAll('button,a[href]')];
      const position=controls.indexOf(document.activeElement);
      const next=event.shiftKey?(position<=0?controls.length-1:position-1):(position+1)%controls.length;
      event.preventDefault();controls[next].focus({preventScroll:true});
    }
  };
  const start = () => {
    if (document.hidden) { pendingStart = true; return; }
    pendingStart = false;
    clearTimers();
    intro.hidden = true;
    root.classList.remove('es-intro-open', 'es-intro-leaving', 'es-intro-arrived');
    intro.classList.toggle('es-intro-static', preference.matches);
    // Recalcula a tela oculta para reiniciar as letras ao voltar pelo navegador.
    void intro.offsetWidth;
    finished = false; closing = false;
    safetyTimer = setTimeout(finish, 2700);
    holdTimer = setTimeout(close, preference.matches ? 900 : 1850);
    root.classList.add('es-intro-open');
    intro.hidden = false;
    intro.focus({preventScroll:true});
    document.addEventListener('keydown', onKey);
  };
  button.addEventListener('click', close);
  window.addEventListener('pageshow', event => { if (event.persisted && !location.hash && !preference.matches) start(); });
  window.addEventListener('pagehide', () => { pendingStart = false; finish(false); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !finished) { pendingStart = true; finish(false); }
    else if (!document.hidden && pendingStart) start();
  });
  const onPreference = () => {
    intro.classList.toggle('es-intro-static', preference.matches);
    if (preference.matches && !finished) finish();
  };
  if (preference.addEventListener) preference.addEventListener('change', onPreference);
  else preference.addListener(onPreference);
  start();
})();
