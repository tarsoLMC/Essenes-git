(() => {
 'use strict';
 const $=id=>document.getElementById(id);
 const core=window.EssenesWheel;
 if(!core){$('load-error').hidden=false;return;}
 const {areas,groups,scoreColor,scoreBand}=core;
 const scores=Array(areas.length).fill(null);
 const visited=Array(areas.length).fill(false);
 let index=0,editing=false,pending=undefined,resultDate='',contactTimer=null,contactShown=false,direction=1;
 const reduce=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function focus(el){el.focus({preventScroll:true});el.scrollIntoView({behavior:reduce()?'auto':'smooth',block:'start'});}
 function view(id){
  clearTimeout(contactTimer);closeContact(false);
  document.body.classList.toggle('is-answering',id==='questionnaire');
  ['welcome','questionnaire','result'].forEach(name=>{$(name).hidden=name!==id;});
  $('contact-launcher').hidden=id!=='result'||!contactShown;
 }
 function drawLive(){
  const preview=scores.slice();
  if(pending!==undefined)preview[index]=pending;
  $('live-wheel').innerHTML=core.wheelSVG(preview,'Sua roda em construção');
  const count=core.summarize(preview).count;
  $('live-count').textContent=count?`${count} de 12 áreas avaliadas. Cada área aparece identificada em seu setor.`:'Nenhuma área avaliada ainda.';
 }
 function updateSelection(value){
  pending=value;
  const isSkip=value===null;
  $('selection-feedback').textContent=isSkip?'Esta área ficará sem nota. Você poderá avaliá-la depois.':`Sua escolha: ${value} de 10 · ${scoreBand(value)}. Você pode mudar antes de continuar.`;
  $('next').disabled=false;$('question-error').textContent='';drawLive();
 }
 function renderQuestion(){
  view('questionnaire');
  const area=areas[index],card=document.querySelector('.question-card');
  const group=core.groupFor(index);card.style.setProperty('--accent',group.color);card.style.setProperty('--accent-soft',group.soft);
  $('step-label').textContent=editing?`Revendo área ${index+1} de 12`:`Área ${index+1} de 12`;
  $('progress-fill').style.width=`${(editing?12:index)/12*100}%`;
  const progress=document.querySelector('.progress-track');progress.setAttribute('aria-valuenow',String(editing?12:index));progress.setAttribute('aria-valuetext',editing?'Revisão de uma resposta':`${index} de 12 áreas percorridas`);
  $('area-label').textContent=`${group.name} · ${String(index+1).padStart(2,'0')} / ${area.name}`;
  $('question-title').textContent=area.question;$('question-hint').textContent=area.hint;
  $('score-options').replaceChildren();
  for(let n=0;n<=10;n++){
   const label=document.createElement('label');label.className=`score-option ${n<=5?'range-low':n<=7?'range-mid':'range-high'}`;
   const input=document.createElement('input');input.type='radio';input.name='score';input.value=String(n);input.setAttribute('aria-label',`Nota ${n} de 10`);
   const text=document.createElement('span');text.textContent=n;label.append(input,text);$('score-options').append(label);
  }
  const radios=[...document.querySelectorAll('#score-form input[name="score"]')];
  radios.forEach(radio=>{radio.checked=false;radio.addEventListener('change',()=>{if(radio.checked)updateSelection(radio.value==='skip'?null:Number(radio.value));});});
  // The permanent skip radio must not accumulate listeners between questions.
  const skip=radios.find(r=>r.value==='skip');
  skip.replaceWith(skip.cloneNode(true));
  const freshSkip=document.querySelector('#score-form input[value="skip"]');freshSkip.addEventListener('change',()=>{if(freshSkip.checked)updateSelection(null);});
  pending=undefined;
  $('selection-feedback').textContent='Escolha uma nota para continuar.';$('question-error').textContent='';$('next').disabled=true;
  if(visited[index]){
   const saved=scores[index];const target=document.querySelector(`#score-form input[value="${saved===null?'skip':saved}"]`);target.checked=true;updateSelection(saved);
  }
  $('previous').textContent=editing?'← Voltar ao resultado':(index===0?'← Início':'← Voltar');
  $('next').textContent=editing?'Salvar alteração →':(index===11?'Ver minha roda →':'Próxima área →');
  const question=$('question-body');question.style.setProperty('--step-direction',String(direction));question.classList.remove('step-enter');requestAnimationFrame(()=>question.classList.add('step-enter'));
  drawLive();resetZoom('live-wheel');focus($('question-title'));
 }
 function sharePreview(){
  const text=core.message(scores,$('focus-area').value,$('include-scores').checked);
  $('message-preview').textContent=text;
  // Only the opted-in content appears in the external URL. No network call is made here.
  $('result-whatsapp').href=`https://wa.me/5561981738997?text=${encodeURIComponent(text)}`;
  // The small invitation always opens a general message, without the scores.
  const chatText=core.message(scores,'',false);
  $('chat-whatsapp').href=`https://wa.me/5561981738997?text=${encodeURIComponent(chatText)}`;
 }
 function renderCategoryLegend(){
  const legend=$('result-wheel-legend');legend.replaceChildren();
  groups.forEach(group=>{
   const box=document.createElement('section');box.className='wheel-group-card';box.style.setProperty('--group-color',group.color);box.style.setProperty('--group-soft',group.soft);
   const title=document.createElement('h3');title.textContent=group.name;box.append(title);
   const list=document.createElement('ol');list.className='wheel-group-items';
   group.indices.forEach(i=>{
    const li=document.createElement('li'),dot=document.createElement('span'),name=document.createElement('span'),value=document.createElement('strong');
    dot.className='wheel-num';dot.textContent=String(i+1);dot.style.setProperty('--num-color',scoreColor(scores[i]));
    name.textContent=areas[i].name;value.textContent=scores[i]===null?'—':scores[i]+'/10';
    value.style.color=scoreColor(scores[i]);li.append(dot,name,value);list.append(li);
   });
   box.append(list);legend.append(box);
  });
 }
 function renderResult(){
  const info=core.summarize(scores);
  if(!info.count){$('question-error').textContent='Para formar sua roda, avalie pelo menos uma área. Use “Voltar” para escolher uma pergunta.';return;}
  editing=false;view('result');
  if(!resultDate)resultDate=new Intl.DateTimeFormat('pt-BR').format(new Date());
  $('result-date').textContent=resultDate;
  $('result-wheel').innerHTML=core.wheelSVG(scores,'Sua Roda da Vida',true);resetZoom('result-wheel');
  renderCategoryLegend();
  let text=`Você avaliou ${info.count} de 12 áreas. `;
  if(info.count===1)text+='Resultado parcial: você pode completar as outras áreas em “Revisar ou editar”.';
  else if(info.equal)text+=`Todas receberam ${info.min}/10. Cada nota pode ter uma história diferente.`;
  else text+=`Notas entre ${info.min} e ${info.max}/10. O que mais chamou sua atenção?`;
  if(info.count>1 && info.count<12)text+=' Resultado parcial: você pode completar as demais áreas.';
  $('result-summary').textContent=text;
  $('score-list').replaceChildren();
  groups.forEach(group=>{
   const section=document.createElement('section');section.className='score-group';
   section.style.setProperty('--group-color',group.color);section.style.setProperty('--group-soft',group.soft);
   const heading=document.createElement('h3');heading.className='score-group-heading';heading.textContent=group.name;
   section.append(heading);
   const groupItems=document.createElement('div');groupItems.className='score-group-rows';
   group.indices.forEach(i=>{
    const area=areas[i],value=scores[i],color=scoreColor(value),article=document.createElement('article');
    article.className='score-row';article.style.setProperty('--row-color',color);article.style.setProperty('--score-width',`${value===null?0:value*10}%`);
    article.innerHTML=`<div class="score-row-top"><span class="score-dot" aria-hidden="true"></span><h4>${i+1}. ${area.name}</h4><strong>${value===null?'—':value+'<small>/10</small>'}</strong></div><div class="score-bar" aria-hidden="true"><i></i></div><div class="score-row-bottom"><span>${scoreBand(value)}</span><button type="button" aria-label="Editar ${area.name}">Editar</button></div>`;
    article.querySelector('button').addEventListener('click',()=>{clearTimeout(contactTimer);editing=true;index=i;renderQuestion();});groupItems.append(article);
   });
   section.append(groupItems);$('score-list').append(section);
  });
  sharePreview();focus($('result-title'));scheduleContact();
 }
 $('start').disabled=false;
 $('sample-wheel').innerHTML=core.wheelSVG([7,5,8,6,9,5,8,4,7,6,8,5],'Exemplo ilustrativo com blocos e faixas de cores; estas não são suas notas');
 $('start').addEventListener('click',()=>{index=0;editing=false;renderQuestion();});
 $('score-form').addEventListener('submit',event=>{
  event.preventDefault();direction=1;if(pending===undefined){$('question-error').textContent='Escolha uma nota ou a opção de não avaliar.';return;}
  if(editing && pending===null && scores[index]!==null && core.summarize(scores).count===1){$('question-error').textContent='Mantenha ao menos uma área avaliada para visualizar o resultado.';return;}
  scores[index]=pending;visited[index]=true;
  if(editing)renderResult();else if(index===11){
   if(!core.summarize(scores).count){$('question-error').textContent='Para formar sua roda, avalie pelo menos uma área. Use “Voltar” para escolher uma pergunta.';return;}
   renderResult();
  }else{index++;renderQuestion();}
 });
 function openContact(announce=false){
  if($('result').hidden||document.hidden||document.querySelector('dialog[open]'))return;
  clearTimeout(contactTimer);contactShown=true;sharePreview();
  $('contact-chat').hidden=false;$('contact-launcher').hidden=true;
  $('contact-launcher').setAttribute('aria-expanded','true');
  if(announce)$('contact-announcement').textContent='Um convite do Essenes está disponível: converse com Alexandre no WhatsApp sobre sua roda, se desejar.';
  else $('contact-close').focus({preventScroll:true});
 }
 function closeContact(restoreFocus=false){
  const hadFocus=$('contact-chat').contains(document.activeElement);
  $('contact-chat').hidden=true;
  $('contact-launcher').hidden=$('result').hidden||!contactShown;
  $('contact-launcher').setAttribute('aria-expanded','false');
  $('contact-announcement').textContent='';
  if(restoreFocus&&hadFocus&&!$('contact-launcher').hidden)$('contact-launcher').focus({preventScroll:true});
 }
 function scheduleContact(){
  clearTimeout(contactTimer);
  if(contactShown||$('result').hidden||document.hidden||document.querySelector('dialog[open]'))return;
  contactTimer=setTimeout(()=>openContact(true),3000);
 }
 $('contact-close').addEventListener('click',()=>closeContact(true));
 $('contact-launcher').addEventListener('click',()=>openContact());
 $('chat-whatsapp').addEventListener('click',()=>closeContact(false));
 $('result-whatsapp').addEventListener('click',()=>{clearTimeout(contactTimer);contactShown=true;closeContact(false);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(contactTimer);else scheduleContact();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('contact-chat').hidden){closeContact(true);}});
 $('previous').addEventListener('click',()=>{
  direction=-1;
  if(editing){renderResult();return;}
  if(pending!==undefined){scores[index]=pending;visited[index]=true;}
  if(index===0){view('welcome');focus($('start'));}else{index--;renderQuestion();}
 });
 areas.forEach(area=>{const option=document.createElement('option');option.value=area.id;option.textContent=area.name;$('focus-area').append(option);});
 $('focus-area').addEventListener('change',sharePreview);$('include-scores').addEventListener('change',sharePreview);
 // Enlarged, horizontally pannable reading mode is opt-in on compact screens.
 function resetZoom(target){
  const area=$(target);if(area){area.classList.remove('is-zoomed');area.scrollLeft=0;}
  const button=document.querySelector(`[data-wheel-zoom="${target}"]`);
  if(button){button.setAttribute('aria-pressed','false');button.textContent='Ampliar roda +';}
 }
 document.querySelectorAll('[data-wheel-zoom]').forEach(button=>{
  button.addEventListener('click',()=>{
   const area=$(button.dataset.wheelZoom);if(!area)return;
   const zoomed=area.classList.toggle('is-zoomed');
   button.setAttribute('aria-pressed',String(zoomed));
   button.textContent=zoomed?'Ver roda inteira −':'Ampliar roda +';
   area.scrollLeft=0;
  });
 });
 $('download').addEventListener('click',()=>{
  const blob=new Blob([core.exportSVG(scores,resultDate)],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='minha-roda-da-vida-essenes.svg';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 const dialog=$('restart-dialog');
 $('restart').addEventListener('click',()=>{clearTimeout(contactTimer);closeContact(false);dialog.showModal();$('cancel-restart').focus();});
 $('cancel-restart').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{if(!$('result').hidden){$('restart').focus({preventScroll:true});scheduleContact();}});
 $('confirm-restart').addEventListener('click',()=>{
  dialog.close();clearTimeout(contactTimer);contactShown=false;scores.fill(null);visited.fill(false);index=0;pending=undefined;editing=false;resultDate='';$('include-scores').checked=false;$('focus-area').value='';$('message-preview').textContent='';$('result-whatsapp').href='https://wa.me/5561981738997';$('result-wheel').replaceChildren();$('score-list').replaceChildren();
  document.querySelectorAll('#result details').forEach(details=>{details.open=false;});renderQuestion();
 });
 // A failed dependency is explained even when a cached HTML page loads an incomplete upload.
 document.documentElement.classList.add('wheel-ready');
})();
