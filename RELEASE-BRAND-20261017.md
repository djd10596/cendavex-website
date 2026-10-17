# Premium brand prominence — 2026-10-17

Focused revision of the shared identity across all 24 public HTML pages, based on
`46dc1b9c76b4c9412ab57bc26f45fb3d065bfe91`. CENDAVEX now leads the header at
up to 49px, with a distinct division identifier and the existing approved emblem
at 112px desktop / 72px mobile. The desktop brand saying and full footer saying
connect all five areas. The homepage uses the approved logo and company name
instead of the anonymous decorative C. Mobile keeps compact native menus;
Financial's longer desktop menu wraps into complete rows.

The logo bytes are unchanged (SHA-256
`a6e02d8ada7ad0b403e9346c3bd0d53245bb992b600c484f8c4f971ca3b24830`).
Approved mission/headline, existing footer positioning, all division content,
customer destinations and Financial disclosures are retained. Shared Financial
JavaScript, TradingView/provider behavior and attribution are unchanged. No
customer application, account data, brokerage service or configuration is edited.

Validation:
- `npm test`: 25 passed, 0 failed (147.527 seconds); all 24 pages at 1440, 768, 390 and 320px; WCAG axe checks,
  keyboard, local links, current menus, Financial profiles, Market Pulse info,
  process demonstrations, product destinations and legacy bookmarks. All 96
  page/viewport WCAG scans passed with no reported violations.
- Added assertions for division identity, logo dimensions, brand prominence,
  footer saying, mobile header height and homepage logo replacement.
- `node scripts/verify-brand.cjs`: all five area homepages at 1440, 768 and 390px,
  screenshots, visible menus, local destinations, division switcher navigation
  and return to Technologies. Set BRAND_BASE and BRAND_EVIDENCE to repeat on live.
- Visual inspection covers desktop, tablet and mobile, including Financial's
  long navigation and the corporate homepage emblem. Screenshot output and logs
  are kept outside the published repository under `/tmp/cendavex-brand-*`.
- `git diff --check`; logo hash comparison to baseline; exact source-content
  preservation comparison across all 24 HTML pages. Before publication, 31 live
  HTML/CSS/JS/logo files matched the baseline commit byte-for-byte.

Local regression mocks external HTTPS as before. Public live checks do not
certify licensed quote freshness or private customer login functionality.

Publish with the established main-branch GitHub Pages build, after a fresh
origin/main check, using an ordinary non-force push. Verify the deployment's exact
SHA, successful status, live changed-file bytes and all five area journeys.
Rollback uses a scoped revert of this revision and an ordinary push; retain later
unrelated work. Deployment evidence is recorded separately after publication.
