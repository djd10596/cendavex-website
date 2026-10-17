const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium,webkit}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const root=path.resolve(__dirname,'..');
const routes=['ai/products.html','systems/reliability.html','industries/markets.html','financial/investing.html'];
test('decision exhibits: keyboard conditions, outcomes, disclosures, mobile, accessibility and static fallback in both engines',async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.join(root,req.url.split('?')[0]);
  fs.readFile(file,(error,data)=>{if(error)return res.writeHead(404).end();res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript'})[path.extname(file)]||'application/octet-stream');res.end(data);});
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 fs.mkdirSync('test-results/exhibits',{recursive:true});
 try{for(const [name,engine] of Object.entries({chromium,webkit})){
  const browser=await engine.launch();
  try{for(const route of routes){
   const interactive=await browser.newContext();const page=await interactive.newPage();await page.route('https://**/*',r=>r.abort());
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:1000});await page.goto(`http://127.0.0.1:${server.address().port}/${route}`);
    const exhibit=page.locator('.exhibit');await exhibit.scrollIntoViewIfNeeded();
    assert.match(await exhibit.locator('.exhibit-disclosure').innerText(),/Illustrative local demonstration/);
    assert.equal(await exhibit.locator('[data-exhibit-normal]:visible').count(),3);
    await exhibit.getByRole('radio').first().focus();await page.keyboard.press('ArrowRight');
    assert.equal(await exhibit.locator('[data-exhibit-boundary]:visible').count(),3);
    assert.equal(await exhibit.locator('[data-exhibit-normal]:visible').count(),0);
    assert.match(await exhibit.locator('[role=status]').innerText(),/Hold|Escalate|Return|Pause/);
    assert.equal(await exhibit.getByRole('radio').last().isChecked(),true);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${name} ${route} ${width} overflow`);
    const violations=(await new AxeBuilder({page}).include('.exhibit').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>v.id),[]);
    await exhibit.screenshot({path:`test-results/exhibits/${name}-${route.replaceAll('/','-')}-${width}.png`});
    await page.keyboard.press('ArrowLeft');assert.equal(await exhibit.locator('[data-exhibit-normal]:visible').count(),3);
    const next=await exhibit.locator('.exhibit-next').getAttribute('href');assert.ok(fs.existsSync(path.join(root,next)));
   }
   assert.deepEqual(errors,[]);await interactive.close();
   const context=await browser.newContext({javaScriptEnabled:false});const still=await context.newPage();
   await still.goto(`http://127.0.0.1:${server.address().port}/${route}`);
   assert.equal(await still.locator('.exhibit-console').isVisible(),false);
   assert.equal(await still.locator('[data-exhibit-normal]:visible').count(),3);
   assert.equal(await still.locator('.exhibit .exhibit-next').isVisible(),true);await context.close();
  }}finally{await browser.close();}
 }}finally{await new Promise(resolve=>server.close(resolve));}
});
