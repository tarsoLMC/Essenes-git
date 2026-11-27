const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {transform}=require('lightningcss'),{minify}=require('terser');
const root=path.resolve(__dirname,'..');
function write(type,key,bytes){const hash=crypto.createHash('sha256').update(bytes).digest('hex').slice(0,12),name=`essenes-${key}.${hash}.${type}`;fs.writeFileSync(path.join(root,'assets',type,name),bytes);console.log(name,bytes.length+' bytes');return '/assets/'+type+'/'+name;}
(async()=>{
 const css={},js={};
 for(const [key,files]of Object.entries({site:['site.css','efeitos.css'],wheel:['wheel.css','wheel-result-v37.css'],home:['site.css','efeitos.css','home-v35.css','conversion-v36.css'],contact:['site.css','efeitos.css','conversion-v36.css']}))css[key]=write('css',key,transform({filename:key+'.css',code:Buffer.from(files.map(file=>fs.readFileSync(path.join(root,'assets/css',file),'utf8')).join('\n')),minify:true}).code);
 for(const [key,files]of Object.entries({site:['site.js','efeitos.js','metrics-v36.js'],wheel:['wheel-core.js','wheel-ui.js'],intro:['home-intro.js'],contact:['site.js','efeitos.js','conversion-v36.js','metrics-v36.js']})){
  const code=files.map(f=>fs.readFileSync(path.join(root,'assets/js',f),'utf8')).join('\n;\n');
  const result=await minify(code,{ecma:2020,compress:true,mangle:true,format:{comments:false}});
  js[key]=write('js',key,Buffer.from(result.code+'\n'));
 }
 for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
  const key=file==='roda-da-vida.html'?'wheel':file==='index.html'?'home':file==='contato.html'?'contact':'site';const scriptKey=key==='home'?'site':key;let html=fs.readFileSync(path.join(root,file),'utf8');
  // Update managed bundles without dropping page-specific tools, the dock or extra styles.
  html=html.replace(/href="\/assets\/css\/essenes-(?:site|wheel|home|contact)\.[a-f0-9]{12}\.css"/g,'href="'+css[key]+'"');
  html=html.replace(/src="\/assets\/js\/essenes-(?:site|wheel|contact)\.[a-f0-9]{12}\.js"/g,'src="'+js[scriptKey]+'"');
  if(file==='index.html'){
   const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
   const letters=text=>[...text].map((letter,i)=>'<span class="es-letter" style="--es-order:'+i+'">'+escape(letter)+'</span>').join('');
   let intro=fs.readFileSync(path.join(__dirname,'home-intro.html'),'utf8');
   for(const [name,text]of Object.entries({NAME:'Essenes',METHOD:'Constelação Familiar Sistêmica',PHRASE_MAIN:'Um novo olhar',PHRASE_SUB:'para a sua história.'}))intro=intro.replace('{{'+name+'}}',letters(text));
   intro=intro.replace('{{SCRIPT}}',fs.readFileSync(path.join(root,js.intro.slice(1)),'utf8').trim());
   html=html.replace(/<!-- ESSENES_INTRO_START -->[\s\S]*?<!-- ESSENES_INTRO_END -->\n?/g,'');
   html=html.replace(/(<body\b[^>]*>)\s*/,(_,tag)=>tag+'\n'+intro);
  }
  fs.writeFileSync(path.join(root,file),html);
 }
 fs.writeFileSync(path.join(__dirname,'assets.json'),JSON.stringify({css,js},null,2));
})().catch(e=>{console.error(e);process.exit(1);});
