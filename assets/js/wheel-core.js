/* Essenes: original editorial adaptation. Pure calculation/rendering helpers. */
(function (scope) {
 'use strict';
 const areas = [
  {id:'financas',name:'Vida financeira',color:'#287494',soft:'#e5f0f6',question:'Como você se sente em relação à sua vida financeira?',hint:'Considere sua organização, a relação com o dinheiro e a tranquilidade para lidar com os compromissos. A nota é sobre sua satisfação, não sobre quanto você ganha.'},
  {id:'trabalho',name:'Trabalho e realização',color:'#6d55a0',soft:'#eee8f6',question:'Quanto sua ocupação atual faz sentido para você?',hint:'Pense no trabalho, nos estudos, nos cuidados com a casa ou na atividade que ocupa seus dias. Considere reconhecimento, realização e perspectivas.'},
  {id:'saude',name:'Saúde e autocuidado',color:'#26816c',soft:'#e2f1e9',question:'Como está sua satisfação com o cuidado que dedica a si?',hint:'Considere descanso, alimentação, movimento e os cuidados possíveis com sua saúde. Esta pergunta não avalia condições médicas nem sua aparência.'},
  {id:'emocional',name:'Bem-estar emocional',color:'#b15459',soft:'#f7e8e8',question:'Como você se sente com a forma de acolher suas emoções?',hint:'Pense no espaço que tem para reconhecer sentimentos, atravessar dias difíceis e buscar apoio quando precisa. Não é necessário estar bem o tempo todo.'},
  {id:'familia',name:'Relações familiares',color:'#a4692f',soft:'#f8eddc',question:'Como você se sente nas suas relações familiares?',hint:'Considere os vínculos que fazem parte da sua história, o respeito, a proximidade e os limites que fazem sentido para você. Ter limites também pode ser cuidado.'},
  {id:'afetos',name:'Vida afetiva',color:'#a04d7f',soft:'#f4e4ef',question:'Como está sua satisfação com sua vida afetiva?',hint:'Estando ou não em um relacionamento, pense em afeto, reciprocidade, intimidade e liberdade para viver escolhas coerentes com você.'},
  {id:'amizades',name:'Amizades e apoio',color:'#356caa',soft:'#e5eef9',question:'Quanto você se sente satisfeito(a) com seus vínculos de amizade?',hint:'Considere companhia, confiança e pessoas com quem pode contar. A qualidade dos vínculos importa mais do que a quantidade de contatos.'},
  {id:'lazer',name:'Lazer e descanso',color:'#af5b36',soft:'#f8e8de',question:'Como está o espaço para descanso e prazer na sua rotina?',hint:'Pense em pausas, hobbies, diversão e momentos sem obrigação de produzir. Considere o que realmente ajuda você a aproveitar e recuperar energia.'},
  {id:'crescimento',name:'Aprendizado e crescimento',color:'#647c32',soft:'#ecf0df',question:'Quanto você se sente satisfeito(a) com seu desenvolvimento pessoal?',hint:'Considere curiosidade, aprendizados e oportunidades de experimentar algo novo. Crescer também pode significar respeitar o próprio ritmo.'},
  {id:'proposito',name:'Sentido e propósito',color:'#8661a5',soft:'#f0e9f5',question:'Quanto suas escolhas se conectam ao que tem valor para você?',hint:'Pense em valores, sentido de vida e espiritualidade, se ela fizer parte da sua história. Você não precisa ter uma missão definida ou seguir uma religião.'},
  {id:'ambiente',name:'Ambiente e rotina',color:'#247b7d',soft:'#e2eff0',question:'Como você se sente nos ambientes em que vive e na sua rotina?',hint:'Considere acolhimento, organização, conforto e a forma como seus dias são distribuídos. Avalie a experiência que tem, dentro das suas possibilidades.'},
  {id:'contribuicao',name:'Contribuição e comunidade',color:'#9b731e',soft:'#f5eedb',question:'Quanto você se sente satisfeito(a) com sua forma de contribuir?',hint:'Pense em cuidado, participação e pequenas atitudes que fazem diferença para outras pessoas. Não é sobre doar dinheiro ou estar disponível o tempo todo.'}
 ];

 // Os índices mantêm a correspondência com as 12 perguntas já aprovadas.
 // O desenho agrupa três áreas em cada quadrante, sem alterar textos nem ordem do formulário.
 const groups = [
  {id:'qualidade',name:'Qualidade de Vida',color:'#1f6888',soft:'#dbeef6',indices:[7,10,9]},
  {id:'pessoal',name:'Pessoal',color:'#9a4b68',soft:'#f4dde6',indices:[2,8,3]},
  {id:'profissional',name:'Profissional',color:'#1f7a60',soft:'#d9efe6',indices:[1,0,11]},
  {id:'relacionamentos',name:'Relacionamentos',color:'#a06622',soft:'#f4e3c8',indices:[4,5,6]}
 ];
 const order=groups.flatMap(group=>group.indices);
 const groupFor = i => groups.find(group=>group.indices.includes(i));
 const scorePalette = {0:'#a9151b',1:'#b52324',2:'#c63331',3:'#d34743',4:'#df615c',5:'#ea7d77',6:'#d2a21a',7:'#e6c24e',8:'#67b86e',9:'#2d965f',10:'#0d7449'};
 const scoreColor = value => value===null?'#b8c2bf':scorePalette[value]||'#b8c2bf';
 const scoreBand = value => value===null?'Não avaliada':value<=5?'Vermelho · 0 a 5':value<=7?'Amarelo · 6 e 7':'Verde · 8 a 10';
 const validScore = value => Number.isInteger(value) && value >= 0 && value <= 10;
 const normalize = values => areas.map((_,i) => validScore(values[i]) ? values[i] : null);
 const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 function summarize(values) {
  const scores=normalize(values),answered=scores.map((value,i)=>({value,i})).filter(x=>x.value!==null);
  if(!answered.length)return {count:0,low:[],high:[],equal:false};
  const min=Math.min(...answered.map(x=>x.value)),max=Math.max(...answered.map(x=>x.value));
  return {count:answered.length,min,max,equal:min===max,low:answered.filter(x=>x.value===min).map(x=>x.i),high:answered.filter(x=>x.value===max).map(x=>x.i)};
 }
 function wheelSVG(values,label='Sua Roda da Vida',showValues=false) {
  const scores=normalize(values),cx=370,cy=370,r=220,outer=r+94;
  const point=(radius,angle)=>[cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius].map(n=>n.toFixed(2)).join(' ');
  const sector=(inner,far,start,end)=>inner<=0
   ? `M ${cx} ${cy} L ${point(far,start)} A ${far} ${far} 0 0 1 ${point(far,end)} Z`
   :`M ${point(far,start)} A ${far} ${far} 0 0 1 ${point(far,end)} L ${point(inner,end)} A ${inner} ${inner} 0 0 0 ${point(inner,start)} Z`;
  const labels={
   lazer:['Lazer e','descanso'],ambiente:['Ambiente e','rotina'],proposito:['Sentido e','propósito'],
   saude:['Saúde e','autocuidado'],crescimento:['Aprendizado e','crescimento'],emocional:['Bem-estar','emocional'],
   trabalho:['Trabalho e','realização'],financas:['Vida','financeira'],contribuicao:['Contribuição e','comunidade'],
   familia:['Relações','familiares'],afetos:['Vida afetiva'],amizades:['Amizades','e apoio']
  };
  let shapes=`<circle cx="${cx}" cy="${cy}" r="${outer+1}" fill="#f2f5f1" stroke="#c4d3c8" stroke-width="1.8"/>`;
  // Each area has a separate, explicitly labeled outer block, as in the reference model.
  order.forEach((originalIndex,k)=>{
   const area=areas[originalIndex],group=groupFor(originalIndex);
   const a=-Math.PI+k*Math.PI/6,b=-Math.PI+(k+1)*Math.PI/6,mid=(a+b)/2;
   shapes+=`<path d="${sector(r+7,outer-1,a+.003,b-.003)}" fill="${group.soft}" stroke="${group.color}" stroke-opacity=".72" stroke-width="1.5"/>`;
   const words=labels[area.id]||[area.name],rotation=mid*180/Math.PI+90;
   const upright=((rotation+360)%360>90&&(rotation+360)%360<270)?rotation+180:rotation;
   // A white under-stroke protects readability where the background is colored.
   words.forEach((word,j)=>{
    const radial=r+(words.length===1?48:38+j*22);
    const [x,y]=point(radial,mid).split(' ');
    shapes+=`<text x="${x}" y="${y}" transform="rotate(${upright.toFixed(2)} ${x} ${y})" dominant-baseline="middle" text-anchor="middle" font-size="13.6" font-weight="900" letter-spacing="-.1" fill="${group.color}">${escape(word)}</text>`;
   });
  });
  // The ten equally-spaced rings still represent the 0–10 scale.
  order.forEach((originalIndex,k)=>{
   const value=scores[originalIndex],color=scoreColor(value),a=-Math.PI+k*Math.PI/6+.009,b=-Math.PI+(k+1)*Math.PI/6-.009;
   for(let n=1;n<=10;n++){
    const near=(n-1)*r/10+.48,far=n*r/10-.76,active=value!==null&&n<=value;
    shapes+=`<path d="${sector(near,far,a,b)}" fill="${active?color:value===null?'#dfe6e1':'#f5f7f4'}" fill-opacity="${active?'1':value===null?'.98':'.96'}" stroke="${active?'#fcfffc':'#d2ddd3'}" stroke-width=".82"/>`;
   }
  });
  for(let q=0;q<4;q++){
   const angle=-Math.PI+q*Math.PI/2;
   shapes+=`<path d="M ${point(0,angle)} L ${point(outer,angle)}" fill="none" stroke="#607869" stroke-width="2.7"/>`;
  }
  for(let n=1;n<=10;n++){
   const y=cy-r*n/10+4;
   const x=n===10?cx+11:cx+8;
   const size=n===10?11.2:10.8;
   shapes+=`<text x="${x}" y="${y}" font-size="${size}" fill="#173a30" font-weight="800" paint-order="stroke" stroke="#fbfffb" stroke-width="3.7">${n}</text>`;
  }
  shapes+=`<circle cx="${cx}" cy="${cy}" r="8.5" fill="#fcfefb" stroke="#607869" stroke-width="1.5"/><text x="${cx}" y="${cy+3.5}" font-size="9.8" font-weight="800" fill="#28483d" text-anchor="middle">0</text>`;
  // Display one upright, high-contrast value at the outer edge of each answered sector.
  // A fixed radius keeps low values (including zero) away from the crowded center.
  if(showValues){
   order.forEach((originalIndex,k)=>{
    const value=scores[originalIndex];if(value===null)return;
    const angle=-Math.PI+(k+.5)*Math.PI/6;
    const [x,y]=point(r-21,angle).split(' ');
    shapes+=`<g class="sector-score"><circle cx="${x}" cy="${y}" r="17" fill="#ffffff" stroke="#244c3d" stroke-width="2"/><text x="${x}" y="${y}" dominant-baseline="central" text-anchor="middle" font-size="21" font-weight="800" fill="#103c32">${value}</text></g>`;
   });
  }
  const captions=[
   {x:176,y:44,sub:'BEM-ESTAR E ROTINA'},
   {x:564,y:44,sub:'CUIDADO E CRESCIMENTO'},
   {x:564,y:697,sub:'TRABALHO E RECURSOS'},
   {x:176,y:697,sub:'VÍNCULOS E AFETOS'}
  ];
  groups.forEach((g,i)=>{
   const c=captions[i];
   shapes+=`<rect x="${c.x-118}" y="${c.y-27}" width="246" height="54" rx="13" fill="${g.soft}" stroke="${g.color}" stroke-opacity=".16"/><text x="${c.x}" y="${c.y-4}" font-size="20" font-weight="800" text-anchor="middle" fill="${g.color}">${escape(g.name)}</text><text x="${c.x}" y="${c.y+14}" font-size="9" font-weight="700" letter-spacing=".9" text-anchor="middle" fill="#51685a">${c.sub}</text>`;
  });
  const description=groups.map(g=>`${g.name}: ${g.indices.map(i=>`${areas[i].name}, ${scores[i]===null?'não avaliada':scores[i]+' de 10'}`).join('; ')}`).join('. ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 720 740" role="img" aria-label="${escape(label+'. '+description)}" font-family="Arial,sans-serif"><title>${escape(label)}</title><desc>${escape(description)}</desc>${shapes}</svg>`;
 }
 function message(values,focus='',includeScores=false) {
  const text=['Olá! Fiz a Roda da Vida no site Essenes e gostaria de conversar com o Terapeuta para entender meu resultado.'];
  const area=areas.find(a=>a.id===focus);
  if(area)text.push(`Gostaria de começar pela área: ${area.name}.`);
  if(includeScores){
   const scores=normalize(values);text.push('\nMinhas notas de satisfação (0 a 10):');
   groups.forEach(g=>{
    text.push(`\n${g.name}:`);
    g.indices.forEach(i=>text.push(`${areas[i].name}: ${scores[i]===null?'não avaliada':scores[i]+'/10'}`));
   });
   text.push('\nEsta é uma autoavaliação do meu momento, não um diagnóstico.');
  }
  return text.join('\n');
 }
 function exportSVG(values,date) {
  const scores=normalize(values);
  const wheel=wheelSVG(scores,'Minha Roda da Vida',true).replace('viewBox="10 0 720 740"','x="15" y="125" width="740" height="740" viewBox="10 0 720 740"');
  let rows='';
  groups.forEach((g,j)=>{
   const y=188+j*156;
   rows+=`<rect x="783" y="${y-23}" width="380" height="129" rx="13" fill="${g.soft}"/><text x="802" y="${y+3}" font-size="19" fill="${g.color}" font-weight="800">${escape(g.name)}</text>`;
   g.indices.forEach((i,k)=>{
    const baseline=y+32+k*26,n=scores[i],c=scoreColor(n);
    rows+=`<circle cx="809" cy="${baseline-5}" r="5" fill="${c}"/><text x="824" y="${baseline}" font-size="14" fill="#263d33">${escape(areas[i].name)}</text><text x="1141" y="${baseline}" text-anchor="end" font-size="14" font-weight="800" fill="${c}">${n===null?'—':n+'/10'}</text>`;
   });
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="925" viewBox="0 0 1200 925" font-family="Arial,sans-serif"><rect width="1200" height="925" fill="#faf8f2"/><text x="50" y="60" fill="#103c32" font-size="25" font-weight="800">ESSENES · MINHA RODA DA VIDA</text><text x="50" y="92" fill="#56685f" font-size="15">Um retrato da minha satisfação neste momento · ${escape(date)}</text>${wheel}${rows}<path d="M45 864H1155" stroke="#d9e2d7"/><text x="52" y="885" fill="#56685f" font-size="13">0–5: vermelho · 6–7: amarelo · 8–10: verde · Cinza: não avaliada</text><text x="52" y="907" fill="#56685f" font-size="12">Exercício de reflexão, sem diagnóstico · essenes.com.br · (61) 98173-8997</text></svg>`;
 }
 const api=Object.freeze({areas,groups,groupFor,scoreColor,scoreBand,validScore,normalize,summarize,wheelSVG,message,exportSVG});
 if(typeof module!=='undefined'&&module.exports)module.exports=api; else scope.EssenesWheel=api;
})(typeof window!=='undefined'?window:this);
