/* Read-only verification of published website bytes against an exact Git revision. */
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
(async()=>{
 const revision=process.env.PUBLISHED_REVISION||cp.execFileSync('git',['rev-parse','HEAD']).toString().trim();
 const remote=cp.execFileSync('git',['ls-remote','origin','refs/heads/main']).toString().split(/\s/)[0];
 if(remote!==revision)throw new Error(`main is ${remote}; expected ${revision}`);
 const files=cp.execFileSync('git',['ls-tree','-r','--name-only',revision]).toString().trim().split('\n').filter(f=>f.endsWith('.html')||['cinematic.js','cinematic.css','brand.js'].includes(f));
 const results=[];const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const file of files){
  const expected=cp.execFileSync('git',['show',`${revision}:${file}`]);
  const route=file==='index.html'?'/':file.endsWith('/index.html')?'/'+file.slice(0,-10):'/'+file;
  const url='https://cendavex.com'+route+(file.endsWith('.js')||file.endsWith('.css')?'?v=motion-20261017-1':'');
  for(const bust of [false,true]){
   const target=url+(bust?(url.includes('?')?'&':'?')+'verify='+revision:'');
   const res=await fetch(target,{headers:{'Cache-Control':'no-cache'}}),bytes=Buffer.from(await res.arrayBuffer());
   if(!res.ok||hash(bytes)!==hash(expected))throw new Error(`Published bytes differ: ${target}, HTTP ${res.status}, received ${hash(bytes)}, expected ${hash(expected)}`);
   results.push({url:target,sha256:hash(bytes),status:res.status,lastModified:res.headers.get('last-modified')});
  }
 }
 const report={publishedRevision:revision,verifiedAt:new Date().toISOString(),originMain:remote,files:files.length,requests:results.length,results};
 fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/motion-deployment.json',JSON.stringify(report,null,2));console.log(JSON.stringify({publishedRevision:revision,files:files.length,requests:results.length,allMatch:true}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
