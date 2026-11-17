/* Composição voluntária de contato. Sem armazenamento nem transmissão automática. */
(() => {
 'use strict';
 const form=document.querySelector('[data-contact-form]');
 if(!form)return;
 const intents={
  valores:{label:'Consultar valores e horários',text:'Olá, Alexandre! Conheci o Essenes e gostaria de consultar o valor e os horários para uma sessão individual online de Constelação Familiar Sistêmica.'},
  duvida:{label:'Tirar uma dúvida sobre a sessão',text:'Olá, Alexandre! Conheci o Essenes e gostaria de entender como funciona a sessão individual online de Constelação Familiar Sistêmica antes de decidir se agendo.'},
  roda:{label:'Conversar sobre a Roda da Vida',text:'Olá, Alexandre! Conheci a Roda da Vida do Essenes e gostaria de conversar sobre o exercício e conhecer o atendimento individual online.'}
 };
 const name=form.querySelector('[name="primeiro_nome"]'),period=form.querySelector('[name="periodo"]');
 const preview=form.querySelector('[data-message-preview]'),link=form.querySelector('[data-contact-link]'),status=form.querySelector('[data-copy-status]');
 const clean=value=>[...value.replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim()].slice(0,60).join('');
 const update=()=>{
  const key=form.querySelector('[name="assunto"]:checked')?.value;
  const intent=intents[key]||intents.valores;
  let text=intent.text;
  const first=clean(name.value);
  if(first)text+='\nMeu nome é '+first+'.';
  if(['manhã','tarde','noite'].includes(period.value))text+='\nTenho preferência pelo período da '+period.value+', conforme disponibilidade.';
  text+='\nPode me orientar sobre o próximo passo?';
  preview.value=text;
  link.href='https://wa.me/5561981738997?text='+encodeURIComponent(text);
  status.textContent='';
 };
 const key=new URL(location.href).searchParams.get('assunto');
 if(Object.prototype.hasOwnProperty.call(intents,key||'')){const radio=form.querySelector('[name="assunto"][value="'+key+'"]');if(radio)radio.checked=true;}
 form.addEventListener('input',update);form.addEventListener('change',update);
 form.addEventListener('submit',event=>{event.preventDefault();update();link.click();});
 form.addEventListener('reset',event=>{
  event.preventDefault();name.value='';period.value='';
  form.querySelectorAll('[name="assunto"]').forEach(radio=>radio.checked=radio.value==='valores');
  update();
 });
 form.querySelector('[data-copy-message]').addEventListener('click',async()=>{
  try{
   if(!navigator.clipboard?.writeText)throw Error('clipboard');
   await navigator.clipboard.writeText(preview.value);status.textContent='Mensagem copiada.';
  }catch(_){preview.focus();preview.select();status.textContent='Mensagem selecionada. Use a opção Copiar do seu aparelho.';}
 });
 update();
})();
