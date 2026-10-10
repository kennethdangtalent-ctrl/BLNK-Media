# Project Execution Plan: BLNK Media website (Expo universal — Expo Go + static web)

**Design source of truth:** `C:\Users\isaac\Downloads\BLNK-site.html`, a Claude Design bundle with two 1440 px boards: *BLNK.name — Desktop* (Issue 001, 1440×6560) and *BLNK.name/business — Desktop* (1440×7700). The planning session unpacked both boards. Their tokens and every string are recorded here and in `src/content/*.ts`, so this plan stands alone.

**Pipeline:** engineer-workflow (Planning → gates → Detail → Implement → Verify → Review). The user asked for the site to be built, so the phases run back to back in one session and each is logged in `History/`.

---

## Observations

- Each board is a `<x-dc>` design component with **inline styles only**. Its one script is the shared `dc-runtime`, which substitutes `{{accent}}` (default `#e0341b`; alternates `#d61c6c`, `#2a44d9`). There is no page logic, no form, no fetch.
- Links are one of four kinds: in-page anchor (`#roster`, `#mission`, `#apply`), cross-page (`Main.dc.html` ⇄ `Business.dc.html`), `mailto:business@BLNK.name?subject=…`, or external (Twitch / TikTok / Instagram / YouTube / pesito.la / risingfounder.net / BLNK.name).
- Fonts actually used: **Big Shoulders Display 900**, **IBM Plex Mono 400 and 600**, **Instrument Serif 400 and 400 italic**. The board also declares Plex 500 and Plex italic but never uses them.
- Motion in the board: a 48 s linear marquee (`translateX 0 → -50%`), hover (`translate(-3px,-3px)` + `5px 5px 0` hard shadow on buttons; accent text and underline on links; accent border on chips), a 3 px accent `:focus-visible` outline, and `prefers-reduced-motion` disabling the marquee and transitions.
- Textures: `radial-gradient` dot grids (8 px cell, ~1.35 px dot; cream at 0.30–0.32 on `#26231f`, ink at 0.5 on `#d9d3c4`) and one `repeating-linear-gradient` barcode (18 px cycle with bars at 0–2, 4–5, 9–12, 14–15).
- The boards are fixed-width. **No responsive rules exist**, so this plan designs tablet and phone layouts from the same tokens.
- Placeholder copy is intentional and ships verbatim: `[PHOTO — …]`, `[COVER PHOTO — NOVAPOVIE]`, `[CREDIT]`, `[DATE]`, `[N]`, `[X]`, `[RATE]`, `[LOGO]`, `[Client]`, `[CLIENT-URL]`, `[INDUSTRY]`, `[+ SOCIALS]`, `YOUTUBE [LINK]`, `[TO BE SHOT]`, `[TO BE SUPPLIED]`.
- Font metrics measured with fontTools: Big Shoulders Display Black has ascent 0.984, descent 0.213 and cap height 0.8. Its natural line box is 1.197 em. The boards set display type at 0.80–0.95 em.
- RN 0.86 centers text in a line box smaller than the font's, on iOS (`RCTApplyBaselineOffset`) and Android (`CustomLineHeightSpan` follows CSS half-leading). That is the same placement as CSS. Native views clip what overflows the first line box, and flat caps start clipping below 0.829 em. Only the three 0.80 em cases are affected.
- Installed APIs checked in `node_modules`: expo-router 57 has `Link dismissTo`, `router.dismissTo`, `useFocusEffect(cb)`, and `Head`. react-native-web 0.21 renders `href` / `hrefAttrs` as an anchor, maps `role="heading"` + `aria-level` to `h1`–`h6`, and passes `boxShadow` and web-only style keys through. `expo-font` returns loaded=true during static rendering and embeds `@font-face` for hydration.
- The scaffold's `AGENTS.md` says routes go in `src/app/`, packages are added with `npx expo install`, and `npx expo lint` plus `npx tsc --noEmit` run before a task is declared done.

### Design tokens (extracted)

