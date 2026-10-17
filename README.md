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
