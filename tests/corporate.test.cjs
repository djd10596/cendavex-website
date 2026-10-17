const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const root = path.resolve(__dirname, "..");
let server, browser, base;
const pages = ["index.html", "mission.html", "about.html", "divisions.html", ...["ai", "financial", "systems", "industries"].flatMap(d => require("node:fs").readdirSync(path.join(root,d)).filter(f=>f.endsWith(".html")).map(f=>`${d}/${f}`)), "features.html", "how-it-works.html", "roadmap.html", "brokerage-agnostic.html", "for-traders.html", "news.html"];
const mission =
  "To engineer intelligent technologies that solve meaningful problems, protect what matters, and expand what people and businesses can achieve.";
const supporting =
  "Through artificial intelligence, autonomous systems, and continuous innovation, we strive to turn complex challenges into reliable, accessible, and transformative solutions.";
before(async () => {
  server = http.createServer((req, res) => {
    let filename = path.resolve(
      root,
      "." +
        (req.url.split("?")[0] === "/" ? "/index.html" : req.url.split("?")[0]),
    );
    if (!filename.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, "index.html");
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404).end();
        return;
      }
      res.setHeader(
        "Content-Type",
        filename.endsWith(".js")
          ? "application/javascript"
          : filename.endsWith(".css")
            ? "text/css"
            : filename.endsWith(".png")
              ? "image/png"
              : "text/html",
      );
      res.end(data);
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true });
});
after(async () => {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
});
for (const file of pages) {
  test(`${file}: desktop/mobile layout, local links, content, keyboard and WCAG`, async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route("https://**/*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "",
      }),
    );
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("response", (response) => {
      if (response.status() >= 400) errors.push(response.url());
    });
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/${file}`);
      assert.equal(await page.locator("h1").count(), 1);
      const identity = page.locator('.brand-lockup');
      assert.equal(await identity.locator('.brand-name').innerText(), 'CENDAVEX');
      const division = file.startsWith('ai/') ? 'AI' : file.startsWith('systems/') ? 'SYSTEMS' : file.startsWith('industries/') ? 'INDUSTRIES' : file.startsWith('financial/') || ['features.html','how-it-works.html','roadmap.html','brokerage-agnostic.html','for-traders.html','news.html'].includes(file) ? 'FINANCIAL' : 'TECHNOLOGIES';
      assert.equal(await identity.locator('.brand-subtitle').innerText(), division);
      assert.equal(await identity.locator('img').getAttribute('src'), '/assets/cendavex-logo.png');
      assert.ok(await identity.locator('.brand-name').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 25));
      assert.ok(await identity.locator('img').evaluate(el => el.clientWidth >= 72 && el.clientWidth === el.clientHeight));
      assert.equal(await page.locator('.footer-brand-saying').innerText(), 'CENDAVEX — Intelligence That Never Stops Evolving.');
      assert.ok(await identity.evaluate(el => el.scrollWidth <= el.clientWidth));
      if(width <= 760) assert.ok(await page.locator('.brand-bar').evaluate(el => el.getBoundingClientRect().height < 220));
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}: horizontal overflow`,
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      assert.deepEqual(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
      );
    }
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))) {
      const response = await page.request.get(`${base}${href}`);
      assert.equal(response.status(), 200, href);
    }
    assert.equal(
      await page
        .locator('nav a[href="https://app.cendavex.com/login"]')
        .count(),
      1,
    );
    assert.equal(
      await page
        .locator('nav a[href="https://app.cendavex.com/get-started"]')
        .count(),
      1,
    );
    await page.goto(`${base}/${file}`);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to content");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"), "content");
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator("html")
        .evaluate((el) => getComputedStyle(el).scrollBehavior),
      "auto",
    );
    assert.equal(await page.locator('[style*="animation"]').count(), 0);
    if (file === "financial/investing.html") {
      assert.equal(await page.getByRole("region", { name: "Market Pulse", exact: true }).count(), 1);
      await page.getByLabel("Market availability and display status").click();
      assert.equal(await page.locator(".cx-provider-links a").count(), 6);
      assert.ok((await page.locator(".cx-pulse-info-panel").innerText()).includes("Moving quotes are off"));
      await page.getByLabel("Market availability and display status").click();
      await page.locator('[data-profile="aggressive"]').click();
      assert.equal(
        await page.locator("[data-profile-title]").textContent(),
        "Aggressive",
      );
      await page.locator('[data-profile="aggressive"]').press("Home");
      assert.equal(
        await page.locator("[data-profile-title]").textContent(),
        "Conservative",
      );
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page
        .getByRole("button", { name: "Pause visual motion", exact: true })
        .click();
      assert.equal(
        await page
          .locator("html")
          .evaluate((el) => el.classList.contains("cx-motion-paused")),
        true,
      );
      await page
        .getByRole("button", { name: "Resume visual motion", exact: true })
        .click();
      await page.emulateMedia({ reducedMotion: "reduce" });
    }

    if (["index.html", "mission.html", "about.html"].includes(file)) {
      assert.ok((await page.locator("main").innerText()).includes(mission));
      assert.ok((await page.locator("main").innerText()).includes(supporting));
    }
    if (file === "ai/products.html") {
      assert.equal(await page.locator(".research-grid article").count(), 6);
      assert.equal(
        await page
          .locator(".research-grid .status")
          .filter({ hasText: "Not commercially available" })
          .count(),
        6,
      );
    }
    assert.equal(await page.locator('nav [aria-current="page"]').count(), 1);
    await page.setViewportSize({width:390,height:900});
    await page.reload();
    const menu = page.locator('.division-menu');
    assert.equal(await menu.getAttribute('open'), null);
    await menu.locator('summary').press('Enter');
    assert.equal(await menu.locator('nav').isVisible(), true);
    await page.locator('.division-switcher summary').click();
    assert.equal(await page.locator('.division-switcher nav a').count(), 5);
    if (file === 'financial/academy.html' || file === 'financial/trading.html') {
      await page.locator('[data-demo="1"]').click();
      assert.equal(await page.locator('#demo-title').textContent(), 'Make the reasoning visible.');
      assert.equal(await page.locator('[data-demo="1"]').getAttribute('aria-pressed'), 'true');
    }
    if (file === 'financial/products.html') for (const product of ['academy','swing','studio']) {
      assert.equal(await page.locator(`a[href="https://app.cendavex.com/product-preview/#${product}"]`).count(),1);
    }
    if(file === 'index.html') {
      assert.equal(await page.locator('[data-investing], [data-market-pulse]').count(),0);
      assert.equal(await page.locator('.orbit-core img').getAttribute('src'), '/assets/cendavex-logo.png');
      assert.equal(await page.locator('.orbit-core strong').innerText(), 'CENDAVEX');
      assert.equal(await page.locator('h1').innerText(), "The Future Doesn't Build Itself.\nWe Engineer What's Next.");
      assert.equal(await page.locator('.engineering-orbit i').last().evaluate(el=>getComputedStyle(el).animationName), 'none');
    }
    assert.deepEqual(errors, []);
    if (process.env.SCREENSHOT_DIR) {
      fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
      for (const width of [1440, 768, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        await page
          .locator(":focus")
          .evaluateAll((elements) => elements.forEach((el) => el.blur()));
        await page.screenshot({
          path: path.join(process.env.SCREENSHOT_DIR, `${file}-${width}.png`),
          fullPage: true,
        });
      }
    }
    await context.close();
  });
}
test('legacy homepage bookmarks resolve to Financial experiences', async () => {
  const page = await browser.newPage();
  await page.route('https://**/*', route => route.fulfill({body:''}));
  for (const [hash,destination] of [['investing','/financial/investing.html'],['products','/financial/products.html'],['experience','/financial/academy.html#experience'],['market-pulse','/financial/#market-pulse']]) {
    await page.goto(`${base}/#${hash}`);
    await page.waitForURL(`${base}${destination}`);
    assert.equal(new URL(page.url()).pathname, destination.split('#')[0]);
  }
  await page.close();
});

