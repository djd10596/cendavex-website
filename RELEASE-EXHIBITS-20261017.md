# Cendavex decision exhibits — 2026-10-17

Baseline and rollback anchor: `abd6bc9ce5a3062e227d022db6eac6e1adb95b4b`.
Public corporate website only. Preserve the founder-approved cinematic entrances,
logo, division environments, mission, existing simulations and Academy.

Four new local exhibits extend the interior journeys:

- `/ai/products.html#decision-exhibit`: evidence present / missing; human review / clarification.
- `/systems/reliability.html#decision-exhibit`: recovery defined / undefined; review / escalation.
- `/industries/markets.html#decision-exhibit`: evidence assembled / validation incomplete; evaluation / discovery.
- `/financial/investing.html#decision-exhibit`: fictional exposure within / above a sample limit; educational review / mandate review.

Each exhibit exposes observe, evaluate and decision together. Native radio controls
support keyboard navigation. A polite status region announces the changed outcome;
normal and boundary copy use the native hidden attribute. An early-page link leads
to the exhibit and a contextual onward link leads to research or Academy.
Division accent materials continue the approved palette. Dashed decision rules
also distinguish boundary conditions without relying on color.

Every exhibit explicitly identifies fictional inputs and a local demonstration.
Research concepts remain unavailable commercially. Financial is an educational
illustration, not advice, a forecast or an account assessment; its paper-money
boundary remains explicit. No network, persistence, model, service, account or
order access is implemented by the exhibit script. No new dependencies or images.
Without JavaScript the normal explanation and onward journey remain readable,
with inactive controls hidden. There is no new animation or continuous work.

## Verification and release

Run `npm test` with the documented Chromium/WebKit host library environment in
`RELEASE-SIGNATURE-20261017.md`. New exhibit tests cover both engines at 1440,
390 and 320 widths, keyboard changes in both directions, mutually exclusive
explanations, announced outcomes, disclosures, local onward destinations,
automated WCAG checks, overflow, script errors and JavaScript-disabled fallback.
Screenshots: `test-results/exhibits/`.

Existing tests retain all 24 routes, mobile navigation, simulations, Academy,
motion controls, visible cinematic animation, reduced motion, static fallback,
automated accessibility and layout budgets. These are lab checks, not physical
Safari/iOS testing or field performance measurements.

Publish only after passing checks and fetching/reconciling origin/main. Use
`git push origin HEAD:main`; never force push. Verify exact ordinary and
cache-busted published HTML/CSS/JS with
`node scripts/verify-signature-release.cjs`. Run
`node scripts/verify-signature-live.cjs` with the browser environment to verify
all 24 live routes in Chromium and WebKit at desktop/mobile, including both
conditions on the four new exhibits. Evidence is under `test-results/`.

Rollback: fetch/reconcile main, `git revert <decision-exhibits-implementation-commit>`,
run applicable checks, then push normally. This preserves unrelated later releases.

## Local verified results

All 30 pre-existing test cases passed in the complete `npm test` run. The added
exhibit test initially failed because axe needed an explicit context, then because
a fallback locator matched both the entry and onward links. Both test-harness
issues were corrected. The final targeted exhibit rerun passed (24 browser/route/
viewport combinations plus eight static fallbacks). No application assertion failed.
The final source therefore has passing evidence for all 31 test cases across the
full run and targeted rerun; a second complete run was not performed.

All 76 interior checks passed; worst measured initial Chromium CLS was
0.011614. All 20 entrance motion combinations passed. Exhibit desktop/mobile
captures and a contact sheet were visually reviewed across both engines.
`node --check` for the added script, test and changed live verifier, and
`git diff --check` passed. Published byte and browser evidence are generated
separately after the fast-forward and recorded with the exact revision under
`test-results/signature-deployment.json` and `test-results/signature-live/report.json`.
