# Intelligence Engine motion repair — 2026-10-17

The approved five-entrance composition, blue metallic engine, identity, four divisions, page copy, Financial demonstrations, navigation and customer URLs are preserved. HTML changes only version the changed JavaScript/CSS URLs. No customer application, account, simulation service or broker was accessed or changed.

## Cause and repair

The old renderer painted the complete object into an image once and then rotated that image by at most 0.003 radians. Its tiny particles moved independently of their current paths. The reduced-motion media query hid the scene button; a saved global pause could stop the scene while its button still said “Pause scene.”

The engine now projects and depth-sorts live 3D geometry every frame. Its core and shell precess independently; Financial surfaces and Systems layers deform. Packets follow cubic data-current paths, particles orbit in depth, and core/surface lighting changes over time. Pointer coordinates are relative to the hero and smoothed. Scroll changes the geometry’s camera tilt instead of moving a cached picture.

Only the stationary sky/floor is cached. A buffer presents each newly drawn scene as one canvas update. Rotation matrices are calculated once per frame; hidden torus faces are culled. Desktop motion is capped at 30 fps, mobile at 24 fps, with bounded pixel density. Sustained expensive frames select a lighter mesh and lower backing resolution for the page session. Hidden documents and offscreen scenes suspend rendering; elapsed time is capped on resume.

## Controls and accessibility

- The scene button and visible status remain available with reduced motion.
- A system reduced-motion request produces a still frame. “Enable scene motion” is an explicit, scene-only opt-in for this page visit. It does not enable moving market quotes or change the system preference.
- Returning to reduced motion revokes the opt-in. Preference state is checked at frame boundaries as well as through media-query events.
- Scene pause freezes the current image and blocks pointer/scroll response. Resume restores movement.
- Global pause retains the existing `cendavexMotionPaused` preference. The scene explains a saved pause, and its Resume button uses the existing global controller to clear it. The controller can clear a saved pause even with reduced motion; that alone does not override reduced motion.
- Storage denial is handled without preventing scene controls. Media-query listeners include the legacy API fallback. The existing still images remain available without JavaScript or a canvas context.

## Verification

Run `npm ci` and `npm test`. Tests run sequentially to avoid confusing concurrent browser CPU contention with renderer performance.

`tests/motion-visual.test.cjs` checks all five entrances at desktop 1440×900 and mobile 390×844 in Chromium and Playwright WebKit. It saves actual screen crops in the main graphic at least 2.2 seconds apart, decodes PNG pixels, and requires more than 4% of pixels to change by more than 10 RGB levels. It also requires a stable paused screen after 2.1 seconds, visible movement after resume, reduced-motion stillness and explicit opt-in. Deterministic equal-time canvas comparisons isolate pointer and scroll effects from normal animation. Offscreen suspension, saved pause and recovery are checked on every case. Timing statistics from those deterministic comparisons are synthetic and must not be used as performance measurements.

`tests/motion-controls.test.cjs` separately checks initial reduced motion, temporary opt-in, cross-page global pause, blocked storage, and real-time frame budget. Visibility-handler tests use synthetic `document.hidden` transitions; they do not replace physical browser tab/background testing.

The complete existing regression suite checks every HTML page at 1440, 768, 390 and 320 pixels, local navigation, customer URLs, keyboard controls, WCAG checks, Financial interactions, legacy bookmarks and still-image fallbacks. A separate source comparison against `4f5fe77` confirms all 24 HTML documents are identical after normalizing only changed asset URLs.

### Safari coverage limits

Playwright WebKit is Linux WebKit, not macOS Safari or iOS hardware. This host uses software rendering and its throughput is lower than Chromium. Native Safari/iOS display smoothness, battery usage and physical tab suspension remain unverified. Runtime setup required WebKit build 2370, the existing extracted browser libraries, the extracted GSettings schemas, and appending the library path in the downloaded MiniBrowser launch wrappers. These are host test setup changes, not website changes.

## Publication verification

Only publish after the full suite passes. Commit the tested source, fetch current `origin/main`, require it to be an ancestor of the candidate, and use ordinary `git push origin HEAD:main`. Never force push.

`scripts/verify-motion-release.cjs` compares all 24 published HTML documents and all three changed runtime assets byte-for-byte with an exact Git revision, using both ordinary/versioned URLs and cache-busting verification URLs. It also requires GitHub main to match the expected revision. It writes the exact published revision and SHA-256 evidence to `test-results/motion-deployment.json`. Run live screen-frame checks after publication; any failed verification must be reported without claiming a verified release.

`scripts/verify-motion-live.cjs` loads the ordinary published URLs in both engines at desktop/mobile sizes, hashes the JavaScript actually received by each browser, and measures screen movement, pause and resume for all five entrances. It records screenshots and the exact published revision in `test-results/motion-live/`.

## Completed local gate

Full suite: **29 passed, 0 failed**, including all 20 browser/viewport/entrance motion cases. Motion and input comparisons use the main graphic region. Screen frames are at least 2.2 seconds apart. Pause, resume, reduced motion, explicit opt-in, preference transitions, offscreen suspension and saved-pause recovery passed in every case. Shared controls also passed storage-denial, legacy media-query and synthetic visibility checks.

[Full test output](motion-hotfix/full-tests.txt), [pixel results](motion-hotfix/results.json), [real-time controls/performance](motion-hotfix/controls.json), and [source hashes](motion-hotfix/verification-manifest.json). Paired screen images and input-comparison images are in the same folder.

| Browser / viewport / entrance | Moving pixels | Pointer pixels | Scroll pixels | Lab fps during screen capture |
|---|---:|---:|---:|---:|
| chromium-desktop-corporate | 48.14% | 38.54% | 47.67% | 21.8 |
| chromium-desktop-ai | 31.49% | 29.45% | 33.65% | 22.4 |
| chromium-desktop-financial | 46.36% | 23.99% | 44.65% | 22.7 |
| chromium-desktop-systems | 33.68% | 25.42% | 32.42% | 22.3 |
| chromium-desktop-industries | 37.95% | 34.22% | 38.26% | 22.2 |
| chromium-mobile-corporate | 46.88% | 40.64% | 50.53% | 20.2 |
| chromium-mobile-ai | 25.86% | 25.60% | 31.01% | 19.7 |
| chromium-mobile-financial | 49.40% | 33.34% | 50.36% | 20.1 |
| chromium-mobile-systems | 38.30% | 30.20% | 36.72% | 20.2 |
| chromium-mobile-industries | 35.39% | 34.58% | 40.99% | 20.2 |
| webkit-desktop-corporate | 45.19% | 38.87% | 47.52% | 11.0 |
| webkit-desktop-ai | 22.87% | 29.16% | 33.55% | 11.4 |
| webkit-desktop-financial | 47.40% | 20.04% | 44.90% | 10.2 |
| webkit-desktop-systems | 31.65% | 25.63% | 32.36% | 10.7 |
| webkit-desktop-industries | 34.42% | 34.18% | 38.24% | 8.4 |
| webkit-mobile-corporate | 45.72% | 40.81% | 50.43% | 14.4 |
| webkit-mobile-ai | 25.92% | 25.68% | 31.07% | 18.6 |
| webkit-mobile-financial | 51.85% | 33.33% | 50.32% | 14.4 |
| webkit-mobile-systems | 38.89% | 30.35% | 36.83% | 22.2 |
| webkit-mobile-industries | 35.56% | 34.61% | 41.01% | 21.0 |

Chromium runs around 20–23 fps in these captures. Linux software WebKit desktop throughput is lower; this is an explicit performance verification limit for native Safari/iOS, not a claim of native-device smoothness.