test('Experience 3.0: simulations, motion, metadata, offline rendering and visual evidence', async () => {
  const page = await browser.newPage();
  const output = process.env.EXPERIENCE_EVIDENCE || '/tmp/cendavex-experience3';
  fs.mkdirSync(output, {recursive:true});
  await page.route('https://**/*', route => route.abort());
  for (const area of ['', 'ai', 'financial', 'systems', 'industries']) {
    const route = `/${area ? area+'/' : ''}`;
    await page.goto(base+route);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    assert.ok(description.length > 60);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://cendavex.com'+route);
    assert.equal((await page.request.get(base+'/assets/experience-social.png')).status(),200);
    const motion=page.getByRole('button',{name:'Pause experience motion',exact:true});
    await motion.click();
    assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('cx3-paused')),true);
    await page.getByRole('button',{name:'Resume experience motion',exact:true}).click();
    assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('cx3-paused')),false);
    const result=page.locator('.cx3-result');
    if(area === 'financial') {
      await page.locator('#cx3-loss').fill('40');
      await page.locator('#cx3-exposure').selectOption('0.75');
      assert.match(await result.innerText(), /−30.0%/);
      assert.match(await result.innerText(), /not a forecast/);
    } else {
      for(let i=0;i<3;i++) {
        const button=page.locator(`[data-scenario="${i}"]`);
        await button.focus();await page.keyboard.press('Enter');
        assert.equal(await button.getAttribute('aria-pressed'),'true');
        assert.equal(await page.locator('[data-scenario][aria-pressed="true"]').count(),1);
        assert.ok((await result.innerText()).length>60);
      }
    }
    if (area === 'ai') {
      await page.locator('#cx3-task').fill('delete a customer account');
      await page.getByRole('button', {name:'Evaluate local rules →'}).click();
      assert.match(await page.locator('[data-policy-result]').innerText(), /REQUIRE AUTHORIZATION/);
      await page.locator('#cx3-task').fill('analyze conflicting evidence');
      await page.getByRole('button', {name:'Evaluate local rules →'}).click();
      assert.match(await page.locator('[data-policy-result]').innerText(), /ESCALATE/);
      await page.locator('#cx3-task').fill('summarize a public document');
      await page.getByRole('button', {name:'Evaluate local rules →'}).click();
      assert.match(await page.locator('[data-policy-result]').innerText(), /DRAFT FOR REVIEW/);
    }
    if (area === 'systems') {
      await page.getByRole('button', {name:'Inject fault',exact:true}).click();
      assert.match(await page.locator('[data-supervisor-state]').innerText(), /Degraded/);
      const recover=page.getByRole('button', {name:'Attempt recovery',exact:true});
      await recover.click();await recover.click();
      assert.match(await page.locator('[data-supervisor-state]').innerText(), /Escalated · 2/);
      assert.equal(await recover.isDisabled(),true);
      await page.getByRole('button', {name:'Operator reset',exact:true}).click();
      assert.match(await page.locator('[data-supervisor-state]').innerText(), /Observing · 0/);
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.cx3-motion').isVisible(),false);
    assert.equal(await page.locator('.cx3-vector').first().evaluate(el=>getComputedStyle(el).animationName),'none');
    for(const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:1000});
      await page.goto(base+route);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await page.screenshot({path:path.join(output,`${area||'corporate'}-${width}.png`),fullPage:true});
    }
    await page.emulateMedia({reducedMotion:'no-preference'});
  }
  await page.close();
  const noJS=await browser.newContext({javaScriptEnabled:false, viewport:{width:390,height:900}});
  const fallback=await noJS.newPage();
  await fallback.goto(base+'/ai/');
  assert.ok(await fallback.locator('.division-menu nav').isVisible());
  await fallback.locator('.division-menu summary').click();
  assert.equal(await fallback.locator('.division-menu nav').isVisible(),false);
  await fallback.locator('.division-menu summary').click();
  assert.ok(await fallback.locator('.division-menu nav').isVisible());
  assert.ok((await fallback.locator('.cx3-result').innerText()).includes('ASSIST'));
  await noJS.close();
});
