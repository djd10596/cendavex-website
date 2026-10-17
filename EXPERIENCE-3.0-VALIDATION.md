# Experience 3.0 — verification record

Baseline: `58eba8e5ae3ea444cc34d9869330ed74696c3b7b`.
Branch: `experience3-experience3-20261017-121302`.
Scope: local website candidate, awaiting independent release review.

## Changed files

- `EXPERIENCE-3.0-VALIDATION.md`
- `EXPERIENCE-3.0.md`
- `README.md`
- `about.html`
- `ai/index.html`
- `ai/products.html`
- `ai/research.html`
- `assets/experience-social.png`
- `brokerage-agnostic.html`
- `divisions.html`
- `docs/experience3-preview.png`
- `docs/experience3-test-results.txt`
- `experience.css`
- `experience.js`
- `features.html`
- `financial/academy.html`
- `financial/index.html`
- `financial/investing.html`
- `financial/products.html`
- `financial/trading.html`
- `for-traders.html`
- `how-it-works.html`
- `index.html`
- `industries/index.html`
- `industries/markets.html`
- `industries/research.html`
- `mission.html`
- `news.html`
- `roadmap.html`
- `scripts/preview-experience.cjs`
- `scripts/render-social.cjs`
- `systems/index.html`
- `systems/reliability.html`
- `systems/research.html`
- `tests/corporate.test.cjs`

## Evidence

- Chromium / Playwright: all 24 public routes exercised at 1440, 768, 390 and 320 pixels, with axe WCAG A/AA checks at each width.
- Financial regressions: original profiles, keyboard profile selection, public Market Pulse controls/disclosures, product links, process demonstrations, legacy bookmarks and motion preferences.
- New demonstrations: all scenario buttons via keyboard, synthetic-loss arithmetic, text-policy routing, bounded recovery exhaustion and reset, motion pause/resume, reduced-motion rendering, canonical/social metadata, blocked external services and native navigation with JavaScript disabled.
- Screenshot review: all five homepages inspected on desktop and mobile, including full-page renders. `docs/experience3-preview.png` contains the review overview. Full-page captures at four widths are generated in `/tmp/cendavex-experience3` by the test suite. The 1200 × 630 social card was rendered and visually inspected separately.
- Defect repaired: transformed corporate orbital planes extended beyond the viewport at desktop and 320/390 widths. Their bounds are now contained; every tested width has no horizontal page overflow.
- Test corrections: an arbitrary result-length assertion was replaced with a suitable minimum; the JavaScript-disabled navigation test now accounts for the native menu being initially open. These were harness assumptions, not suppressed accessibility failures.
- Preservation audit: every original anchor destination and count remains across the 24 HTML routes. Approved logo, `brand.js`, `CNAME`, lockfile and `division-navigation.js` match the baseline byte-for-byte.
- Approved logo SHA-256: `a6e02d8ada7ad0b403e9346c3bd0d53245bb992b600c484f8c4f971ca3b24830`.
- Syntax checks: `experience.js`, `scripts/render-social.cjs` and `scripts/preview-experience.cjs`.
- Whitespace check: `git diff --check`.

Final suite result: **26 tests passed, 0 failures**, including 96 route/viewport accessibility and layout checks. Duration: 181.14 seconds. Full clean-run transcript: [browser test results](docs/experience3-test-results.txt).

## Reproduce

See [implementation and preview instructions](EXPERIENCE-3.0.md). The final suite is `LD_LIBRARY_PATH=/tmp/cendavex-browser-libs/root/usr/lib/x86_64-linux-gnu npm test` on this host. The library prefix is environment-specific. All provider requests are stubbed or blocked during regression checks; this does not validate external quote freshness, external application pages or real customer behavior.

No production publication, remote push, account change or app route change was performed. Independent release review remains outstanding.
