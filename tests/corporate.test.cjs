const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const root = path.resolve(__dirname, "..");
let server, browser, base;
const pages = ["index.html", "mission.html", "about.html", "divisions.html"];
const mission =
  "To engineer intelligent technologies that solve meaningful problems, protect what matters, and expand what people and businesses can achieve.";
const supporting =
  "Through artificial intelligence, autonomous systems, and continuous innovation, we strive to turn complex challenges into reliable, accessible, and transformative solutions.";
before(async () => {
  server = http.createServer((req, res) => {
    const filename = path.resolve(
      root,
      "." +
        (req.url.split("?")[0] === "/" ? "/index.html" : req.url.split("?")[0]),
    );
    if (!filename.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
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
    if (file === "index.html") {
      await page.locator('[data-demo="1"]').click();
      assert.equal(
        await page.locator("#demo-title").textContent(),
        "Make the reasoning visible.",
      );
      assert.equal(
        await page.locator('[data-demo="1"]').getAttribute("aria-pressed"),
        "true",
      );
      await page.locator('[data-demo="0"]').click();
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
      for (const product of ["academy", "swing", "studio"]) {
        assert.equal(
          await page
            .locator(
              `a[href="https://app.cendavex.com/product-preview/#${product}"]`,
            )
            .count(),
          1,
        );
      }
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
      assert.equal(
        await page.locator("h1").innerText(),
        "The Future Doesn't Build Itself.\nWe Engineer What's Next.",
      );
      assert.equal(
        await page
          .locator(".engineering-orbit i")
          .last()
          .evaluate((el) => getComputedStyle(el).animationName),
        "none",
      );
    }
    if (["index.html", "mission.html", "about.html"].includes(file)) {
      assert.ok((await page.locator("main").innerText()).includes(mission));
      assert.ok((await page.locator("main").innerText()).includes(supporting));
    }
    if (file === "divisions.html") {
      assert.equal(await page.locator(".research-grid article").count(), 6);
      assert.equal(
        await page
          .locator(".research-grid .status")
          .filter({ hasText: "Not commercially available" })
          .count(),
        6,
      );
    }
    assert.deepEqual(errors, []);
    if (process.env.SCREENSHOT_DIR) {
      fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
      for (const width of [1440, 390]) {
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
