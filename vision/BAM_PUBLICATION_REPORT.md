# BAM finale publication handoff — 2026-10-17

Prepared for https://cendavex.com/vision/ in this isolated checkout. No push or deployment performed. **Release verification and commit remain pending: this sandbox blocks the regression server/browser and mounts `.git` read-only.**

- Featured the exact founder-approved `assets/cendavex-awakening-v4-finale.mp4`: 28,638,630 bytes; SHA-256 `9ed98e0fe656d4ed17f667b28014b60ee07455305d089368e5d14133e712b9d8`. No edits or re-encoding of the master.
- Added a prominent homepage hero invitation and a dedicated film invitation within the existing metallic-blue design. Existing navigation, company pages, exhibits and app links are preserved; app.cendavex.com was not changed.
- Native controls, inline click-to-play, `preload="metadata"`, no autoplay or loop on the featured film, a 1280×720 WebP poster extracted from its approved closing logo, and direct MP4 download. No homepage video download. Browsers control metadata buffering; full film download is approximately 28.6 MB.
- Added 18 synchronized English text cues, an HTML transcript of the approved on-screen narrative, visual descriptions and six workstream names. Music is instrumental; there is no spoken narration. Replaced the obsolete silent-film runtime, transcript and production cue-sheet link. Prospectivity, paper-money beta, unavailable live investing, illustrative coordination and no commercial AI product boundaries remain explicit.
- Credit: A Broken Throne — Michael Ramir C. Music provided by Mixkit. No original MP3 or private production materials added.

Validation completed: approved SHA-256 and size; complete audio/video decode; poster visual inspection; JavaScript syntax checks; all 739 local HTML links/assets resolved; native player attributes and all 18 caption intervals checked; `git diff --check`.

Validation attempted: `bash scripts/vision-browser-env.sh npm test` exited with six test-file failures because local server binding is prohibited (`listen EPERM 127.0.0.1`). `bash scripts/vision-browser-env.sh node scripts/verify-vision.cjs` encounters the same server restriction. An independent Chromium launch fails with `sandbox_host_linux.cc:41 ... Operation not permitted`. These are environment blocks, not passing regression or browser results. Prior approved-film production evidence reports complete Chromium playback and 31 passing website regressions; that is historical evidence, not validation of this integration.

The existing vision browser verifier is updated for the approved source/runtime, metadata-only initialization, native keyboard playback, transcript seeks, Chromium/WebKit desktop and mobile layouts, accessibility, no-JavaScript fallback, preserved exhibit navigation and full normal-speed unmuted Chromium playback through `ended`. The outer release controller must rerun both commands in a browser-capable environment, inspect screenshots, verify HTTP range delivery and captions, then perform its independent non-force push and live checks. No live publication is claimed here.

Commit attempt: `git add` and `git commit -m "Feature founder-approved Awakening BAM finale on corporate website"` were rejected with `.git/index.lock: Read-only file system`. All public changes remain in the working tree for the outer controller to inspect, validate and commit. No alternative Git metadata or history was created.
