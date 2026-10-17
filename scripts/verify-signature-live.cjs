/* Read-only browser smoke of every published route; never follows customer links. */
const fs=require('node:fs');const cp=require('node:child_process');const {chromium,webkit}=require('playwright');
(async()=>{
 const routes=cp.execFileSync('git',['ls-files','*.html']).toString().trim().split('\n').map(f=>f==='index.html'?'/':f.endsWith('/index.html')?'/'+f.slice(0,-10):'/'+f);
 let exhibitChecks=0;
 const results=[];fs.mkdirSync('test-results/signature-live',{recursive:true});
 for(const [engine,type] of Object.entries({chromium,webkit})){
 const browser=await type.launch();try{
 for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();await page.route(/https:\/\/(?!cendavex\.com(?:\/|$))/,r=>r.abort());
 for(const route of routes){const errors=[];const listen=e=>errors.push(e.message);page.on('pageerror',listen);
 const response=await page.goto('https://cendavex.com'+route);if(!response.ok())throw new Error(`${route}: HTTP ${response.status()}`);
 await page.locator('h1').waitFor();await page.waitForFunction(()=>document.querySelector('.brand-lockup img')?.naturalWidth>0);
 if(await page.locator('.signature-panel').count()){
 const buttons=page.locator('[data-signal-step]');await buttons.nth(1).click();
 if(await buttons.nth(1).getAttribute('aria-pressed')!=='true')throw new Error(`${route}: explanation control`);
 if(await page.locator('[data-signal-reading]:visible').getAttribute('data-signal-reading')!=='1')throw new Error(`${route}: explanation output`);
 }else await page.locator('.cinema-environment.is-rendered').waitFor();
 if(await page.locator('.exhibit').count()){
 const exhibit=page.locator('.exhibit');await exhibit.getByRole('radio').last().check();
 if(await exhibit.locator('[data-exhibit-boundary]:visible').count()!==3 || !/Hold|Escalate|Return|Pause/.test(await exhibit.locator('[role=status]').innerText()))throw new Error(`${route}: exhibit boundary outcome`);
 await exhibit.getByRole('radio').first().check();
 if(await exhibit.locator('[data-exhibit-normal]:visible').count()!==3)throw new Error(`${route}: exhibit reset`);
 exhibitChecks++;
 }
 if(await page.locator('h1').count()!==1||!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw new Error(`${route}: heading or overflow`);
 if(errors.length)throw new Error(`${route}: ${errors.join('; ')}`);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:`test-results/signature-live/${engine}-${width}-${route.replaceAll('/','-')}.png`});
 results.push({engine,width,route,status:response.status()});page.off('pageerror',listen);
 }
 await context.close();
 }
 }finally{await browser.close();}
 }
 fs.writeFileSync('test-results/signature-live/report.json',JSON.stringify({verifiedAt:new Date().toISOString(),results},null,2));console.log(JSON.stringify({renderChecks:results.length,exhibitChecks,routes:routes.length,engines:['chromium','webkit'],passed:true}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
