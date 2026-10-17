# Signature interiors — 2026-10-17

Continues `921d7839f1bd37f8b21b9fca171761b0c651f8c2`, preserving the approved five live geometric entrance scenes, approved logo, mission, tagline, navigation and prior contributions. Public website only. No application, customer data, account, trading service, broker permission or financial record was accessed or changed.

## Implementation and routes

Original luminous metallic-blue vector architecture extends the five entrances into all 19 existing interior routes, completing the visual system across the 24 public HTML routes. Interior environments are lightweight SVG/CSS, not additional canvas engines. Each route has its own editorial headline, coordinate identifier and three explanatory states. Keyboard-operable buttons update the visible explanation, pressed state and highlighted diagram node. These are explicitly educational local interactions with no live signals or connected systems.

- Corporate: `/about.html`, `/mission.html`, `/divisions.html` — intersecting purpose/engineering architecture.
- AI: `/ai/products.html`, `/ai/research.html` — coordination networks and evidence boundaries.
- Systems: `/systems/reliability.html`, `/systems/research.html` — layered control planes and operating limits.
- Industries: `/industries/markets.html`, `/industries/research.html` — application lattices and domain validation.
- Financial: `/financial/investing.html`, `/financial/trading.html`, `/financial/products.html`, `/financial/academy.html`, `/features.html`, `/how-it-works.html`, `/roadmap.html`, `/brokerage-agnostic.html`, `/for-traders.html`, `/news.html` — market contours, research discipline, risk and education.
- `/`, `/ai/`, `/financial/`, `/systems/`, `/industries/` retain their approved moving environments; their logo-link accessibility and shared script version are updated.

Headlines and compact blue accents establish the same hierarchy on desktop and mobile. SVG architecture has division-specific geometry, color and orbit motion. Animation stops offscreen, in hidden documents, under local pause, under the existing site-wide pause preference and under reduced motion. No JavaScript leaves a still diagram and readable first explanation, with interactive controls hidden. No new dependency or raster download; new shared CSS and JS total approximately 9 KB uncompressed.

Financial pages place the paper-money availability boundary beside the headline. Legacy Financial explanations appear before feature cards so their visual identity is visible early on mobile.

Financial profile controls, Market Pulse provider behavior, existing simulations, Academy content, disclosures and customer destinations remain in place. Quote surfaces reserve geometry during provider loading/failure/pause to prevent visible layout shifts. Speech-input accessible names now contain the actual visible wording of brand links and Market Pulse controls. Prospective divisions and concept status are retained and reinforced in explanations.

## Verification

`npm ci`; JavaScript syntax checks; `git diff --check`.

Full regression command on this host:

```sh
LD_LIBRARY_PATH=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/libproxy:/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu:/tmp/cendavex-browser-libs/root/usr/lib/x86_64-linux-gnu \
PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 LIBGL_ALWAYS_SOFTWARE=1 \
LIBGL_DRIVERS_PATH=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/dri \
__EGL_VENDOR_LIBRARY_FILENAMES=/tmp/cendavex-webkit-libs/root/usr/share/glvnd/egl_vendor.d/50_mesa.json \
GSETTINGS_SCHEMA_DIR=/tmp/cendavex-webkit-libs/root/usr/share/glib-2.0/schemas \
GIO_EXTRA_MODULES=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/gio/modules npm test
```

The pre-existing Chromium navigation/content/accessibility suite covers all 24 routes at 1440, 768, 390 and 320 widths. Existing suites cover Financial simulations, Academy behavior, provider fallback, legacy bookmarks, motion controls, storage denial, visible pixel changes, renderer budgets, reduced motion and no-JavaScript fallbacks. New interior checks cover both Chromium and WebKit on all 19 routes at 1440 and 390 widths: keyboard state changes, WCAG A/AA automated checks, no overflow, script errors, local pause/resume, visible transform changes, reduced motion, global pause and static fallback. Initial-load CLS is measured where supported, before interaction or synthetic media preference changes, with a <0.1 budget. WebKit does not expose LayoutShift on this host; its CLS is recorded as unavailable. These are local lab checks, not field Core Web Vitals or physical iOS Safari testing.

Screenshots and lab results: `test-results/signature/`. Local visual review covers desktop/mobile captures of every changed route. All 30 test cases have passing results across the full run and affected-suite reruns after correcting the WebKit host environment. All 76 interior browser/viewport checks passed, including automated WCAG A/AA checks. Worst measured Chromium initial CLS: 0.0213. Maximum local DOM readiness: 239.2 ms in Chromium, 111 ms in WebKit. All 20 entrance browser/viewport pixel checks passed, including stable paused/reduced frames, resumed visible motion, pointer/scroll response and bounded renderer work. The final affected Financial regression also passed all 11 routes at all four widths, after the mobile provider layout refinement. Desktop/mobile contact sheets for every interior route were inspected in both engines. See `docs/signature-validation.json` for the test inventory and measurements.

## Publication and rollback

Fetch origin and reconcile current main before a normal fast-forward `git push origin HEAD:main`. Never force push. The release verifier checks exact Git-object hashes for all public HTML and shared root CSS/JS, including the precise versioned resource URLs referenced by HTML, with ordinary and cache-busted requests:

```sh
node scripts/verify-signature-release.cjs
```

Results: `test-results/signature-deployment.json`. Then run `node scripts/verify-signature-live.cjs` with the same browser environment to inspect all 24 published routes in both engines at both viewport sizes. No publication is implied until verification succeeds. Roll back this batch with `git revert <signature-implementation-commit>` after fetching/reconciling main, run applicable checks, then push normally. The parent `921d783` is the approved pre-batch baseline; use a revert to preserve later contributions.
