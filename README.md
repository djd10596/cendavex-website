# cendavex-website
Official website for Cendavex Technologies

October 12 brand release preserves the exact approved metallic-blue PNG and mission.
Shared CSS/JS, product introductions, process demonstration, and official-source
news snapshot accompany the responsive homepage and information pages. Headlines
refresh from the isolated official-feed cache every fifteen minutes and become visibly stale after 24 hours; a bundled snapshot remains available offline. No licensed quotes,
commercial article bodies, music demos, backend code or credentials are published.

Validated with Chromium at 1440, 820 and 390 widths (including links, news filters,
interactive demonstration and overflow), JavaScript syntax and source review.
Source/data composition and full evidence live in the isolated engineering
checkout's `docs/brand-rebuild-20261012.md`. Keep this repository's existing main
branch, GitHub Pages hosting and CNAME. Roll back with a Git revert of the brand
release commit and push that revert to main; retain subsequent unrelated changes.

Experience 2.0 makes four-profile intelligent investing the homepage flagship. Public composition figures reflect verified Cendavex mandates; exploring profiles never changes an account. Founding beta remains paper money and live customer investing is unavailable. Native cinematic motion respects reduced motion and includes a pause control. News renders only attributed public metadata and SEC filing-event links; customer-display market prices remain unavailable pending commercial licensing. Exact approved logo preserved.

October 17 corporate positioning candidate: see
[RELEASE-CORPORATE-20261017.md](RELEASE-CORPORATE-20261017.md) for source boundaries,
local browser verification, pending independent review, publication gates and
scoped rollback. The founder-approved mission in this candidate supersedes the
older marketing mission referenced above. No publication is implied by a local commit.

October 17 division architecture: corporate navigation starts at `/`; dedicated
sites start at `/ai/`, `/financial/`, `/systems/` and `/industries/`. Financial tools
are on Financial subpages. Existing HTML routes and original homepage Financial
bookmarks remain supported. See [release notes](RELEASE-DIVISIONS-20261017.md).
Run the existing browser suite with `npm test`; this host uses the established
`LD_LIBRARY_PATH=/tmp/cendavex-browser-libs/root/usr/lib/x86_64-linux-gnu` setup.

October 17 premium brand revision: shared CENDAVEX identity, approved emblem and
company saying across every area. See [brand release notes](RELEASE-BRAND-20261017.md).
Capture and check five-area navigation at desktop/tablet/mobile with
`node scripts/verify-brand.cjs`; `BRAND_BASE=https://cendavex.com` checks live Pages.

Experience 3.0 isolated candidate: see [implementation, preview, verification and app roadmap](EXPERIENCE-3.0.md). This candidate is committed locally for independent release review; it does not authorize publication or customer application changes.

October 17 signature interiors continue the published moving Intelligence Engine
across all 19 interior routes, with original division-specific vector environments,
local explanatory interactions and motion/accessibility controls. See
[signature release notes](RELEASE-SIGNATURE-20261017.md) for exact routes, the
Chromium/WebKit host setup, tests, verification and rollback procedure.

The Awakening adds `/vision/` and `/vision/presentation/` without replacing the homepage. Media is silent and loads only on user intent. Rebuild the public text/storyboard with `python3 scripts/build-vision.py`; render original 1280×720, 24fps H.264/WebM media with `node scripts/render-vision.cjs` (requires `python3 -m pip install --target node_modules/.vision-python imageio-ffmpeg`, Playwright Chromium and the documented browser libraries). For this Ubuntu host, run `bash scripts/setup-vision-media.sh` once for local WebKit codecs, then `bash scripts/vision-browser-env.sh node scripts/verify-vision.cjs` for Chromium/WebKit playback, accessibility, route, responsive and fallback checks. See `vision/cue-sheet.md` for the exact optional guitar soundtrack/voiceover plan; no audio license or recording is supplied or implied.
