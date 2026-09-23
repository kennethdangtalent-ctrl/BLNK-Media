## Code Review: /review-uncommitted — BLNK-website working tree

### Summary
This review covers everything built on top of the create-expo-app initial commit: the Expo Router site in `src/`, fonts, icons, config and workflow documents. There are no critical issues, and typecheck, lint, expo-doctor and all three platform exports pass. The largest open risk is outside the code: the iOS and Android builds have been compiled but not run on a device, because this Windows machine has no simulator and no phone attached.

### What Was Reviewed
- Scope: the `git status` working tree. Modified: `app.json`, `package.json`, `package-lock.json`, `tsconfig.json`, 6 icon PNGs. Deleted: `App.tsx`, `index.ts`. Untracked: `src/` (41 files), `assets/fonts/` (5 TTF + 3 OFL texts), `README.md`, `plan.md`, `executor.md`, `History/`, `eslint.config.js`, `.claude/launch.json`.
- Volume: 3,390 lines of TypeScript in `src/`.
- Exclusions: `package-lock.json` was reviewed for the dependency set only, since it is generated. The PNG and TTF assets were checked visually and for licensing, not byte by byte.

### 🔴 Critical Issues (Blockers)
No critical issues found.

### 🟡 Medium-Risk Issues
| # | File | Line(s) | Issue | Risk |
|---|------|---------|-------|------|
| 1 | `.claude/launch.json` | 13 | `blnk-dist` runs `expo serve --port 8082` without a directory. `expo serve` then serves the project root, so `/business` returns 404. The session hit exactly this before the parent-level config was corrected. | Anyone who opens this project in Claude Code and previews the production build sees 404s. Fix: pass `dist` before `--port`. |
| 2 | `LICENSE` | 1–3 | The scaffold's MIT license names "650 Industries, Inc. (aka Expo)" as the copyright holder. It came from the template, not from this work. | Committing it publishes the BLNK site under Expo's copyright line. This is an owner decision: replace it with BLNK's own license, or remove it if the repo stays private. |

### 🔵 Nits / Polish
- `src/theme/tokens.ts:43` — the `rule` export is never imported; components use literal widths. Remove it.
- `src/theme/tone.tsx:13,17-19` — the `Tone.rule` field is never read. Remove it.
- `src/components/Link.tsx:154,163` — `ULink` accepts a `label` prop that no caller passes. Remove it.
- `app.json:14,17` — `name.blnk.website` is a placeholder iOS bundle identifier and Android package derived from the domain. It only matters for store builds, which are out of scope, but confirm it before any EAS build.
- `src/content/home.ts:5` — a content module imports the `IconName` type from `src/components`. It is a type-only import and harmless, but content should not depend on components.

### Hazard, Failure & Vulnerability Scan
- Data hazard gate: not applicable. There is no persistence, cache, queue, retry or concurrency.
- Systems failure gate: not applicable. App code has no file, process, signal or socket surface.
- Security gate: triggered by new dependencies and by one untrusted input (the `?s=` query parameter and the URL hash). The vulnerability catalog was loaded, and the entries the triggers point to were scanned:

| ID | Vulnerability | Present | Evidence | Required Fix |
|---|---|---|---|---|
| V-59 | Untrusted input reaching an interpreter | No | `src/components/Page.tsx:57,112-113`: `s` and the hash are used only as an argument to `document.getElementById` and as a `Map` key. They are never rendered, used as a selector, written to HTML, or passed to navigation. Unknown ids are ignored. | — |
| V-61 | Executable content accepted without integrity verification | No | Every dependency comes from the npm registry and is locked in `package-lock.json` with sha512 `integrity` hashes. Fonts are vendored from npm packages, with OFL texts alongside. | — |
| V-14 | Secret in source or config | No | No keys, tokens or env files. The only literals are the public email address and public URLs. | — |
| V-58 | Sensitive data in logs | No | Three `console.warn` calls log a constant URL, a font-loading error, or an AccessibilityInfo error. None carries user data. | — |
| V-60 | Development backdoor | No | No environment branches. Expo Router's developer `/_sitemap` route is replaced by the not-found page. | — |
| V-62 | Unbounded resource consumption | No | The web output is static files. There is no server-side work. | — |

External links carry `target="_blank" rel="noopener noreferrer"`, confirmed in the built DOM.

### Scope Check
- [x] All changes are in scope: the site, its config, fonts, icons, and the workflow documents that `/engineer-workflow` produces.
- [ ] Out-of-scope change outside the repository: `C:\Users\isaac\Documents\Github\.claude\launch.json` gained `blnk-web` and `blnk-dist` entries so the preview browser could start the servers. It is not part of this repo and is reversible by deleting those two entries.
- [x] No missing in-scope work.

### Missing Validation
- [ ] **Not run on a device.** The iOS and Android bundles compile to Hermes bytecode, and the worklet transforms are present (`__workletHash` in both bundles). Nothing has launched them. Run `npx expo start` and open the project in Expo Go.
- [ ] **No committed automated tests.** The visual, navigation, copy-fidelity, motion and accessibility checks ran from session scripts driving headless Chrome over the DevTools protocol. They are not in the repo.
- Present and passing: `tsc --noEmit`, `expo lint`, `expo-doctor` (21/21), `expo export` for web, iOS and Android, 16 navigation checks at 1440 and 390 px, a copy check of every board string, motion checks with and without reduced motion, and the keyboard focus ring.

### Recommended Next Steps
1. Fix `blnk-dist` in `.claude/launch.json` to serve `dist`.
2. Remove the three dead items listed under nits.
3. Decide what to do with `LICENSE`.
4. Open the app in Expo Go on a phone and walk both pages: masthead nav, section jumps, mailto buttons, social links, and Reduce Motion.

### Verdict: MOSTLY READY
There are no critical issues. One tooling bug and three dead items are fixable now, and the license decision and the on-device run belong to the owner.

---

### Fix outcomes (applied after the review)
| Finding | Outcome |
|---|---|
| 🟡 1 `.claude/launch.json` serves the project root | Fixed |
| 🟡 2 `LICENSE` names Expo as copyright holder | Left for the owner |
| 🔵 dead `rule` token, `Tone.rule`, `ULink.label` | Fixed |
| 🔵 placeholder bundle identifier | Left, documented |
| 🔵 content imports a component type | Left, harmless type-only import |