| Token | Value | Used for |
|---|---|---|
| `paper` | `#f2efe6` | page background, text on ink |
| `ink` | `#111111` | text, rules, dark bands |
| `accent` | `#e0341b` | eyebrow squares, numerals, apply/brief bands, hover |
| `plate` | `#26231f` | photo slots and cover card (dark dot grid) |
| `deck` | `#d9d3c4` | deck covers (light dot grid) |
| `muteOnInk` / `hairOnInk` | `#cfc9bb` / `#3a3733` | secondary text / hairlines on dark |
| `muteOnPaper` / `hairOnPaper` | `#3a3733` / `#c9c3b4` | secondary text / hairlines on light |
| `credit` | `#d9d4c7` | cover credits |
| Rules | 3 px (section, button, card), 2 px (tile, footer), 1 px hairline | |
| Type at 1440 | h1 112–150, h2 200, CTA h2 160, h3 80–88, stat 48, quote 72, wordmark 128–150, body 15, label 11–13 | Big Shoulders 900 for display at 0.80–0.95 line height |
| Tracking | 0.20, 0.16, 0.14, 0.12, 0.08, 0.06, 0.04 em | IBM Plex Mono labels |
| Spacing | band padding 112 / 64; masthead 72; button 56 × 28; chip 32 × 12; grid gaps 24–64 | |
| Motion | marquee 48 s linear; hover 120–150 ms ease | |

## Root Cause
Not applicable. This is a greenfield build.

## Requirements

### Functional
- Route `/` is Issue 001: masthead, cover with a tilted cover card, marquee, roster (5 creators with stats and social chips), mission (4 values and a pull quote), applications call to action with "what to send", footer.
- Route `/business` is the business pages: masthead (BUSINESS marked current), hero with a tilted media-kit card, clients (4), sponsors (4), case studies (3), media decks (3), rate card (4 brand rows and 3 B2B rows), booking call to action, footer.
- Masthead nav: ROSTER / MISSION / APPLY scroll to the section on `/`. From other routes they go to `/?s=<section>`, which scrolls after layout. BUSINESS goes to `/business`. The logo goes home, or scrolls to the top on `/`.
- Every board link works. Mailto links carry the encoded subject. External URLs open the system browser on native and a new tab on web. Internal routes navigate in-app.
- The site runs in **Expo Go** on iOS and Android via `npx expo start`. It exports as a **static website** via `npx expo export --platform web`, with one HTML file per route.

### Load and performance
- Estimation gate: **not applicable**. There is no server and no data path.
- Web budget, measured in F4: entry JS ≤ 1.5 MB uncompressed; fonts ≤ 600 KB for 5 TTFs; no network calls except user-initiated links.
- Continuous motion runs on the UI thread through Reanimated. Nothing calls `setState` per frame.
- No horizontal overflow from 320 px to 1920 px. Checked at 390, 820 and 1440 in the browser.

### Availability, durability, consistency
Not applicable. This is static hosting. Rollback means redeploying the previous `dist/`.

### Fault model
| Fault | Tolerated? | Behavior | Blast radius |
|---|---|---|---|
| A font file fails to load | Yes | The root waits for loaded **or** error, then renders with the platform font and logs the error | Typography |
| `Linking.openURL` rejects (no mail client) | Yes | The rejection is caught and logged; nothing else happens | One tap |
| Reduce Motion is on | Yes | Marquee static, entrance reveal and card tilt off, CSS transitions off | None |
| Viewport < 360 px | Degrades | Display sizes are fitted to the widest word from real glyph advances; long labels wrap | Cosmetic |
| Web JS disabled | Not tolerated | The server HTML stays hidden (opacity 0) because layout depends on window width | Whole page. Accepted: the design bundle also needs JS |

### Constraints
- Expo SDK 57 (`expo ~57.0.24`, RN 0.86.3, React 19.2.3), Expo Router 57 with routes in `src/app/`, TypeScript `strict`.
- Only modules bundled in Expo Go: `react-native-reanimated` 4.5 + `react-native-worklets`, `react-native-svg`, `react-native-safe-area-context`, `react-native-screens`, `expo-font`, `expo-splash-screen`, `expo-linking`, `expo-status-bar`, `expo-router`.
- Fonts are vendored as 5 TTFs in `assets/fonts/` (SIL OFL 1.1, license kept alongside). `@expo-google-fonts/big-shoulders-display` is deprecated upstream, and vendoring pins the exact cuts the board uses.
- The site must match the boards at 1440. Tablet and phone layouts derive from the same tokens.
- Windows dev machine, npm.

### Explicit non-goals
- No CMS, form backend, analytics, cookie banner, or i18n.
- No real photos or logos yet. Photo slots take an optional `photo` image field so assets drop in later.
- No EAS or store builds. Expo Go and static web only.
- No accent switcher UI. The alternates are exported tokens.

