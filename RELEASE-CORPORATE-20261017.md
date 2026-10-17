# Corporate positioning candidate — 2026-10-17

Status: local candidate only; independent review and publication pending.

## Source and boundaries

Corporate repository: `git@github.com:djd10596/cendavex-website.git`.
The original local checkout is `/home/djd10596/cendavex-website`; its local
main was stale. Fetching origin established baseline `7a8e380` (the candidate
includes its history). The public `https://cendavex.com` homepage was read only
and its SHA-256 exactly matched that baseline's index.html:
`9552823b0863279a75c99829a5e25b963ad7d36d845ca35d5f79f4c0d65d3c2d`.
CNAME is `cendavex.com`, public response server is GitHub.com, and existing
repository instructions identify main / GitHub Pages publication. Actual Pages
settings, deployment workflow, release ownership and publication acceptance
have NOT been independently verified. Pushing main could publish immediately.
Do not push as an incidental source synchronization step.

Customer `app.cendavex.com` is a separate nginx upstream to 127.0.0.1:8000,
with internal-route denial. This change does not modify nginx, backend code,
customer application source, customer storage, runtime configuration, or services.
The engineering lane baseline is `d14c0c3`; it is a different repository.

## Candidate behavior

Homepage, Mission and About now present the Technologies parent direction,
using the exact founder-approved headline, positioning, mission and supporting
mission. Divisions & Research explicitly distinguishes existing Financial
development from prospective AI, Systems and Industries divisions. Six AI
product concepts are labeled unavailable research hypotheses.

The exact approved PNG, CNAME, shared brand scripts/styles, news page and all
other existing Financial pages are unchanged. The homepage retains the existing
investing profile selector, product-preview destinations and process demo.
Navigation retains customer login/signup, Products, Investing, Technology
(How It Works), Mission, News and Financial information links. Existing CSP and
contact destination are retained. No new product/backend/broker integration is
introduced. Corporate pages use an additional stylesheet, responsive navigation,
keyboard skip links, reduced-motion support and the existing motion pause control.

## Reproduce verification

Use Node 22.12+:

```
npm ci --ignore-scripts
npx playwright install chromium
# If host libraries are absent, install dependencies in the isolated QA environment.
npm test
```

The committed browser suite serves only local static files and mocks all HTTPS
requests. It checks four pages at 1440, 768, 390 and 320 pixels, automated WCAG
2 A/AA, 2.1 AA and 2.2 AA rules, local link resolution, exact mission text,
heading count, overflow, keyboard skip, reduced motion, pause/resume, research
labels, product links, profile selection keyboard behavior and process demo.
Mocks do not establish third-party widget health, preview authentication,
production API health or full manual accessibility conformance.

## Independent release gate and rollback

1. Independent reviewer checks the exact candidate diff against `7a8e380`,
   confirms approved wording, claims and preserved customer/Financial journeys,
   reruns browser tests and examines desktop/mobile screenshots. Record identity,
   exact reviewed commit and actual result; none is supplied by this document.
2. Release owner verifies GitHub repository, Pages source/workflow and custom
   domain; obtains current origin main and production artifact; checks for newer
   concurrent work. Rebase and review/test conflicts rather than overwrite.
3. Prepare the exact candidate artifact, changed-file hashes and a scoped revert
   of the positioning commit. Save the prior deployed artifact and verify a
   staging/preview rollback before publication. Exclude test dependencies from
   the published artifact. Keep customer app routes, integrations and ingress
   untouched; no customer-service transfer or write fence is part of this release.
4. Publish only through the verified corporate procedure after independent
   acceptance. Confirm deployment identity, domain, wording, navigation, CSP,
   mobile rendering and existing Financial journeys on the deployed artifact.
5. On failure, revert only the positioning commit through that same verified
   procedure, preserving later unrelated changes; validate the restored artifact
   and Financial/customer navigation. Do not reset shared main or change app
   services. No production release or rollback rehearsal has occurred in this lane.

## Recorded local result

Final `npm test`: 4 tests passed, 0 failed (16 page/viewport accessibility
scans with zero reported rule violations); 38,196.735107 ms. Automated checks
are supplemented by inspection of the captured homepage desktop/mobile images.
Existing engineering-repository customer web suite: 33 passed, 0 failed.
Both JavaScript syntax checks and candidate diff whitespace checks passed.
Local QA used Playwright 1.64.1 / Chromium 156.0.8078.4, axe-core 4.14.0,
Node v22.22.1, and existing isolated browser libraries via
`LD_LIBRARY_PATH=/tmp/cendavex-browser-libs/root/usr/lib/x86_64-linux-gnu`.
Initial runs encountered absent browser binaries/libraries and an axe context
setup error; those QA setup issues were resolved. An added profile regression
initially expected an incorrect label; corrected it to the existing actual
`Aggressive` / `Conservative` labels. No existing valid test was weakened.

## Integration preservation follow-up

The separate integration review confirmed `11975c1` and its public-source parent
`7a8e380` from actual Git history. Review found the original candidate omitted the
homepage Market Pulse mount. This follow-up restores the existing widget within
the Financial section with a local non-sticky wrapper; shared provider code, CSP,
PNG, CNAME and existing Financial/news pages remain unchanged.

Final follow-up browser run: four tests passed, zero failed, 16 viewport WCAG
scans without reported violations, 30.27 seconds. Added checks confirm the Market
Pulse region, six provider links and truthful reduced-motion/off status. External
HTTPS is mocked. An initial new assertion expected a loading-state disclaimer
while reduced motion correctly disabled the widget; corrected to require its
actual truthful off-state. Desktop/mobile screenshots were retained in the
engineering integration evidence and inspected. JavaScript syntax and source
whitespace checks pass. This is local verification, not provider certification.

**Not published.** Origin main still resolves to `7a8e380`; public homepage bytes
match that revision. Unauthenticated Pages API returned 404, preventing current
source branch/path/workflow and deployment identity verification. Existing README
main/Pages instructions require current owner/configuration confirmation. Obtain
that access and confirmation, independent acceptance of this follow-up, and a
staging publication/rollback rehearsal before release. No Git push or application
service change occurred. Follow-up worktree:
`/home/djd10596/cendavex-corporate-release-review-20261017`.
