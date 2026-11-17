/* Essenes V32 — navegação e movimento discreto, sem esconder a leitura. */
(() => {
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const listen=(query,fn)=>query.addEventListener?query.addEventListener('change',fn):query.addListener(fn);
 document.querySelectorAll('.js-whatsapp').forEach(link=>{
  link.href='https://wa.me/5561981738997?text='+encodeURIComponent(link.dataset.message||'Olá! Gostaria de saber mais sobre o atendimento do Essenes.');
  link.target='_blank';link.rel='noopener noreferrer';
 });
 document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
 const menu=document.querySelector('.mobile-menu'),toggle=document.querySelector('.menu-toggle');
 if(menu&&toggle){
  const setOpen=(open,restore=false)=>{
   menu.classList.toggle('open',open);menu.hidden=!open;
   if('inert' in menu)menu.inert=!open;
   toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
   if(restore)toggle.focus();
  };
  setOpen(false);
  toggle.addEventListener('click',()=>setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){e.preventDefault();setOpen(false,true);}});
  document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('.site-header'))setOpen(false);});
  const desktop=window.matchMedia('(min-width:1001px)');listen(desktop,e=>{if(e.matches)setOpen(false);});
 }
 const header=document.querySelector('.site-header');
 if(header){
  const marker=document.createElement('div');marker.setAttribute('aria-hidden','true');marker.style.height='1px';marker.style.marginBottom='-1px';header.before(marker);
  if('IntersectionObserver' in window){new IntersectionObserver(([entry])=>header.classList.toggle('is-scrolled',!entry.isIntersecting)).observe(marker);}
 }
 if(!reduced.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('entered');if(entry.target.matches('.btn-primary'))entry.target.classList.add('v33-glow');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.hero-copy,.hero-visual,.wheel-invite-inner,.section-intro,.session-copy,.session-visual,.about-photo,.about-copy,.systemic-copy,.principles-head,.pattern-head,.after-copy,.faq-intro,.final-copy,.article-hero-copy,.recognition-card,.principle-card,.content-card,.hub-card,.related-card,.btn-primary').forEach(el=>observer.observe(el));
  document.querySelectorAll('.recognition-grid,.content-cards,.principles-grid').forEach(group=>[...group.children].forEach((el,i)=>el.style.setProperty('--enter-delay',Math.min(i*55,165)+'ms')));
  listen(reduced,e=>{if(e.matches){observer.disconnect();document.querySelectorAll('.entered').forEach(el=>el.classList.remove('entered'));}});
 }
 const nav=document.querySelector('.desktop-nav');
 if(nav&&document.querySelector('.hero')&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   nav.querySelectorAll('a').forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }),{rootMargin:'-18% 0px -65% 0px'});
  ['reconhecer','sessao','alexandre','duvidas'].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el);});
 }
})();