## Capacity Estimates
Estimation gate: not applicable. The site is static. Bundle budgets are stated above and measured in F4.

## Architecture
Architecture gate: not applicable. One Expo app, no services, no datastore, no request path beyond static hosting.

Three structural decisions are recorded because they are easy to undo wrongly later:

| Decision | Chosen | Rejected | Why |
|---|---|---|---|
| Web output | `static` (one HTML file per route, per-route `<title>` and Open Graph tags) | `single` (SPA) | Link unfurlers for DMs, Discord and iMessage do not run JS. Per-route meta only exists in static output. |
| Web scrolling and navigator | `Slot` on web with **document scroll** (no `ScrollViewStyleReset`); `Stack` on native | `Stack` everywhere with an inner `ScrollView` on web | The native-stack web view positions screens absolutely, which forces a div scroller. Document scroll keeps the mobile browser toolbar collapse, `#anchor` jumps, and normal scroll behavior. |
| Hydration of width-dependent layout | Layout reads a fixed 1440 width until hydrated. The page root is opacity 0 until hydration, then fades in. | Reading `useWindowDimensions` during render | Static HTML is rendered at width 0, so the client's first render must produce the same tree. Hiding the pre-hydration frame avoids a flash of the wrong layout on phones. |

## Design
Data gate: not applicable. No persistence, concurrency, retries, or side-effecting API.

## Systems
Systems gate: not applicable. The app performs no file I/O and spawns no processes. Build tooling is Expo's.

## Security
Security gate: not applicable at record depth. There is no authentication, no user input, and no PII. One design rule is carried into F1 and checked in review: every outbound URL is a compile-time constant from `src/content/*.ts`. `openExternal()` in `src/components/Link.tsx` never receives runtime-constructed input. External web links carry `rel="noopener noreferrer"`.

## Simplicity Pass
| Component | Justified by | Verdict |
|---|---|---|
| Expo Router | two routes, web URLs `/` and `/business`, `Head` for per-route meta | Keep |
| Reanimated 4 + worklets | marquee, entrance stagger, card tilt on the UI thread; bundled in Expo Go | Keep |
| react-native-svg | dot-grid `<Pattern>` and 4 social icons; bundled in Expo Go | Keep |
| `@expo-google-fonts/*` packages | 5 files needed; one package deprecated; index files `require` every weight | **Remove**, vendor the 5 TTFs |
| Theme library / state manager | one accent constant and a tone context | **Remove**, use plain `tokens.ts` + a React context |
| `expo-image` / image CDN | no images exist yet | **Defer**, RN `Image` in the photo slot when photos arrive |
| NativeWind / styled-components | inline `StyleSheet` maps 1:1 onto the boards' inline styles | **Remove** |
| `expo-font` config plugin | embeds fonts only in native builds, which Expo Go does not use | **Remove**, runtime `useFonts` |
| Text measurement library | a 100-entry advance-width table from the TTF does the fitting | **Remove**, `src/theme/metrics.ts` |

---

## Plan

### Phase F1: Scaffold, design system, shared chrome
- **Status:** Completed
- **Goal:** An Expo Router app that boots in Expo Go and on web with all five fonts loaded. Tokens, layout and link primitives are defined, and masthead and footer render on both routes.
- **Rationale:** Every section in F2 and F3 is built from these primitives. Getting fonts, breakpoints, hydration and link behavior right first keeps the pages mechanical.

