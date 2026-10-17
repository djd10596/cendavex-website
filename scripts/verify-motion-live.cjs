/* Check the published experience through actual browser-rendered screen pixels. */
const fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
const {chromium,webkit}=require('playwright'),{PNG}=require('pngjs');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function pixels(a,b){a=PNG.sync.read(a);b=PNG.sync.read(b);if(a.width!==b.width||a.height!==b.height)throw new Error('Screen dimensions changed');let changed=0;for(let i=0;i<a.data.length;i+=4){let d=0;for(let j=0;j<3;j++)d+=Math.abs(a.data[i+j]-b.data[i+j]);if(d/3>10)changed++;}return changed*100/(a.width*a.height);}
(async()=>{
 const revision=process.env.PUBLISHED_REVISION||cp.execFileSync('git',['rev-parse','HEAD']).toString().trim();
 const expected=hash(cp.execFileSync('git',['show',`${revision}:cinematic.js`]));
 const output='test-results/motion-live';fs.mkdirSync(output,{recursive:true});const results=[];
 for(const [engine,type]of Object.entries({chromium,webkit})){
  const browser=await type.launch();try{for(const mobile of [false,true])for(const area of ['','ai','financial','systems','industries']){
   const label=`${engine}-${mobile?'mobile':'desktop'}-${area||'corporate'}`;
   const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:900},reducedMotion:'no-preference'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   // Third-party feeds are outside this website-only motion verification.
   await page.route(/https:\/\/(?!cendavex\.com(?:\/|$))/,r=>r.abort());
   const loaded=page.waitForResponse(r=>new URL(r.url()).pathname==='/cinematic.js');
   const response=await page.goto(`https://cendavex.com/${area?area+'/':''}`);
   if(response.status()!==200)throw new Error(`${label}: page HTTP ${response.status()}`);
   const script=await loaded;if(hash(await script.body())!==expected)throw new Error(`${label}: stale deployed renderer`);
   await page.waitForSelector('.is-rendered');await page.waitForTimeout(400);
   const c=page.locator('canvas[data-world]'),box=await c.boundingBox();
   const clip=mobile?{x:35,y:box.y+140,width:320,height:150}:{x:600,y:box.y+130,width:600,height:300};
   const a=await page.screenshot({clip});await page.waitForTimeout(2200);const b=await page.screenshot({clip});
   fs.writeFileSync(`${output}/${label}-a.png`,a);fs.writeFileSync(`${output}/${label}-b.png`,b);
   const movement=pixels(a,b);if(movement<=4)throw new Error(`${label}: insufficient visible movement ${movement}%`);
   await page.getByRole('button',{name:'Pause scene',exact:true}).click();await page.waitForTimeout(100);const paused=await page.screenshot({clip});await page.waitForTimeout(500);if(pixels(paused,await page.screenshot({clip}))!==0)throw new Error(`${label}: pause unstable`);
   await page.getByRole('button',{name:'Resume scene',exact:true}).click();await page.waitForTimeout(700);const resumed=pixels(paused,await page.screenshot({clip}));if(resumed<=2)throw new Error(`${label}: resume lacks movement`);
   if(errors.length)throw new Error(`${label}: ${errors.join('; ')}`);
   results.push({label,url:page.url(),movementPercent:movement,resumePercent:resumed,rendererSha256:expected,scriptUrl:script.url(),browserVersion:browser.version()});
   console.log(label,`${movement.toFixed(2)}% changed`);await page.close();
  }}finally{await browser.close();}
 }
 fs.writeFileSync(`${output}/results.json`,JSON.stringify({publishedRevision:revision,verifiedAt:new Date().toISOString(),results},null,2));console.log(`Verified ${results.length} published browser/viewport/page cases at ${revision}`);
})().catch(e=>{console.error(e.message);process.exitCode=1;});
