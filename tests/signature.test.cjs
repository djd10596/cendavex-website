const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium,webkit}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const root=path.resolve(__dirname,'..');
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')).concat(...['ai','financial','systems','industries'].map(d=>fs.readdirSync(path.join(root,d)).filter(f=>f.endsWith('.html')).map(f=>d+'/'+f))).filter(f=>fs.readFileSync(path.join(root,f),'utf8').includes('signature-panel'));
test('signature interiors: both engines, every route, responsive rendering, explanation controls, accessibility and motion',async()=>{
 const server=http.createServer((req,res)=>{const f=path.join(root,req.url.split('?')[0]);fs.readFile(f,(e,d)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',({'.js':'application/javascript','.css':'text/css','.html':'text/html','.png':'image/png','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${server.address().port}`;const evidence=[];
 fs.mkdirSync('test-results/signature',{recursive:true});
 try{for(const [engine,type] of Object.entries({chromium,webkit})){
 const browser=await type.launch();
 try{for(const file of files){
 const context=await browser.newContext();const page=await context.newPage();await page.route('https://**/*',r=>r.abort());
 await page.addInitScript(()=>{window.signatureCLS=PerformanceObserver.supportedEntryTypes.includes('layout-shift')?0:null;if(window.signatureCLS!==null)new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.signatureCLS+=e.value;})).observe({type:'layout-shift',buffered:true});});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});await page.goto(base+'/'+file);await page.waitForTimeout(500);const initialCLS=await page.evaluate(()=>window.signatureCLS);assert.ok(initialCLS===null||initialCLS<.1,`${file} ${width}: initial CLS ${initialCLS}`);const panel=page.locator('.signature-panel');await panel.scrollIntoViewIfNeeded();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${file} ${width}: overflow`);
 const controls=panel.locator('[data-signal-step]');
 for(let i=0;i<3;i++){await controls.nth(i).focus();await page.keyboard.press('Enter');assert.equal(await controls.nth(i).getAttribute('aria-pressed'),'true');assert.equal(await panel.locator('[data-signal-reading]:visible').count(),1);assert.equal(await panel.locator('[data-signal-reading]:visible').getAttribute('data-signal-reading'),String(i));}
 const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
 assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${engine} ${file} ${width}`);
 await panel.getByRole('button',{name:'Pause diagram motion',exact:true}).click();await page.waitForTimeout(100);const orbit=panel.locator('.signature-orbit');
 const frozen=await orbit.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(90);assert.equal(await orbit.evaluate(e=>getComputedStyle(e).transform),frozen);
 await panel.getByRole('button',{name:'Resume diagram motion',exact:true}).click();await page.waitForTimeout(70);const moving=await orbit.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(100);assert.notEqual(await orbit.evaluate(e=>getComputedStyle(e).transform),moving,'visible motion');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await orbit.evaluate(e=>getComputedStyle(e).animationName),'none');
 await panel.screenshot({path:`test-results/signature/panel-${engine}-${file.replaceAll('/','-')}-${width}.png`});
 await page.screenshot({path:`test-results/signature/${engine}-${file.replaceAll('/','-')}-${width}.png`,fullPage:true});
 await page.emulateMedia({reducedMotion:'no-preference'});

 evidence.push({engine,file,width,cls:initialCLS,domMs:await page.evaluate(()=>performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd)});
 }
 await page.locator('.cx-foot .cx-pulse-toggle,.site-footer .cx-pulse-toggle').click();assert.equal(await page.locator('.signature-orbit').evaluate(e=>getComputedStyle(e).animationName),'none','site pause applies');
 assert.deepEqual(errors,[],`${engine} ${file} script errors`);await context.close();
 }
 const still=await browser.newContext({javaScriptEnabled:false});const staticPage=await still.newPage();await staticPage.goto(base+'/ai/research.html');assert.equal(await staticPage.locator('.signature-orbit').evaluate(e=>getComputedStyle(e).animationPlayState),'paused','no JavaScript retains a still environment');assert.ok(await staticPage.locator('[data-signal-reading="0"]').isVisible());await still.close();
 }finally{await browser.close();}
 }
 fs.writeFileSync('test-results/signature/metrics.json',JSON.stringify(evidence,null,2));
 }finally{await new Promise(r=>server.close(r));}
});