#### Tasks
- [x] 1.1 — Dependencies are installed with `npx expo install` (done during planning). Remove the three `@expo-google-fonts/*` packages. Copy the 5 TTFs and their OFL license texts into `assets/fonts/`.
- [x] 1.2 — `package.json` gets `"main": "expo-router/entry"`. Delete `App.tsx` and `index.ts`. `app.json` gets name "BLNK Media", slug `blnk-website`, scheme `blnk`, orientation `default`, web `{ bundler: metro, output: static }`, and plugins `expo-router` plus `expo-splash-screen` (paper background). `tsconfig.json` gets `paths { "@/*": ["./src/*"] }`.
- [x] 1.3 — `src/theme/tokens.ts` (colors, font family names, rules, motion, `BOARD_W`), `src/theme/metrics.ts` (Big Shoulders advance table, `displayWidth`, `fitWords`, `fitLines`, `CH`), `src/theme/web.ts` (`webStyle`, `webProps`), `src/theme/tone.tsx` (light / dark / accent tones).
- [x] 1.4 — `src/theme/layout.tsx`: `LayoutProvider` and `useLayout()` returning `{ width, bp, gutter, inner, s, fl, hydrated, reduceMotion, motionReady, insets }`. Breakpoints: phone < 768, tablet 768–1099, desktop ≥ 1100. Width is fixed at 1440 until hydrated on web.
- [x] 1.5 — `src/components/Type.tsx`: `Display` (Big Shoulders 900; line height clamped to ≥ 0.84 em on native; `level` gives heading semantics), `Mono` (Plex 400/600), `Serif` (Instrument, italic flag). All take `size`, `lh` ratio, `ls` in em, `maxCh`, and default to the tone color.
- [x] 1.6 — `src/components/Link.tsx`: `A` (anchor on web, `Linking` / router on native, hover and press state, `dismissTo`, `newTab`), `Btn` (56 px, solid or outline, hard-shadow hover), `ULink` (underline, accent hover), `NavLink`, `Chip`.
- [x] 1.7 — Primitives: `DotGrid` (SVG pattern with unique id), `Barcode`, `Icons` (4 paths from the boards), `Eyebrow`, `Tag` / `Badge`, `Grid` (chunked rows with equal columns), `Band` (full-bleed tone band with a centered 1440 frame; `id` registers a scroll target), `SectionHead`, `Reveal`, `TiltCard`.
- [x] 1.8 — `src/components/Page.tsx` (document scroll on web, `ScrollView` plus a status-bar spacer on native, section registry, `?s=` and `#hash` handling via `useFocusEffect`), `Masthead.tsx`, `Footer.tsx`.
- [x] 1.9 — `src/app/_layout.tsx` (fonts, splash, `LayoutProvider`, `Slot` on web / `Stack` on native, hydration fade), `src/app/+html.tsx` (lang, viewport, theme-color, OG site tags, global CSS for focus-visible, selection and reduced motion), `src/app/+not-found.tsx`, and route stubs `src/app/index.tsx` and `src/app/business.tsx`.
- [x] 1.10 — `.claude/launch.json` with `blnk-web` (`expo start` on 8081) and `blnk-dist` (`expo serve` on 8082).

#### Verification
- [x] `npx tsc --noEmit` exits 0.
- [x] `npx expo export --platform web` exits 0 and writes `dist/index.html` and `dist/business.html`.
- [x] Browser at `http://localhost:8081/`: masthead and footer render in the three families (`getComputedStyle(el).fontFamily`). The console has no errors.

#### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Static rendering or hydration mismatch from width-dependent layout | Medium | Console errors, layout flash | Width gated behind `hydrated`; root hidden until hydration; verified in the browser console |
| Reanimated or worklets not SSR-safe | Low | Export fails | The Expo default template ships Reanimated with static output. If it fails, gate animated components behind `hydrated`. |
| RN Web drops a web-only style key | Low | Missing underline offset or transition | Checked with computed styles in F1 verification |

#### Rollback
Delete `BLNK-website/`. Nothing outside it changed except the `.claude/launch.json` that lives inside it.

---

### Phase F2: Issue 001 (`/`)
- **Status:** Completed
- **Goal:** `/` reproduces the *BLNK.name — Desktop* board at 1440 and reflows cleanly at 820 and 390.
- **Rationale:** The roster is the product. Applicants and brands both land on this page.

#### Tasks
- [x] 2.1 — `src/content/site.ts` (email, `mailto()`, issue, social URLs), `src/content/home.ts` (cover, marquee, roster ×5, mission ×4, quote, apply), verbatim from the board.
- [x] 2.2 — `src/sections/home/Cover.tsx`: two columns on desktop (1fr | 520·s), stacked below that. The `CoverCard` composition scales by `k` (accent block offset 40k/44k, card rotated −2°, dot grid, wordmark 150k, meta, placeholder tag, badge, italic 34k, credits).
- [x] 2.3 — `src/sections/home/Marquee.tsx`: 56 px ink band. It renders `ceil(width / copy) + 1` copies of the string and translates by one measured copy width every 48 s on the UI thread. It stays static when Reduce Motion is on.
- [x] 2.4 — `src/sections/home/Roster.tsx`: section head plus 5 `RosterCard`s. Desktop grid is 480·s | 1fr, tablet is 38% | rest, phone is stacked. The accent numeral overlaps the photo slot. The stats grid uses one fitted size across all cards. Chips and "BRAND PARTNERSHIPS →" follow.
- [x] 2.5 — `src/sections/home/Mission.tsx`: section head, value grid (4 / 2 / 1 columns) with 3 px top rules, pull quote (72 → 40).
- [x] 2.6 — `src/sections/home/Apply.tsx`: accent band, "Issue 002 / is being cast." fitted by lines, two ink buttons, "WHAT TO SEND" grid (4 / 4 / 2 columns).
- [x] 2.7 — `src/app/index.tsx`: `Head` (title, description, OG, canonical), `Page` with sections registered as `roster`, `mission`, `apply`.

