/* Atalhos fixos nas páginas do Essenes. */
(() => {
  'use strict';

  const path = location.pathname;
  const isHome = path === '/' || path === '/index.html';
  const items = [
    ['home', 'Início', '/', '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'],
    ['session', 'Sessões', '/constelacao-familiar-online.html', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15h8M8 18h5"/>'],
    ['tools', 'Ferramentas', '/ferramentas.html', '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'],
    ['guides', 'Guias', '/conteudos.html', '<path d="M12 5v16M3 4h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3z"/>'],
    ['contact', 'Contato', '/contato.html', '<path d="M20.8 11.4a8.7 8.7 0 0 1-8.7 8.7 9 9 0 0 1-3.5-.7L3 21l1.7-5.6A8.7 8.7 0 1 1 20.8 11.4Z"/><path d="M8 11.5h8"/>'],
  ];
  const tools = ['/roda-da-vida.html', '/sistema-familiar.html'];
  const isGuide = document.querySelector('.article-main') && path !== '/constelacao-familiar-online.html';
  const nav = document.createElement('nav');
  nav.className = 'essenes-mobile-dock';
  nav.setAttribute('aria-label', 'Atalhos do Essenes');
  nav.innerHTML = items.map(([id, label, href, icon]) => {
    const current = isHome && id === 'home' || path === href;
    const inSection = id === 'tools' && tools.includes(path) || id === 'guides' && isGuide;
    const state = current ? ' aria-current="page"' : inSection ? ' aria-current="true"' : '';
    const accent = id === 'contact' ? ' essenes-mobile-dock__link--contact' : '';
    return '<a class="essenes-mobile-dock__link' + accent + '" href="' + href + '" data-essenes-dock="' + id + '"' + state + '>' +
      '<span class="essenes-mobile-dock__icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + icon + '</svg></span>' +
      '<span class="essenes-mobile-dock__label">' + label + '</span></a>';
  }).join('');
  document.body.append(nav);
  document.body.classList.add('essenes-has-mobile-dock');

  const editable = 'textarea,[contenteditable="true"],input:is([type="text"],[type="number"],[type="email"],[type="tel"],[type="search"],[type="url"],:not([type]))';
  const syncInputFocus = () => {
    document.body.classList.toggle('essenes-dock-input-active', Boolean(document.activeElement?.closest(editable)));
  };
  document.addEventListener('focusin', syncInputFocus);
  document.addEventListener('focusout', () => requestAnimationFrame(syncInputFocus));

  nav.addEventListener('click', event => {
    const link = event.target.closest('[data-essenes-dock]');
    if (link && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'essenes_mobile_navigation_click',
        navigation_item: link.dataset.essenesDock,
        page_path: path,
      });
    }
  });
})();
