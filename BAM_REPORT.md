# BAM REPORT — THE AWAKENING

Implementation commit: **`4ab1dbd0053b2e7dc584c156a9a2a40baedf87ae`**. This exact commit contains the finished source, playable media and local validation evidence. Later report-only commits record publication evidence without changing the experience.

## Delivered experience

- `/vision/`: original ten-scene, silent company vision film; native controls, English captions, transcript, responsive posters, explicit Play loading, download and four division links.
- `/vision/presentation/`: coordinated ten-act public founder exhibit with transitions, keyboard navigation, act deep links and speaker notes.
- Approved homepage preserved exactly except for one Vision Film navigation link. Existing shared CSS/JS and disclosures remain unchanged.
- No private investor materials, funding amounts, investor terms or personal discussions were added. All new content is public corporate vision. Six independent agents are explicitly conceptual; prospective divisions and paper-money beta boundaries remain visible.

## Actual delivered media

| File | Duration | Bytes |
| --- | --- | ---: |
| `assets/vision-film.mp4` | 00:01:24.00 | 11,922,897 |
| `assets/hero-loop.mp4` | 00:00:08.00 | 1,268,967 |
| `assets/vision-film.webm` | 00:01:24.00 | 1,153,587 |
| `assets/hero-loop.webm` | 00:00:08.00 | 92,357 |

MP4: H.264 High, yuv420p, 1280×720, 24fps, faststart. WebM: VP9, 640×360, 24fps, compact fallback editions. All four streams decode completely without errors. Neither edition has an audio stream. The loop is seamless by construction; measured endpoint mean pixel difference is 0.141/255.

Artwork: `assets/vision-poster.webp` (1280×720), `assets/vision-poster-small.webp` (640×360), `assets/hero-loop-poster.webp` (1280×720), and a 108×108 optimized derivative of the unchanged approved logo. Original visuals are procedural 3D projections authored in the checkout. No stock footage, external audiovisual assets or music were used.

**Silent edition:** no music or voiceover recording is included. `vision/cue-sheet.md` supplies exact ten-act timecodes, voiceover text and real-guitar instrumental directions. A commissioned recording with appropriate rights is a future production step, not an existing soundtrack.

## Validation

31 existing test cases have passing results across the initial run and necessary repaired-environment/isolated reruns. The first run passed 27 cases before the WebKit library setup failed. Correcting the documented host environment allowed the remaining dual-engine suites to run. A competing-browser timing failure was rerun in isolation and passed without changing its thresholds: Chromium 22.02fps / 17.86ms average render work; WebKit 12.10fps / 10.07ms. All 76 existing interior checks and 20 moving-scene browser/viewport combinations passed. Details: `docs/vision/regression-validation.json`.

New experience checks passed in Chromium and WebKit at 1440, 390 and 320px: actual H.264 playback, seeking into the closing act, forced WebM playback, native poster/no-JavaScript fallback, transcript, media-error recovery, keyboard/button presentation navigation, and zero axe violations on both new pages. Every public HTML route (26 total) loaded successfully in both engines; 742 local link/asset references resolved. The homepage has no added video element and fits at 320px. Evidence: `docs/vision/validation.json` and desktop/mobile screenshots.

Sources are assigned only after Play because WebKit can sniff even `preload="none"`. Both engines verified zero video requests before intent. Final initial resource transfers: 65,357–75,275 bytes; local FCP: 128–277ms. These are localhost lab measurements, not field Core Web Vitals or throttled mobile results. `loading-validation.json` supersedes the earlier logo-heavy loading measurements in `validation.json`.

Local commands: `npm test`; affected suites via `bash scripts/vision-browser-env.sh node --test --test-concurrency=1 ...`; isolated `tests/motion-controls.test.cjs`; `scripts/verify-vision.cjs`; `scripts/verify-vision-loading.cjs`; `python3 scripts/verify-vision-media.py`. WebKit media plugins were extracted under ignored `node_modules`, without installing system packages. Setup and reproducible rendering instructions are in `vision/PRODUCTION.md`.

## Publication

Publication pending. No live URL is claimed until deployment byte hashes and browser delivery are verified.

## Remaining production limitations

- Silent film; no recorded guitar score or voiceover is supplied.
- 720p H.264 delivery master and 360p WebM fallback; no 4K master.
- Conceptual visuals illustrate a company vision, not operating agents or deployed future products.
- Browser emulation and Linux WebKit are tested; physical iOS devices, assistive-technology user testing and field network performance are not represented as completed.

## Suggested creative refinements

Commission an original real-guitar score and voice performance using the cue sheet. Develop a higher-resolution master with more scene-specific lighting, typography choreography and a larger final identity composition. Conduct a founder-led creative screening and physical-device/accessibility review before a scored campaign edition.
