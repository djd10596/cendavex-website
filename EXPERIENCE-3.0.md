# Cendavex Technologies — Experience 3.0 candidate

This is an isolated website candidate on `experience3-experience3-20261017-121302`. Independent release review is required before publication. No push, hosting configuration, DNS, customer application routing, accounts, trading configuration, or production deployment is part of this change.

## Implemented identity

The approved PNG emblem is retained byte-for-byte. The founder-approved corporate headline, mission, four divisions and company saying remain. `experience.css` supplies the shared metallic-blue palette, typography, luminous surfaces, responsive composition, focus treatment, native vector scenes and motion. `experience.js` provides local deterministic demonstrations and a motion control. All 24 public HTML routes receive the shared styling and canonical/Open Graph metadata; the social card is a local 1200 × 630 PNG rendered with `scripts/render-social.cjs` from the approved emblem and native HTML.

The corporate homepage surrounds the approved identity with a connected intelligence mesh and links the four directions through a cinematic editorial layout. AI uses a neural graph, Systems a layered control architecture, Industries a connected application network, and Financial synthetic signal traces. Graphics are decorative and explicitly conceptual or synthetic. No AI service, real monitoring, market feed or deployed industrial capability is implied by these scenes.

The interactive labs demonstrate an engineering review loop, deterministic task routing, bounded fault escalation, hypothetical industry workflows and synthetic portfolio-loss arithmetic. The Financial scenario does not replace or reinterpret the four existing mandates. It assumes cash unchanged and equities declining, omits fees, taxes, interest and correlations, and explicitly disclaims forecasts or advice. Research divisions retain their availability disclosures. Financial Market Pulse, approved profiles, education, process demonstrations, customer destination links and risk text remain in place.

## Preview and verification

```sh
npm ci
python3 -m http.server 8765 --bind 127.0.0.1
# In a second terminal on this host:
LD_LIBRARY_PATH=/tmp/cendavex-browser-libs/root/usr/lib/x86_64-linux-gnu npm test
```

Generate the committed visual overview with `node scripts/preview-experience.cjs`. The renderer starts its own temporary loopback server, blocks external services, and captures desktop and mobile views in `docs/experience3-preview.png`.

Open `http://127.0.0.1:8765/`, `/ai/`, `/financial/`, `/systems/` and `/industries/`. This server is local; it is not a deployment. Standard hosts with Chromium dependencies do not need the library-path prefix. The browser version is pinned through the existing lockfile; `npx playwright install chromium` installs it when absent.

The suite checks all public routes at 1440, 768, 390 and 320 CSS pixels, local navigation destinations, division identity, native mobile menus, skip links, keyboard interactions, reduced motion and axe WCAG A/AA rules. Financial regressions cover profile selection and keyboard behavior, process demonstrations, Market Pulse disclosures, product-preview links, legacy bookmarks and existing motion controls. New coverage exercises each lab, financial arithmetic, pause/resume, metadata, no-JavaScript fallbacks and offline rendering with external requests blocked. Screenshots of all five homepages at all four widths are saved under `/tmp/cendavex-experience3` (override `EXPERIENCE_EVIDENCE`). Automated accessibility checks are complemented by rendered screenshot inspection; they are not a certification.

The TradingView provider is stubbed/blocked during repeatable regression testing. This verifies graceful local behavior and provider links, not live provider content, quote freshness or external customer destinations. Public customer URLs are inspected as links only.

## App identity extension roadmap

1. **Inventory and contracts.** In a separate app checkout, map authenticated screens, route ownership, authorization boundaries, current design tokens and accessibility baselines. Record screenshots of login, onboarding, dashboard, portfolio and account settings with synthetic fixtures. Confirm that public research language cannot become an implied app capability.
2. **Tokens and primitives.** Port palette, type scale, spacing, border, focus and surface tokens into the app's existing styling system. Build Storybook or equivalent isolated previews of buttons, cards, dialogs, menus and status indicators. Preserve semantic color for losses, warnings and errors; luminous blue remains decorative. Use fixtures only.
3. **Accessible application shell.** Prototype the approved emblem and company saying, responsive navigation, skip links and keyboard focus in an isolated component environment. Keep every existing route, deep link, session boundary and division context unchanged. Review small screens, zoom, forced colors and screen-reader announcements.
4. **Purposeful data presentation.** Adapt restrained native vector patterns for empty states and onboarding. Keep account balances and market data authoritative and text-readable. Label freshness and simulations. Decorative charts must never resemble live account performance; use motion only when it explains state, and obey system reduced motion and user pause preferences.
5. **Verification and review.** Validate component, end-to-end, accessibility and visual regressions using synthetic accounts. Measure interaction latency and rendering on low-end mobile devices. Independently review Financial disclosures, security boundaries, semantics and customer comprehension before any rollout proposal.
6. **Controlled release, separately authorized.** Prepare a feature flag, staged rollout, monitoring and rollback plan in the application repository. Obtain independent release approval before changing customer traffic. This website commit creates no app routes, redirects, flags or deployment artifacts.

## Review and rollback

Review `git show --stat` for the exact changed-file manifest. Changes are confined to public HTML, the new experience CSS/JS, the local share image and its renderer, browser regressions, and documentation. Existing `brand.js`, approved emblem, CNAME, package lock and Financial control markup are preserved. Rollback is a normal revert of the Experience 3.0 commit after review; do not reset unrelated work or force-push.