#### Verification
- [x] `npx tsc --noEmit` exits 0.
- [x] Browser at 1440: section order and copy match the board, and there are no console errors.
- [x] Browser at 390: `document.documentElement.scrollWidth <= innerWidth`, and a screenshot walk shows every section.
- [x] Nav ROSTER / MISSION / APPLY move `scrollY` to each section's offset within ±2 px.

#### Rollback
Revert `src/app/index.tsx`, `src/sections/home/`, `src/content/home.ts`. The phase is additive.

---

### Phase F3: Business (`/business`)
- **Status:** Completed
- **Goal:** `/business` reproduces the *BLNK.name/business — Desktop* board and reflows at 820 and 390.
- **Rationale:** This is the brand-facing page. Every partnership call to action on `/` points here.

#### Tasks
- [x] 3.1 — `src/content/business.ts`: media kit, clients ×4, sponsors ×4, cases ×3, decks ×3, rate rows (4 + 3), brief, verbatim.
- [x] 3.2 — `src/sections/business/BizHero.tsx`: h1 150 → 64, fitted by words; `MediaKitCard` (ink block 40k/40k, accent card rotated +2°, four 2 px-ruled rows, grows with content).
- [x] 3.3 — `Clients.tsx` (2 / 2 / 1 columns), `Sponsors.tsx` (4 / 2 / 2 tiles, one fitted name size), `Cases.tsx` (3 / 1 / 1), `Decks.tsx` (3 / 3 / 1).
- [x] 3.4 — `RateCard.tsx`: desktop and tablet row grid (num | 3fr | 5fr | rate); on phone the number and rate share the top line with the name and description below.
- [x] 3.5 — `Brief.tsx`: accent call to action with the mailto button and BACK TO ISSUE 001.
- [x] 3.6 — `src/app/business.tsx`: `Head` plus the page. The masthead marks BUSINESS current with `aria-current` and the NOW BOOKING badge. The footer's third link is ISSUE 001.

#### Verification
- [x] `npx tsc --noEmit` exits 0.
- [x] Browser at 1440 and 390 as in F2. Rate rows keep `[RATE]` right-aligned.
- [x] From `/business`, nav ROSTER lands on `/` scrolled to the roster.

#### Rollback
Revert `src/app/business.tsx`, `src/sections/business/`, `src/content/business.ts`.

---

### Phase F4: Motion, accessibility, release prep
- **Status:** Completed
- **Goal:** Entrance choreography, reduced motion, accessibility roles, web metadata, icons and README are done, and both targets are verified.
- **Rationale:** The board's motion is minimal and exact. It is applied last so it never blocks layout work.

#### Tasks
- [x] 4.1 — Entrance stagger on both heroes (eyebrow → h1 → lede → calls to action → card, 90 ms steps, 700 ms ease-out, 18 px rise). It starts only after hydration and after the Reduce Motion state is known.
- [x] 4.2 — Card tilt on hover or press (rotate to 0°, lift 4 px, 260 ms). Off under Reduce Motion.
- [x] 4.3 — Accessibility: `banner` / `navigation` / `main` / `contentinfo` / `region` / `article` roles, heading levels, labelled icon chips ("NovaPovie on Twitch"), decorative numerals and the marquee hidden from assistive tech.
- [x] 4.4 — Brand icons from the vendored font with Pillow: `icon.png`, Android adaptive layers, `splash-icon.png`, `favicon.png`.
- [x] 4.5 — `README.md`: Expo Go, web dev, static export, where copy and slots live, how to drop in photos and logos.
- [x] 4.6 — `npx expo lint`, `npx expo-doctor`, `npx expo export --platform web --platform ios --platform android`; record bundle and font sizes against the budgets.

