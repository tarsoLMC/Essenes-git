/* Efeitos compartilhados, próprios e opcionais. Nenhuma coleta de dados. */
(() => {
 'use strict';
 const theme=document.body.dataset.fxTheme;
 const profiles={
  essenes:{surfaces:'.recognition-card,.content-card,.hub-card,.related-card,.overview-help',media:'.hero-visual',orbit:'.wheel-invite .btn',reveal:'',tap:'.btn,.recognition-card,.content-card'},
  saluvia:{surfaces:'.v24-customer-card,.v24-solution-card,.product-card,.v18-panel',media:'.v24-method-visual',orbit:'.v24-hero-actions .btn-gold',reveal:'.catalog-toolbar,.section-head,.contact-form-box,.v18-quote-form-panel',tap:'.btn,.v24-solution-card,.product-card-img'}
 };
 const profile=profiles[theme];
 if(!profile)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
 const onChange=(q,fn)=>q.addEventListener?q.addEventListener('change',fn):q.addListener(fn);
 const query=(selectors)=>selectors?[...document.querySelectorAll(selectors)]:[];
 document.querySelector('.site-header')?.classList.add('fx-header');
 query(profile.tap).forEach(el=>el.classList.add('fx-tap'));
 const surfaces=query(profile.surfaces);
 const media=query(profile.media);
 surfaces.forEach(el=>{
  el.classList.add('fx-surface');
  const shine=document.createElement('span');shine.className='fx-reflection';shine.setAttribute('aria-hidden','true');el.append(shine);
 });
 media.forEach(el=>el.classList.add('fx-tilt'));
 const targets=[...new Set([...surfaces,...media])];
 let active=null,pending=0,lastX=0,lastY=0;
 const reset=el=>{if(!el)return;el.classList.remove('fx-hover-active');for(const key of ['--fx-x','--fx-y','--fx-rx','--fx-ry'])el.style.removeProperty(key);};
 const clear=()=>{if(pending)cancelAnimationFrame(pending);pending=0;reset(active);active=null;};
 const paint=()=>{
  pending=0;
  if(!active||reduced.matches||!fine.matches||document.hidden)return;
  const box=active.getBoundingClientRect();if(!box.width||!box.height)return;
  const x=Math.max(0,Math.min(1,(lastX-box.left)/box.width)),y=Math.max(0,Math.min(1,(lastY-box.top)/box.height));
  active.style.setProperty('--fx-x',(x*100).toFixed(1)+'%');active.style.setProperty('--fx-y',(y*100).toFixed(1)+'%');
  if(active.classList.contains('fx-tilt')){active.style.setProperty('--fx-rx',((.5-y)*2.4).toFixed(2)+'deg');active.style.setProperty('--fx-ry',((x-.5)*2.4).toFixed(2)+'deg');}
 };
 const enter=event=>{if(reduced.matches||!fine.matches)return;reset(active);active=event.currentTarget;active.classList.add('fx-hover-active');};
 const move=event=>{if(reduced.matches||!fine.matches||event.pointerType==='touch')return;active=event.currentTarget;lastX=event.clientX;lastY=event.clientY;if(!pending)pending=requestAnimationFrame(paint);};
 const leave=event=>{reset(event.currentTarget);if(active===event.currentTarget)clear();};
 let listening=false;
 const bind=()=>{
  const enabled=fine.matches&&!reduced.matches;
  if(enabled===listening)return;
  listening=enabled;
  for(const el of targets){
   const action=enabled?'addEventListener':'removeEventListener';
   el[action]('pointerenter',enter);el[action]('pointermove',move);el[action]('pointerleave',leave);
  }
  if(!enabled)clear();
 };
 onChange(fine,bind);onChange(reduced,bind);bind();
 const orbit=query(profile.orbit).concat(query('[data-fx-orbit]')).filter((el,i,all)=>all.indexOf(el)===i);
 orbit.forEach(el=>{el.classList.add('fx-orbit-host');const ring=document.createElement('span');ring.className='fx-orbit';ring.setAttribute('aria-hidden','true');el.append(ring);});
 if('IntersectionObserver'in window){
  const visible=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('fx-in-viewport',entry.isIntersecting)),{threshold:.15});
  orbit.forEach(el=>visible.observe(el));
 }else orbit.forEach(el=>el.classList.add('fx-in-viewport'));
 const reveals=query(profile.reveal).concat(query('[data-fx-reveal]')).filter((el,i,all)=>all.indexOf(el)===i);
 if(!reduced.matches&&'IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('fx-enter');observer.unobserve(entry.target);}}),{threshold:.1});
  reveals.forEach((el,i)=>{el.style.setProperty('--fx-delay',Math.min(i%3*55,110)+'ms');observer.observe(el);});
  onChange(reduced,()=>{if(reduced.matches){observer.disconnect();reveals.forEach(el=>el.classList.remove('fx-enter'));}});
 }
 const visibility=()=>{document.documentElement.classList.toggle('fx-page-hidden',document.hidden);if(document.hidden)clear();};
 document.addEventListener('visibilitychange',visibility);visibility();
 // Opcional: somente iframes marcados pelo autor recebem seu vídeo perto da tela.
 const videos=query('iframe[data-fx-src]');
 const loadVideo=frame=>{const source=frame.getAttribute('data-fx-src');if(!source)return;try{const url=new URL(source,location.href);if(!['https:','http:'].includes(url.protocol))return;frame.src=url.href;frame.removeAttribute('data-fx-src');}catch{}};
 if(videos.length&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){loadVideo(entry.target);observer.unobserve(entry.target);}}),{rootMargin:'350px 0px'});videos.forEach(frame=>observer.observe(frame));}else videos.forEach(loadVideo);
})();
