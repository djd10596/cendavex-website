/* Read-only public release verification against exact Git objects, including
   the precise stylesheet/script URLs declared by the published HTML. */
const fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
(async()=>{
 const revision=process.env.PUBLISHED_REVISION||cp.execFileSync('git',['rev-parse','HEAD']).toString().trim();
 const remote=cp.execFileSync('git',['ls-remote','origin','refs/heads/main']).toString().split(/\s/)[0];
 if(remote!==revision)throw new Error(`main is ${remote}; expected ${revision}`);
 const files=cp.execFileSync('git',['ls-tree','-r','--name-only',revision]).toString().trim().split('\n').filter(f=>f.endsWith('.html')||(!f.includes('/')&&/\.(css|js)$/.test(f)));
 const targets=new Map();
 for(const file of files){
 const bytes=cp.execFileSync('git',['show',`${revision}:${file}`]);
 const route=file==='index.html'?'/':file.endsWith('/index.html')?'/'+file.slice(0,-10):'/'+file;
 targets.set(route,{file,bytes});
 if(file.endsWith('.html')) for(const match of bytes.toString().matchAll(/(?:src|href)="(\/[^"\s]+\.(?:css|js)(?:\?[^"\s]*)?)"/g)){
 const resource=match[1].split('?')[0].slice(1);
 targets.set(match[1],{file:resource,bytes:cp.execFileSync('git',['show',`${revision}:${resource}`])});
 }
 }
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');const results=[];
 for(const [route,{file,bytes}] of targets){
 for(const bust of [false,true]){
 const url='https://cendavex.com'+route+(bust?(route.includes('?')?'&':'?')+'verify='+revision:'');
 const response=await fetch(url,{headers:{'Cache-Control':'no-cache'}});const actual=Buffer.from(await response.arrayBuffer());
 if(!response.ok||hash(actual)!==hash(bytes))throw new Error(`Published bytes differ: ${url}, HTTP ${response.status}`);
 results.push({url,file,status:response.status,sha256:hash(actual)});
 }
 }
 fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/signature-deployment.json',JSON.stringify({revision,verifiedAt:new Date().toISOString(),results},null,2));
 console.log(JSON.stringify({revision,files:files.length,requests:results.length,allMatch:true}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
