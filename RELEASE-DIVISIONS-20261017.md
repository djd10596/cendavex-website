# Division website release — 2026-10-17

Implements the founder-approved WEBSITE_DIVISION_ARCHITECTURE.md on baseline
`e1740b44b8376d53ddf5f4600af0e4757d357521` from current origin/main.

The parent homepage retains the approved identity, mission and four brief division
introductions. Dedicated AI, Financial, Systems and Industries sites have contextual
menus, native keyboard/mobile disclosure controls, an organization switcher, active
page indicators and a return to Technologies. AI's six original product concepts
are preserved on its products page. Prospective divisions explicitly describe
research, not purchasable offerings.

Financial retains the original four-profile selector, allocation copy, product
preview destinations, process demonstration and risk disclosures. Market Pulse
uses unchanged brand.js/provider code and attribution. Legacy HTML URLs retain
their contents; original homepage investing/products/experience/market-pulse
bookmarks resolve to Financial. Login and signup remain on app.cendavex.com.
No customer application, brokerage configuration or trading system is changed.

Verification uses the existing Node/Playwright/axe test library and static server,
expanded to all 24 HTML pages at 1440, 768, 390 and 320 pixels. Tests check WCAG
rules, overflow, links, active menus, keyboard skip focus, mobile disclosures,
switcher destinations, Financial interactions, preview links and legacy bookmarks.
External HTTPS is mocked in automated local tests, so widget rendering, quote
freshness and private preview authentication are not certified by that suite.
Desktop corporate and AI plus mobile Financial screenshots were inspected.

Publication follows the existing main-branch GitHub Pages procedure, with a fresh
origin/main ancestry check and ordinary non-force push. Prior deployment
7137387197 successfully published baseline e1740b4 to https://cendavex.com/.
Verify the new deployment SHA, successful deployment status and exact live file
bytes after publication; heading text alone cannot prove deployment identity.
Rollback, if required, is a scoped git revert followed by the same checks and
ordinary push, preserving subsequent commits.