#### Verification
- [x] Browser with reduced motion emulated: the marquee `transform` is unchanged across 2 s.
- [x] Browser accessibility tree shows heading levels and link names for every chip.
- [x] `dist/` sizes are within budget, and lint, doctor and all three platform exports pass.

#### Rollback
Each task is additive. Revert the files touched.

---

### Phase F5: The Mission page (`/mission`)
- **Status:** Completed 2026-09-23.
- **Goal:** "The mission" moves off `/` onto its own route, `/mission`. The route carries the company thesis, the existing four values and pull quote, and a founder bio (photo, name, CEO, Marketing — Cal Poly, bio).
- **Rationale:** The thesis is a statement to brands, capital and future hires, not only to applicants. A route of its own gives it a shareable URL, its own Open Graph card and room for the thesis to be read in full. That room does not fit between the roster and the application call to action.

#### Observations (F5)
- `src/sections/home/Mission.tsx` is the whole current mission. It holds `SectionHead`, a 4 / 2 / 1 value `Grid` and a `Quote`, all fed by `mission` in `src/content/home.ts:176-211`.
- `src/components/Masthead.tsx:15-19` hard-codes MISSION as an in-page section of `/`. It links to `/?s=mission` from other routes and scrolls in place on `/` (lines 65-73). `Current` is `'home' | 'business' | 'other'` (line 13).
- `src/components/Page.tsx:110-123` jumps to `?s=` or `#hash` targets. An id that no longer exists stays pending for `SETTLE_MS` and then drops silently, so old `/?s=mission` links would land at the top of `/`, not on the mission.
- `src/components/Footer.tsx` switches its third link on `variant: 'home' | 'business'`. `footer.notes` in `src/content/site.ts:36-42` is keyed the same way.
- Per-route meta comes from `meta` in `src/content/site.ts:16-29` through `PageHead`. Static output writes one HTML file per route (plan F1 decision), so `/mission` gets `dist/mission.html` with no config change.
- A photo pattern already exists. `PhotoSlot` and `Print` in `src/sections/home/Roster.tsx:154-205` mount a square photo as a tilted instant print on the dot-grid plate, with the dashed `Tag` placeholder when no photo exists. They are local to that file today.
- Section numbering is in the copy. The `apply.eyebrow` is `'03 — APPLICATIONS'` and becomes `02` once the mission leaves `/`.

#### Requirements (abbreviated, per the proportionality rule)
- **Functional:**
  - `/mission` renders the masthead with MISSION current, then a thesis hero, a value chain, the four values and the quote, the founder, and the footer.
  - The value chain is "Creator talent → Media → Brand partnerships → Technology → Capital". It renders as a 5-step row on desktop, and a numbered vertical list on tablet and phone.
  - `/` no longer renders `Mission`. `/?s=mission` and `/#mission` redirect to `/mission`, so shared links keep working.
  - Masthead MISSION is a route link to `/mission` from every page, with `aria-current` on `/mission`. ROSTER and APPLY behave as before.
- **Load, performance, availability, consistency:** not applicable. The page is static, and the web JS budget (≤ 1.5 MB) still holds. One new route adds about 10 KB of code plus one founder image of ≤ 150 KB (resized before commit).
- **Fault model:** no founder photo yields the dashed `[PHOTO — FOUNDER]` placeholder, the same pattern the roster uses. A missing bio field does not happen: the fields are compile-time constants.
- **Non-goals:** no CMS, no team page beyond one founder, no new animation primitives, and no copy edits to the thesis beyond typographic quotes and dashes.

#### Gates
- Estimation gate: not applicable. The site is static, with no data path.
- Architecture gate: not applicable. The change is one new route inside the existing Expo Router app.
- Design gate: not applicable. There is no persistence, concurrency or retry.
- Systems gate: not applicable. There is no file I/O or process work.
- Security gate: not applicable at record depth. There is no input and no new outbound URL. The F1 rule still applies: `/mission` is an internal constant, and no URL is built from input.

#### Tasks
- [x] 5.1 — `src/content/mission.ts` (new):
  - `thesis`: an eyebrow, a headline, and the paragraphs verbatim from the brief. Lead with "BLNK exists to build the infrastructure and brand layer for the next generation of internet creators."
  - `chain`: the five steps, each with an index label.
  - `values` and `quote`: moved from `home.ts:176-211`, with the eyebrows renumbered.
  - `founder`: `{ name, role: 'CEO', school: 'Marketing — Cal Poly', bio, photo?, photoLabel }`.
  - Delete `mission` from `home.ts`, and change `apply.eyebrow` to `'02 — APPLICATIONS'`.
