// Local-only visual review sheet; default server is ephemeral and bound to loopback.
const {chromium}=require('playwright');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
(async()=>{
 let browser,server;
 try {
  let base=process.env.EXPERIENCE_BASE;
  if(!base) {
   const root=path.resolve(__dirname,'..');
   server=http.createServer((req,res)=>{
    let file=path.resolve(root,'.'+req.url.split('?')[0]);
    if(!file.startsWith(root+path.sep) && file!==root){res.writeHead(403).end();return;}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    fs.readFile(file,(err,data)=>{
     if(err){res.writeHead(404).end();return;}
     const mime={'.css':'text/css','.js':'application/javascript','.png':'image/png','.html':'text/html'};
     res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);
    });
   });
   await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
   base=`http://127.0.0.1:${server.address().port}`;
  }
  browser=await chromium.launch();
  const areas=['','ai','financial','systems','industries'];
  const images=[];
  for(const width of [1440,390]) for(const area of areas) {
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
   await page.route('https://**/*',route=>route.abort());
   await page.goto(`${base}/${area ? area+'/' : ''}`);
   images.push({name:area||'technologies',width,data:(await page.screenshot()).toString('base64')});
   await page.close();
  }
  const sheet=await browser.newPage({viewport:{width:1600,height:1130},deviceScaleFactor:1});
  await sheet.setContent(`<html><body style="margin:0;padding:25px;background:#07101d;color:#cbe2fc;font:14px Arial;box-sizing:border-box"><h1 style="font-size:20px;font-weight:400">CENDAVEX / EXPERIENCE 3.0 — ISOLATED CANDIDATE</h1><p>Desktop 1440px / Mobile 390px · Reduced motion · External services blocked</p><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px">${images.map(i=>`<div><p style="text-transform:uppercase;letter-spacing:2px;font-size:11px">${i.name} / ${i.width}</p><div style="height:${i.width===1440?215:720}px;overflow:hidden;border:1px solid #375575"><img style="width:100%;display:block" src="data:image/png;base64,${i.data}"></div></div>`).join('')}</div></body></html>`);
  fs.mkdirSync('docs',{recursive:true});
  await sheet.screenshot({path:'docs/experience3-preview.png',fullPage:true});
 } finally {await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1});
