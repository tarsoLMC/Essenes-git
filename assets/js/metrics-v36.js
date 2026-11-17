/* Contagens agregadas próprias. Nunca envia URL, nome, mensagem ou notas. */
(() => {
 'use strict';
 const body=document.body;
 if(!body||location.protocol!=='https:')return;
 const path=location.pathname;
 const send=event=>{
  const payload=JSON.stringify({event});
  if(navigator.sendBeacon&&navigator.sendBeacon('/metricas-evento.php',new Blob([payload],{type:'text/plain'})))return;
  if(window.fetch)fetch('/metricas-evento.php',{method:'POST',body:payload,headers:{'Content-Type':'text/plain'},keepalive:true,credentials:'omit',referrerPolicy:'no-referrer'}).catch(()=>{});
 };
 const view=()=>{send('page_view');if(path==='/'||path.endsWith('/index.html'))send('home_view');if(path.endsWith('/contato.html'))send('contact_view');};
 if(document.hidden){const visible=()=>{if(!document.hidden){document.removeEventListener('visibilitychange',visible);view();}};document.addEventListener('visibilitychange',visible);}else view();
 window.addEventListener('pageshow',event=>{if(event.persisted)view();});
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link)return;
  try{const url=new URL(link.href,location.href);if(url.hostname==='wa.me'&&url.pathname==='/5561981738997')send('whatsapp_click');}catch(_){}
 },{capture:true});
 const form=document.querySelector('[data-contact-form]');
 if(form){let sent=false;form.addEventListener('input',()=>{if(!sent){sent=true;send('contact_customized');}});}
})();
