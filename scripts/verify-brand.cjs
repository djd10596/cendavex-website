// Capture and verify the five public areas locally or after Pages publication.
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
 const base = process.env.BRAND_BASE || 'http://127.0.0.1:8765';
 const output = process.env.BRAND_EVIDENCE || '/tmp/cendavex-brand-visual';
 fs.mkdirSync(output,{recursive:true});
 const browser = await chromium.launch();
 try {
  for(const width of [1440,768,390]) for(const area of ['','ai','financial','systems','industries']) {
   const page = await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
   // Public customer destinations are inspected as links only; never navigated.
   await page.goto(`${base}/${area ? area+'/' : ''}`,{waitUntil:'networkidle'});
   assert.equal(await page.locator('.brand-name').innerText(),'CENDAVEX');
   assert.equal(await page.locator('.brand-subtitle').innerText(),area ? area.toUpperCase() : 'TECHNOLOGIES');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:path.join(output,`${area||'technologies'}-${width}.png`)});
   const menu=page.locator('.division-menu');
   if(width<761) await menu.locator('summary').click();
   assert.ok(await menu.locator('nav').isVisible());
   const localLinks=await menu.locator('a[href^="/"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
   for(const href of localLinks) assert.equal((await page.request.get(new URL(href,base).href)).status(),200,href);
   await page.locator('.division-switcher summary').click();
   const switcher=page.locator('.division-switcher nav');
   assert.ok(await switcher.isVisible());
   assert.deepEqual(await switcher.locator('a').evaluateAll(links=>links.map(a=>a.getAttribute('href'))),['/','/financial/','/ai/','/systems/','/industries/']);
   await switcher.locator('a[href="/ai/"]').click();
   assert.equal(await page.locator('.brand-subtitle').innerText(),'AI');
   await page.locator('.parent-return').click();
   assert.equal(await page.locator('.brand-subtitle').innerText(),'TECHNOLOGIES');
   console.log(`${base} ${area||'technologies'} ${width}: branding, menu links, switcher and parent return passed`);
   await page.close();
  }
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