- [x] 5.2 — `src/content/site.ts`:
  - `meta.mission` (title `BLNK Media — The Mission`, a description drawn from the thesis lead, path `/mission`).
  - `masthead.mission` (issue `Nº 001 — THE MISSION`, badge `APPLICATIONS OPEN`).
  - `footer.notes.mission`.
- [x] 5.3 — Extract `PhotoSlot` and `Print` from `src/sections/home/Roster.tsx` into `src/components/PhotoSlot.tsx`. The props become generic (`name`, `photo`, `photoStyle`, `photoFocus`, `logo`, `photoLabel`) so `Creator` and `founder` both satisfy them. Roster imports it. No visual change.
- [x] 5.4 — `src/sections/mission/`:
  - `Thesis.tsx`: a light band. `SectionHead` carries eyebrow `THE THESIS` and title `The thesis.`. The lead sentence is `Serif italic` at the quote size (72 → 40). Body paragraphs are `Mono` 15, `maxCh={64}`. "BLNK starts with talent." and "But talent management is only the entry point." are set as `Display` pull lines.
  - `Chain.tsx`: an ink band. Desktop is 5 equal columns with 3 px accent top rules, `→` between steps, and one fitted `Display` size across all five. Tablet and phone are a vertical numbered list.
  - `Values.tsx`: the current `Mission.tsx` body (grid plus `Quote`), moved and fed from `mission.ts`.
  - `Founder.tsx`: a dark band, laid out like a roster card (photo column 480·s | text; stacked on phone). It shows `PhotoSlot`, name as `Display level={3}`, `CEO` and `MARKETING — CAL POLY` as `Mono` 12/600 kicker lines, and the bio as `Mono` 15, `maxCh={60}`.
- [x] 5.5 — `src/app/mission.tsx`: `PageHead {...meta.mission}` and a `Page` with `Masthead current="mission"`. `Main` holds Thesis, Chain, Values, Founder. `Footer variant="mission"`.
- [x] 5.6 — `src/components/Masthead.tsx`:
  - `Current` gains `'mission'`, and `SECTIONS` loses `mission`.
  - A `NavLink label="MISSION" href="/mission"` sits between ROSTER and APPLY, with `current` set on `/mission`.
  - `copy` picks `masthead.mission` there.
- [x] 5.7 — `src/components/Footer.tsx`: `variant` gains `'mission'`. That variant renders both ISSUE 001 (`dismissTo`) and BUSINESS.
- [x] 5.8 — `src/app/index.tsx`: remove `<Mission />` and its import. If `s === 'mission'`, return `<Redirect href="/mission" />` from `expo-router`. The `#mission` hash is handled in `Page`'s focus effect with `router.replace('/mission')` when the hash is `mission`. Delete `src/sections/home/Mission.tsx`.
- [x] 5.9 — Founder photo: save it to `assets/team/founder.png` (square, ≥ 600 px, ≤ 150 KB). Until it arrives, the `[PHOTO — FOUNDER]` placeholder ships.
- [x] 5.10 — `README.md`: add `/mission` to the route list, and note where thesis and founder copy live.

#### Verification
- [x] `npx tsc --noEmit` and `npx expo lint` exit 0.
- [x] `npx expo export --platform web` writes `dist/mission.html`, whose `<title>` is `BLNK Media — The Mission` and whose `og:url` ends in `/mission`.
- [x] Browser at 1440, 820 and 390 on `/mission`: `document.documentElement.scrollWidth <= innerWidth`, no console errors, and every thesis paragraph and all five chain steps appear in `get_page_text`.
- [x] `/?s=mission` and `/#mission` end on `/mission` (`location.pathname`).
- [x] `/` no longer contains "The mission." Its section order is Cover, Marquee, Roster, Apply, and the Apply eyebrow reads `02 — APPLICATIONS`.
- [x] Masthead MISSION has `aria-current="page"` on `/mission` only. ROSTER from `/mission` lands on `/` scrolled to the roster within ±2 px.
- [x] The roster renders identically after the `PhotoSlot` extraction: captures of the roster band at 1440 before and after show all five prints at the same tilts.
- [x] Web JS stays ≤ 1.5 MB minified.

#### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| The `PhotoSlot` extraction changes roster rendering | Low | Visual regression on `/` | Before and after captures in verification |
| Old `/?s=mission` links drop users at the top of `/` | Medium without the redirect | A broken shared link | The 5.8 redirect, verified |
| The long thesis at 390 px reads as a wall of text | Medium | Readability | `maxCh`, pull lines, and the chain graphic break it up. Checked in the 390 capture |

#### Rollback
Revert the F5 commit. The route is additive, and the only edits to existing files are Masthead, Footer, index, Roster (the extraction), `home.ts` and `site.ts`. They are all in one commit.

---

## Verbatim Execution Plan
> Follow this plan verbatim. Trust the file references. Do not re-verify unless conflicts arise.

1. F1.1–1.10 in order, then F1 verification, then log.
2. F2.1–2.7, then F2 verification, then log.
3. F3.1–3.6, then F3 verification, then log.
4. F4.1–4.6, then F4 verification, then log.
5. Review with `/review-uncommitted` over `src/` for dead code, platform leaks (`window` / `document` only behind a web check and never during render), and any URL not sourced from `src/content`.
6. F5.1–5.10 in order, then F5 verification, then log. Blocked on the F5 open questions below.

## Open Questions (proceeding on stated assumptions)
- Placeholder copy (`[DATE]`, `[N]`, `[RATE]`, `[LOGO]`, photo slots) ships verbatim, as in the boards.
- Domain and email are `BLNK.name` and `business@BLNK.name`, as in the boards. Canonical URLs use lowercase `https://blnk.name`.
- The accent stays `#e0341b`. `#d61c6c` and `#2a44d9` are exported as `accentAlternates` only.
- On `/business`, the board's nav links point to the top of Issue 001. The build points them at the matching section instead.
- No deployment target is chosen. `dist/` is host-agnostic (Cloudflare Pages, Netlify and Vercel all serve `business.html` at `/business`).

### F5: needs answers before `implement F5`
- **Founder name.** It is needed for the bio heading.
- **Founder photo.** A file is needed; square and at least 600 px is best. Without it, the placeholder ships.
- **Bio text.** Up to about 60 words works best at this layout.
- **Campus.** "Cal Poly" could be San Luis Obispo or Pomona. The line reads `MARKETING — CAL POLY` unless a campus is given.
- **The four values and the quote.** They move to `/mission` with the thesis (assumed). The alternative keeps a short teaser on `/` that links to `/mission`.

## Replan Log
| Date | Trigger | Change |
|---|---|---|
| 2026-09-22 | F4 budget check: the web bundle measured 2,027 KB minified, over the 1.5 MB budget. Reanimated was 733 KB (38%) of it and served only three effects. | Added web-only variants `Reveal.web.tsx`, `TiltCard.web.tsx` and `Marquee.web.tsx` that run the same motion as CSS keyframes and transitions. Metro picks them for web, so Reanimated stays in the iOS and Android bundles only. Web JS dropped to 1,239 KB minified (326 KB gzip). The Simplicity Pass verdict for Reanimated becomes "Keep on native, remove from web". |
| 2026-09-22 | F4 lint: `react-hooks/set-state-in-effect` flagged the hydration flag. | `useHydrated` and the web reduced-motion query now use `useSyncExternalStore` with a server snapshot, which is the React 19 idiom for hydration-dependent values. |
| 2026-09-22 | F4 production check: Expo Router ships a developer sitemap at `/_sitemap`. | `src/app/_sitemap.tsx` renders the branded not-found page instead. |
| 2026-09-22 | The user supplied creator images (fumibean logo in chat; photos for NovaPovie, m0rals_, jackypoowoo and cloyyd pending as files). | Added `expo-image` (the Simplicity Pass deferred it until photos arrived) for focal-point photo crops via `contentPosition`. Creators gained `photoFocus` and `logo`. A logo renders as a tilted die-cut sticker with an accent shadow cut to its outline. Web JS is now 1,277 KB minified (338 KB gzip). |
| 2026-09-23 | The user asked for "the mission" to become its own page, with a company thesis and a founder bio. | Added Phase F5: a `/mission` route, the mission removed from `/` with a redirect for old links, masthead MISSION becomes a route link, and `PhotoSlot` is extracted for reuse. All gates are not applicable. Archived in `History/mission-page-2026-09-23-0002.md`. |
