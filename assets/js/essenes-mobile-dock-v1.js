/* Menu inferior Essenes v1 — cinco atalhos, sem biblioteca externa. */
(() => {
 'use strict';
 if(document.querySelector('.essenes-mobile-dock'))return;
 const currentPath=window.location.pathname;
 const path=currentPath.length>1&&currentPath.endsWith('/')?currentPath.slice(0,-1):currentPath;
 const isHome=path==='/'||path==='/index.html';
 const message='Olá, Alexandre! Conheci o Essenes e gostaria de saber mais sobre as sessões individuais.';
 const whatsapp='https://wa.me/5561981738997?text='+encodeURIComponent(message);
 const icons={
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  session:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15h8M8 18h5"/>',
  wheel:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
  about:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  contact:'<path d="M20.8 11.4a8.7 8.7 0 0 1-8.7 8.7 9 9 0 0 1-3.5-.7L3 21l1.7-5.6A8.7 8.7 0 1 1 20.8 11.4Z"/><path d="M8 11.5h8"/>'
 };
 const items=[
  {id:'home',label:'Início',href:'/',icon:'home'},
  {id:'session',label:'Sessões',href:'/#sessao',icon:'session'},
  {id:'wheel',label:'Minha Roda',href:'/roda-da-vida.html',icon:'wheel'},
  {id:'about',label:'Sobre',href:'/#alexandre',icon:'about'},
  {id:'contact',label:'Conversar',href:whatsapp,icon:'contact',external:true}
 ];
 const nav=document.createElement('nav');
 nav.className='essenes-mobile-dock';
 nav.setAttribute('aria-label','Navegação principal no celular');
 nav.innerHTML=items.map(item=>{
  const extra=item.external?' target="_blank" rel="noopener noreferrer" aria-label="Conversar com Alexandre pelo WhatsApp (abre em outra aba)"':'';
  const className='essenes-mobile-dock__link'+(item.external?' essenes-mobile-dock__link--contact':'');
  return '<a class="'+className+'" data-essenes-dock="'+item.id+'" href="'+item.href.replace(/&/g,'&amp;')+'"'+extra+'><span class="essenes-mobile-dock__icon" aria-hidden="true"><svg viewBox="0 0 24 24">'+icons[item.icon]+'</svg></span><span class="essenes-mobile-dock__label">'+item.label+'</span></a>';
 }).join('');
 document.body.appendChild(nav);
 document.body.classList.add('essenes-has-mobile-dock');
 if(path==='/sistema-familiar.html')document.body.classList.add('essenes-family-page');
 const links=Array.from(nav.querySelectorAll('[data-essenes-dock]'));
 const visible=id=>{
  const el=document.getElementById(id);if(!el)return false;
  const rect=el.getBoundingClientRect();
  return rect.top<=window.innerHeight*.4&&rect.bottom>=window.innerHeight*.28;
 };
 const update=()=>{
  let active='';
  if(isHome)active=visible('alexandre')?'about':visible('sessao')?'session':'home';
  else if(path==='/roda-da-vida.html')active='wheel';
  else if(path==='/contato.html')active='contact';
  links.forEach(link=>{
   if(link.dataset.essenesDock===active)link.setAttribute('aria-current',active==='session'||active==='about'?'location':'page');
   else link.removeAttribute('aria-current');
  });
 };
 let scheduled=false;
 const schedule=()=>{
  if(scheduled)return;scheduled=true;
  window.requestAnimationFrame(()=>{scheduled=false;update();});
 };
 update();
 if(isHome){
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('hashchange',schedule);
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('load',schedule,{once:true});
 }
 const editable='input,textarea,select,[contenteditable="true"]';
 document.addEventListener('focusin',event=>{
  if(event.target instanceof Element&&event.target.closest(editable))document.body.classList.add('essenes-dock-input-active');
 });
 document.addEventListener('focusout',()=>{
  window.requestAnimationFrame(()=>{
   if(!(document.activeElement instanceof Element)||!document.activeElement.closest(editable))document.body.classList.remove('essenes-dock-input-active');
  });
 });
 nav.addEventListener('click',event=>{
  const link=event.target.closest('[data-essenes-dock]');if(!link)return;
  if(Array.isArray(window.dataLayer))window.dataLayer.push({event:'essenes_mobile_navigation_click',navigation_item:link.dataset.essenesDock,page_path:window.location.pathname});
  if(isHome)schedule();
 });
})();
