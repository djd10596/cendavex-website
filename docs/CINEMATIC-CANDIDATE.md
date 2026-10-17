# Cendavex cinematic candidate — founder review required

This is an independent checkout candidate. It has not been pushed or published.

## Preview

From the checkout root:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080/ and the `/ai/`, `/financial/`, `/systems/`, and `/industries/` entrances. The 24 existing routes and Financial account destinations remain available.

## Visual evidence

- `docs/cinematic-before-after.png`: side-by-side desktop and mobile comparison for all five entrances.
- `docs/cinematic/before/`: checkout baseline, before this rebuild; local rendering, not a live production capture.
- `docs/cinematic/after/`: corporate and all four divisions at **1440 × 900** and **390 × 844**; also `mid-scroll.png`.
- Captures use reduced motion and block remote services so the still-frame composition can be reviewed independently of animation or market widgets.

Run `node scripts/cinematic-review.cjs after` to regenerate candidate screenshots, original WebP fallback artwork, and the comparison sheet. The original before captures are preserved.

## Implementation

Original procedural Canvas artwork projects three-dimensional geometry, sorts metallic faces by depth, and layers neural links, atmospheric light, particles, receding floor points and data currents. Five distinct scenes use no graphics framework, licensed imagery or remote assets. Detailed geometry renders once to a cached surface; subsequent frames composite that surface with gentle structural drift, pointer parallax and animated currents. Drawing is capped at 25 fps and device pixel ratio 1.5. Offscreen and hidden scenes suspend work. Scene pause and the existing global motion preference both stop motion. Reduced motion renders one complete still frame. Locally generated WebP images retain the visual when JavaScript or Canvas is unavailable.

Scroll changes scene depth without trapping scrolling. Each entrance continues into its own research narrative. All existing product information, risk profiles, labs, disclosures, Academy links and navigation remain below the new entrance. Art is explicitly conceptual; Financial terrain is synthetic, not market data or a forecast. No account, balance, broker, customer-history or production operations were added.

## Verification

`npm ci && npm test`

The browser suite checks all 24 routes at 1440, 768, 390 and 320 pixels, local links, native menus, keyboard use, product/customer destinations, Academy demonstrations, risk profiles, disclosures, deterministic labs and automated axe WCAG A/AA checks through WCAG 2.2. Renderer tests exercise animation, keyboard pause/resume, offscreen suspension, stable reduced-motion frames, narrow screens and no-JavaScript image fallbacks on all five entrances.

- `docs/cinematic-tests.txt`: complete browser test output.
- `docs/cinematic-renderer-tests.txt`: focused renderer test output.
- `docs/cinematic-performance.json`: local Chromium first-contentful-paint, layout shift, long tasks and renderer timing measurements. These are lab measurements, not production field Core Web Vitals. Automated accessibility checks do not constitute a full manual WCAG certification.

Founder review of the actual desktop and mobile captures is required before any public publication. No deployment step is included.

Final validation: **27 tests passed, 0 failed**. Automated axe checks reported no violations across the 24 routes at four viewport widths. Local first-contentful-paint measured 176–248 ms; average renderer work including its initial detailed draw measured 2.0–6.4 ms per frame; measured layout shift remained below 0.1. The existing global motion control was also manually exercised against the visible scene and confirmed to suspend it. See the JSON for individual page measurements and the logs for the complete checks.