/* V33 — sliders manuais, orientação na página e atalhos para telas de toque. */
(() => {
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const phone=window.matchMedia('(max-width:760px)');
 const onMedia=(q,fn)=>q.addEventListener?q.addEventListener('change',fn):q.addListener(fn);
 document.querySelectorAll('[data-slider]').forEach(root=>{
  const track=root.querySelector('[data-slider-track]'),controls=root.querySelector('.v33-slider-controls');
  const cards=[...track.children],prev=root.querySelector('[data-slide-prev]'),next=root.querySelector('[data-slide-next]'),count=root.querySelector('[data-slide-index]');
  root.querySelector('[data-slide-total]').textContent=String(cards.length);
  let active=0,queued=false;
  const nearest=()=>{const left=track.getBoundingClientRect().left;let closest=0,distance=Infinity;cards.forEach((card,i)=>{const d=Math.abs(card.getBoundingClientRect().left-left);if(d<distance){distance=d;closest=i;}});return closest;};
  const update=()=>{
   queued=false;const scrollable=phone.matches&&track.scrollWidth>track.clientWidth+5;
   controls.hidden=!scrollable;track.tabIndex=scrollable?0:-1;
   if(scrollable){track.setAttribute('role','region');track.setAttribute('aria-label',root.getAttribute('aria-label'));}
   else{track.removeAttribute('role');track.removeAttribute('aria-label');}
   const end=track.scrollLeft>=track.scrollWidth-track.clientWidth-3;
   active=scrollable?(end?cards.length-1:nearest()):0;
   count.textContent=String(active+1);prev.disabled=!scrollable||track.scrollLeft<3;next.disabled=!scrollable||end;
   cards.forEach((card,i)=>card.classList.toggle('is-current',scrollable&&i===active));
  };
  const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
  const move=index=>{
   const card=cards[Math.max(0,Math.min(cards.length-1,index))];
   const left=card.getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft;
   track.scrollTo({left:Math.max(0,Math.min(left,track.scrollWidth-track.clientWidth)),behavior:reduced.matches?'instant':'smooth'});
  };
  prev.addEventListener('click',()=>move(active-1));next.addEventListener('click',()=>move(active+1));
  track.addEventListener('keydown',e=>{
   if(!phone.matches)return;
   if(e.key==='ArrowRight'){e.preventDefault();move(active+1);}
   if(e.key==='ArrowLeft'){e.preventDefault();move(active-1);}
   if(e.key==='Home'){e.preventDefault();move(0);}
   if(e.key==='End'){e.preventDefault();move(cards.length-1);}
  });
  track.addEventListener('scroll',schedule,{passive:true});
  if('ResizeObserver'in window)new ResizeObserver(schedule).observe(track);else window.addEventListener('resize',schedule,{passive:true});
  onMedia(phone,schedule);update();
 });
 document.querySelectorAll('.faq-list').forEach((group,index)=>{
  const items=[...group.querySelectorAll('details')];
  items.forEach(item=>{
   item.name='essenes-faq-'+index;
   item.addEventListener('toggle',()=>{if(item.open)items.forEach(other=>{if(other!==item)other.open=false;});});
  });
 });
 const progress=document.createElement('div');progress.className='v33-page-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 const top=document.createElement('button');top.type='button';top.className='v33-back-top';top.textContent='↑';top.setAttribute('aria-label','Voltar ao início da página');top.tabIndex=-1;document.body.append(top);
 top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}));
 let maxScroll=1,paintQueued=false;
 const paint=()=>{paintQueued=false;progress.style.transform='scaleX('+Math.max(0,Math.min(1,window.scrollY/maxScroll))+')';const visible=window.scrollY>700;top.classList.toggle('is-visible',visible);top.tabIndex=visible?0:-1;};
 const schedule=()=>{if(!paintQueued){paintQueued=true;requestAnimationFrame(paint);}};
 const measure=()=>{maxScroll=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);schedule();};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure,{passive:true});
 if('ResizeObserver'in window)new ResizeObserver(measure).observe(document.body);
 window.addEventListener('pageshow',measure);measure();
 const actions=document.querySelector('[data-mobile-actions]');
 const opening=document.querySelector('.hero,.article-hero,.hub-hero'),footer=document.querySelector('.site-footer'),toggle=document.querySelector('.menu-toggle');
 if(actions&&opening&&'IntersectionObserver'in window){
  let passed=false,atFooter=false;
  actions.hidden=false;document.body.classList.add('has-mobile-actions');
  const update=()=>{
   const show=phone.matches&&passed&&!atFooter&&toggle?.getAttribute('aria-expanded')!=='true';
   actions.classList.toggle('is-visible',show);actions.setAttribute('aria-hidden',String(!show));
   if('inert'in actions)actions.inert=!show;
   document.body.classList.toggle('mobile-actions-visible',show);
  };
  new IntersectionObserver(([entry])=>{passed=!entry.isIntersecting&&entry.boundingClientRect.bottom<90;update();},{rootMargin:'-85px 0px 0px 0px'}).observe(opening);
  if(footer)new IntersectionObserver(([entry])=>{atFooter=entry.isIntersecting;update();}).observe(footer);
  if(toggle)new MutationObserver(update).observe(toggle,{attributes:true,attributeFilter:['aria-expanded']});
  onMedia(phone,update);update();
 }
})();
