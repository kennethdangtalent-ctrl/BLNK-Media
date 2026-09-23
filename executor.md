# Executor Specification — BLNK Media website

Specification authority for the phases in `plan.md`. Each phase lists components, interfaces, ordered steps, failure modes, contracts, verification and rollback.

---

## Phase F1: Scaffold, design system, shared chrome — Specification

### Goal
The app boots on web and compiles for iOS and Android with five fonts loaded. Every shared primitive exists, and both routes render the masthead and footer.

### Components
| Component | Path | Type | Action |
|---|---|---|---|
| Entry and config | `package.json`, `app.json`, `tsconfig.json` | config | Modify |
| Fonts | `assets/fonts/*.ttf`, `assets/fonts/OFL-*.txt` | asset | Create |
| Tokens | `src/theme/tokens.ts` | module | Create |
| Glyph metrics and fitting | `src/theme/metrics.ts` | module | Create |
| Web-only escape hatches | `src/theme/web.ts` | module | Create |
| Tones | `src/theme/tone.tsx` | context | Create |
| Layout | `src/theme/layout.tsx` | context + hook | Create |
| Type | `src/components/Type.tsx` | components | Create |
| Links | `src/components/Link.tsx` | components | Create |
| Primitives | `src/components/{DotGrid,Barcode,Icons,Marks,Grid,Band,SectionHead,Reveal,TiltCard}.tsx` | components | Create |
| Page shell | `src/components/Page.tsx` | component + context | Create |
| Chrome | `src/components/Masthead.tsx`, `src/components/Footer.tsx` | components | Create |
| Routes | `src/app/_layout.tsx`, `src/app/+html.tsx`, `src/app/+not-found.tsx`, `src/app/index.tsx`, `src/app/business.tsx` | routes | Create |
| Preview config | `.claude/launch.json` | config | Create |

### Interfaces
```ts
// src/theme/tokens.ts
export const color: {
  paper: '#f2efe6'; ink: '#111111'; accent: '#e0341b'; plate: '#26231f'; deck: '#d9d3c4';
  muteOnInk: '#cfc9bb'; muteOnPaper: '#3a3733'; hairOnInk: '#3a3733'; hairOnPaper: '#c9c3b4'; credit: '#d9d4c7';
  dotOnPlate: string; dotOnCover: string; dotOnDeck: string; dashOnInk: string;
  tagOnPlate: string; tagOnCover: string; tagOnDeck: string;
};
export const accentAlternates: readonly ['#d61c6c', '#2a44d9'];
export const font: { display: string; mono: string; monoSemi: string; serif: string; serifItalic: string };
export const fontSources: Record<string, number>;           // family name → require()d TTF
export const motion: { marqueeMs: 48000; hoverMs: 140; revealMs: 700; revealStepMs: 90; tiltMs: 260 };
export const BOARD_W = 1440;

// src/theme/metrics.ts
export const CH: { mono: 0.6; serif: 0.46 };                 // width of "0" in em
export function displayWidth(text: string, size: number, trackingEm?: number): number;
export function fitWords(text: string, maxWidth: number, size: number, trackingEm?: number): number;
export function fitLines(text: string, maxWidth: number, size: number, trackingEm?: number): number;

// src/theme/web.ts
export const isWeb: boolean;
export function webStyle<T>(style: Record<string, string | number>): T | undefined;
export function webProps(props: Record<string, unknown>): object;

// src/theme/tone.tsx
export type ToneName = 'light' | 'dark' | 'accent';
export type Tone = { name: ToneName; bg: string; fg: string; mute: string; hair: string; rule: string };
export const TONES: Record<ToneName, Tone>;
export function ToneProvider(p: { tone: ToneName; children: ReactNode }): JSX.Element;
export function useTone(): Tone;

// src/theme/layout.tsx
export type Breakpoint = 'phone' | 'tablet' | 'desktop';
export type Layout = {
  width: number; bp: Breakpoint; isPhone: boolean; isTablet: boolean; isDesktop: boolean;
  gutter: number;   // 20 | 40 | 64, plus the larger side safe-area inset on native
  inner: number;    // min(width, 1440) − 2·gutter
  s: number;        // desktop composition scale, min(1, width / 1440); 1 below desktop
  fl: (desktop: number, phone: number) => number;   // linear between width 375 and 1440, clamped
  hydrated: boolean; reduceMotion: boolean; motionReady: boolean;
  insets: { top: number; right: number; bottom: number; left: number };
};
export function computeLayout(width: number, hydrated: boolean, insets: Layout['insets']): Omit<Layout, 'reduceMotion' | 'motionReady'>;
export function LayoutProvider(p: { children: ReactNode }): JSX.Element;
export function useLayout(): Layout;

// src/components/Type.tsx
type TypeProps = Omit<TextProps, 'style'> & { size: number; color?: string; lh?: number; ls?: number; align?: TextStyle['textAlign']; maxCh?: number; style?: StyleProp<TextStyle> };
export function Display(p: TypeProps & { level?: 1 | 2 | 3; upper?: boolean }): JSX.Element;
export function Mono(p: Partial<Pick<TypeProps, 'size'>> & Omit<TypeProps, 'size'> & { weight?: 400 | 600; upper?: boolean }): JSX.Element;
export function Serif(p: TypeProps & { italic?: boolean }): JSX.Element;

// src/components/Link.tsx
export type PressState = { hovered: boolean; pressed: boolean };
export function isExternal(href: string): boolean;
export function openExternal(href: string): void;             // never throws
export function A(p: {
  href: string; dismissTo?: boolean; newTab?: boolean;
  onPress?: (e: GestureResponderEvent) => boolean | void;     // true = handled (caller prevented default)
  style?: StyleProp<ViewStyle> | ((s: PressState) => StyleProp<ViewStyle>);
  children: ReactNode | ((s: PressState) => ReactNode);
} & Omit<PressableProps, 'onPress' | 'style' | 'children'>): JSX.Element;
export function Btn(p: { href: string; label: string; variant?: 'solid' | 'outline'; shadow?: 'accent' | 'ink'; dismissTo?: boolean }): JSX.Element;
export function ULink(p: { href: string; children: string; size?: number; weight?: 400 | 600; ls?: number; dismissTo?: boolean; newTab?: boolean; label?: string }): JSX.Element;
export function NavLink(p: { href: string; label: string; current?: boolean; dismissTo?: boolean; onPress?: (e: GestureResponderEvent) => boolean | void }): JSX.Element;
export function Chip(p: { label: string; href?: string; icon?: IconName; a11yLabel?: string; placeholder?: boolean; dashed?: boolean }): JSX.Element;

// src/components/Page.tsx
export type SectionsApi = {
  register(id: string, y: number): void; setBase(y: number): void;
  scrollTo(id: string, animated?: boolean): void; scrollToTop(animated?: boolean): void;
};
export function Page(p: { children: ReactNode; section?: string }): JSX.Element;
export function Main(p: { children: ReactNode }): JSX.Element;
export function useSections(): SectionsApi | null;

// src/components/Band.tsx
export function Band(p: { tone: ToneName; id?: string; children: ReactNode; ruleTop?: boolean; ruleBottom?: boolean;
  padTop?: number; padBottom?: number; role?: Role; label?: string }): JSX.Element;
```

### Steps (ordered)

#### Step 1 — Config and fonts
- **Files:** `package.json`, `app.json`, `tsconfig.json`, `assets/fonts/`
- **Action:** Entry `expo-router/entry`; delete `App.tsx` and `index.ts`; static web output; splash plugin on paper; `@/*` path alias; five TTFs plus OFL texts; uninstall `@expo-google-fonts/*`.
- **Depends on:** none
- **Failure modes:** FM-1
- **Done when:** `package.json` main is `expo-router/entry`, and the five TTFs are present. (Done.)

#### Step 2 — Theme modules
- **Files:** `src/theme/tokens.ts`, `metrics.ts`, `web.ts`, `tone.tsx`, `layout.tsx`
- **Action:** Declare the interfaces above. `metrics.ts` embeds the Big Shoulders Display Black advance table measured with fontTools (units / 2000), unknown glyphs fall back to 0.5 em, and fits divide by a 1.03 safety factor. `LayoutProvider` holds `hydrated` (false on web until the first effect, true on native), reads `useWindowDimensions` only after hydration and uses 1440 before it, reads Reduce Motion via `matchMedia` on web and `AccessibilityInfo` on native, and sets `motionReady` once that value is known.
- **Depends on:** Step 1
- **Failure modes:** FM-2, FM-3
- **Done when:** `tsc` passes.

#### Step 3 — Type and link primitives
- **Files:** `src/components/Type.tsx`, `src/components/Link.tsx`
- **Action:** `Display` line height is `size × lh` on web and `size × max(lh, 0.84)` on native. `maxFontSizeMultiplier` is 1 for Display and 1.25 for Mono and Serif. Android gets `includeFontPadding: false`. `A` renders `Pressable` with `role="link"`. On web it adds `href` and, for http(s) with `newTab`, `hrefAttrs {target:_blank, rel:noopener noreferrer}`. On press: a caller handler runs first; external links do nothing on web (the anchor navigates) and call `openExternal` on native; internal links on web skip modified clicks, call `preventDefault`, then `router.dismissTo` or `router.push`.
- **Depends on:** Step 2
- **Failure modes:** FM-4, FM-5
- **Done when:** `tsc` passes.

#### Step 4 — Visual primitives
- **Files:** `src/components/{DotGrid,Barcode,Icons,Marks,Grid,Band,SectionHead,Reveal,TiltCard}.tsx`
- **Action:** `DotGrid` is an absolute-fill SVG with an 8 px `<Pattern>` circle (r 1.35) whose id comes from `useId()` with non-word characters stripped. `Barcode` is 10 cycles × 4 bars as absolutely positioned Views. `Grid` chunks children into rows of `cols` and pads short rows with spacers. `Band` is a full-bleed background with a centered frame of max width 1440 and horizontal padding `gutter`; with `id` it sets `nativeID` and registers its `onLayout` y. `Reveal` and `TiltCard` use Reanimated shared values and start only when `hydrated && motionReady`.
- **Depends on:** Step 3
- **Done when:** `tsc` passes.

#### Step 5 — Page shell and chrome
- **Files:** `src/components/Page.tsx`, `Masthead.tsx`, `Footer.tsx`
- **Action:** On web, `Page` renders a plain View (the document scrolls) and scrolls with `window.scrollTo`. On native it renders a status-bar spacer of `insets.top` and a `ScrollView` whose content bottom padding is `insets.bottom`. `useFocusEffect` reads `section` (or `location.hash` on web). With a target, it marks the target pending for 1500 ms (re-applied when sections re-layout), scrolls without animation, and clears `s` with `router.setParams`. Without a target on web, it scrolls to the top, except right after clearing its own param. The masthead is one 72 px row on desktop and two rows below that (logo + badge, then nav). The footer stacks on phone.
- **Depends on:** Step 4
- **Failure modes:** FM-6
- **Done when:** `tsc` passes.

#### Step 6 — Routes
- **Files:** `src/app/_layout.tsx`, `+html.tsx`, `+not-found.tsx`, `index.tsx`, `business.tsx`
- **Action:** `_layout` calls `SplashScreen.preventAutoHideAsync()` at module scope and loads `fontSources` with `useFonts`. It hides the splash when fonts are loaded or failed, and returns null before that. It renders `LayoutProvider` → a shell View (web: opacity 0 until hydrated, 300 ms fade) → `Slot` on web or `Stack` (no header, paper content) on native, plus `StatusBar style="dark"`. `+html` renders lang, charset, viewport, theme-color and OG site tags, plus inline CSS for background, focus-visible outline, selection and reduced motion. It does not render `ScrollViewStyleReset`.
- **Depends on:** Step 5
- **Failure modes:** FM-1, FM-2
- **Done when:** the F1 verification table passes.

#### Step 7 — Preview config
- **File:** `.claude/launch.json`
- **Action:** `blnk-web` runs `node node_modules/expo/bin/cli start --port 8081`. `blnk-dist` runs `node node_modules/expo/bin/cli serve --port 8082`.
- **Done when:** `preview_start blnk-web` serves `/`.

### Failure Mode Analysis
| ID | Step | What can fail | Detection | Behavior | Recovery |
|---|---|---|---|---|---|
| FM-1 | 1, 6 | A font asset fails to load | `useFonts` returns an error | Render with platform fonts; `console.warn('[BLNK] fonts', error)` | Fix the asset path and reload |
| FM-2 | 2, 6 | Server HTML differs from the first client render | React hydration error in the console | Prevented: width is fixed at 1440 until hydrated, and animations start in effects | Browser console check in verification |
| FM-3 | 2 | `matchMedia` or `AccessibilityInfo` unavailable | Missing API | `reduceMotion` false, `motionReady` true | None needed |
| FM-4 | 3 | `Linking.openURL` rejects | Promise rejection | Caught and logged as `[BLNK] could not open <url>` | User retries or copies the address |
| FM-5 | 3 | Modified click (cmd, ctrl, shift, middle) on an internal link | `nativeEvent` modifier flags | Default anchor behavior: new tab or window | n/a |
| FM-6 | 5 | Target section not laid out yet when the page gains focus | Offset missing in the registry | Target kept pending for 1500 ms and applied on registration | Falls back to the top of the page |

### Hazard Scan (this phase)
| Hazard | Applies | Mitigation in this spec |
|---|---|---|
| Data-systems hazards (lost update, dual write, retry, clock) | No | No persistence, no network writes |

### Contracts
- **5.1 Idempotency and delivery:** N/A. No side effects except user-initiated navigation.
- **5.2 Concurrency and isolation:** N/A. Single UI thread plus Reanimated worklets with no shared mutable state beyond shared values.
- **5.3 Schema and interface compatibility:** N/A. There is no stored data. The URL contract is `/`, `/business`, optional `?s=roster|mission|apply`, and optional `#roster|#mission|#apply`.
- **5.4 Data contract:** N/A.
- **5.5 Security contract:**
  - Trust boundary: the page and outbound links. There is no inbound input except the `s` query parameter and the URL hash.
  - Untrusted inputs: `s` and `location.hash` are only used as keys into the section registry. Unknown keys are ignored. They are never rendered or passed to navigation.
  - Outbound URLs: string constants in `src/content/*.ts`. `openExternal` is only called with those constants.
  - Web: http(s) links that open a new tab carry `rel="noopener noreferrer"`.
  - Authentication, authorization, secrets, freshness and audit: N/A.

### Observability
| Signal | Type | Where | Threshold |
|---|---|---|---|
| Font load failure | `console.warn('[BLNK] fonts', …)` | `_layout.tsx` | any |
| Outbound link failure | `console.warn('[BLNK] could not open …')` | `Link.tsx` | any |
| Hydration mismatch | React console error | browser | any = fail |
| Bundle size | `dist/_expo/static/js/web/*.js` bytes | F4 | > 1.5 MB = fail |

### Verification
| # | Check | Method | Passes when |
|---|---|---|---|
| 1 | Types | `npx tsc --noEmit` | exit 0 |
| 2 | Static export | `npx expo export --platform web` | exit 0, `dist/index.html` and `dist/business.html` exist |
| 3 | Fonts applied | browser `getComputedStyle` on the masthead wordmark, a nav link and the footer | families are Big Shoulders, Plex Mono and Instrument Serif |
| 4 | No hydration errors | browser console after load | no errors |
| 5 | Native bundles compile | `npx expo export --platform ios --platform android` | exit 0 (run in F4) |

### Rollback
- **Revert method:** delete the created files and restore `package.json` and `app.json` from git (`git checkout -- package.json app.json tsconfig.json`).
- **Data reversibility:** fully reversible. There is no data.
- **Point of no return:** none.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| RN Web ignores `textUnderlineOffset` | Low | Underline sits closer than the board | Computed-style check; fallback is the default underline |
| `router.dismissTo` pushes instead of popping on web | Low | Extra history entry | Acceptable on web, where `Slot` renders one route |

### Out of Scope
- Real photography and logos (recorded under Future Enhancement Notes).

---

## Phase F2: Issue 001 (`/`) — Specification

### Goal
`/` matches the Issue 001 board at 1440 and reflows at 820 and 390 with no horizontal overflow.

### Components
| Component | Path | Action |
|---|---|---|
| Site constants | `src/content/site.ts` | Create |
| Home copy | `src/content/home.ts` | Create |
| Cover and cover card | `src/sections/home/Cover.tsx` | Create |
| Marquee | `src/sections/home/Marquee.tsx` | Create |
| Roster | `src/sections/home/Roster.tsx` | Create |
| Mission | `src/sections/home/Mission.tsx` | Create |
| Apply | `src/sections/home/Apply.tsx` | Create |
| Route | `src/app/index.tsx` | Modify |

### Interfaces
```ts
// src/content/site.ts
export const EMAIL: 'business@BLNK.name';
export const SITE_URL: 'https://blnk.name';
export function mailto(subject?: string): string;   // mailto:business@BLNK.name?subject=<encodeURIComponent>
export const ISSUE: { no: 'Nº 001'; date: 'SEP 2026'; domain: 'BLNK.NAME' };

// src/content/home.ts
export type Social = { kind: IconName; label: string; href?: string; dashed?: boolean };
export type Stat = { value: string; label: string };
export type Creator = { n: string; name: string; kicker: string; hook: string; body: string;
  stats: [Stat, Stat, Stat]; socials: Social[]; photoLabel: string; photo?: ImageSourcePropType };
export const cover: {...}; export const marquee: string; export const roster: Creator[];
export const mission: { head: SectionCopy; values: { label: string; title: string; body: string }[]; quote: string; cite: string };
export const apply: { eyebrow: string; title: string; body: string; send: string[] };
```

### Steps (ordered)
1. **Content** (`site.ts`, `home.ts`): every string copied verbatim from the board, in board order. Mailto subjects: `BLNK Roster Application`.
2. **Cover** (`Cover.tsx`): the desktop row is `[text flex 1] gap 64·s [card 520·s]`; below desktop it stacks with the card width `min(520, inner)`. The h1 is `fitLines(cover.title, textW, fl(112, 58), -0.005)` so the designed line breaks hold. `CoverCard(k)`: the container is 520k wide with right padding 40k and bottom padding 44k. The accent block is absolute at (40k, 44k) to the bottom-right corner. `TiltCard rotate -2` holds a 480k × 640k plate with a 3 px ink border, a dot grid at 0.32, padding 24k and space-between. Small labels are `max(9, 11k)`.
3. **Marquee** (`Marquee.tsx`): a 56 px ink band with overflow hidden. The track is 20000 px wide so copies never wrap. The first copy's `onLayout` width sets `copyW`. Copies are `max(2, ceil(width / copyW) + 1)` (3 before measurement). `translateX` is `withRepeat(withTiming(-copyW, 48000, linear), -1)` once hydrated, motion-ready and Reduce Motion is off. The band is `aria-hidden`.
4. **Roster** (`Roster.tsx`): the photo column is 480·s on desktop, `round(inner × 0.38)` on tablet, and `inner` on phone. The gap is 64·s on desktop and 40 otherwise. The photo height keeps 3:2. The numeral is `fl(140, 88)`, absolute at `left -8, top -0.23·size`, accent, `aria-hidden`. The name is `fitWords(name, textW, fl(80, 52))`. One stat value size for all cards: `min(fl(48, 34), fitLines(value, colW, 48))` over every stat, where `colW = (textW − 2·gap) / 3`.
5. **Mission** (`Mission.tsx`): 4, 2 or 1 columns. The h3 size is fitted to the column across all four titles. The quote is `fl(72, 40)` italic with a max width of 22ch.
6. **Apply** (`Apply.tsx`): an accent band. The h2 is `fitLines('Issue 002\nis being cast.', inner, fl(160, 72), -0.01)`. Buttons are solid ink with an ink shadow, and outline ink. "What to send" is 4 columns, or 2 on phone.
7. **Route** (`index.tsx`): `Head` with title, description, `og:title`, `og:description`, `og:url` and canonical. Then `Page(section = s)` → `Masthead current="home"` → `Main` [Cover, Marquee, Band#roster, Band#mission, Band#apply] → `Footer variant="home"`.

### Failure Mode Analysis
| Step | What can fail | Detection | Behavior | Recovery |
|---|---|---|---|---|
| 3 | `onLayout` never fires (hidden view) | `copyW` stays 0 | 3 static copies; no animation | none needed |
| 4 | A new stat value is wider than the table assumes (unknown glyph) | Fallback advance 0.5 em | Conservative width, so text is smaller, never clipped | Add the glyph to `metrics.ts` |

### Contracts
5.1–5.4 N/A. 5.5: the social URLs and mailto subjects are constants in `home.ts` and `site.ts`.

### Verification
| # | Check | Method | Passes when |
|---|---|---|---|
| 1 | Types | `npx tsc --noEmit` | exit 0 |
| 2 | Copy fidelity | `get_page_text` at 1440 compared with the board strings | every heading, stat and label present |
| 3 | No overflow | `scrollWidth <= innerWidth` at 390, 820 and 1440 | true at all three |
| 4 | Section nav | click ROSTER / MISSION / APPLY | `scrollY` equals the section offset within ±2 px |
| 5 | Visual | screenshots at 1440 and 390 | composition matches the board: tilted card, overlapping numerals, accent band |

### Rollback
Revert the files listed in Components.

---

## Phase F3: Business (`/business`) — Specification

### Goal
`/business` matches the business board at 1440 and reflows at 820 and 390.

### Components
| Component | Path | Action |
|---|---|---|
| Business copy | `src/content/business.ts` | Create |
| Hero and media kit | `src/sections/business/BizHero.tsx` | Create |
| Clients | `src/sections/business/Clients.tsx` | Create |
| Sponsors | `src/sections/business/Sponsors.tsx` | Create |
| Cases | `src/sections/business/Cases.tsx` | Create |
| Decks | `src/sections/business/Decks.tsx` | Create |
| Rate card | `src/sections/business/RateCard.tsx` | Create |
| Brief | `src/sections/business/Brief.tsx` | Create |
| Route | `src/app/business.tsx` | Modify |

### Steps (ordered)
1. **Content**: every string verbatim. Mailto subjects: `BLNK Brand Brief`, `BLNK B2B Brief`, `BLNK Case Study 01`–`03`, `BLNK Media Kit request`, `BLNK Creator one-sheets request`, `BLNK Proposal example request`.
2. **BizHero**: the h1 is `fitWords('Put your brand\non the cover.', textW, fl(150, 64), -0.01)`, so it wraps as on the board. `MediaKitCard(k)`: the container has right and bottom padding of 40k and an absolute ink block. `TiltCard rotate +2` holds the accent card: width 480k, min height 380k, padding 28k, 3 px ink border. The rows have a 2 px top rule, and the last row adds a bottom rule. Values shrink and align right.
3. **Clients**: 2 columns (1 on phone), with a 3 px paper top rule. The 96 px dashed logo slot sits beside the accent numeral `fl(56, 44)`. The name is fitted to the column. Items without a URL render as muted text, not links.
4. **Sponsors**: 4 columns on desktop, 2 below that. Tile height `fl(280, 190)`, padding `fl(24, 14)`, 2 px ink border. One name size for all tiles, fitted to the tile's inner width.
5. **Cases**: 3 columns on desktop, 1 below that. Cards with 2 px paper borders stretch to equal height. Definition rows use 1 px hairlines, with the value right-aligned and shrinking.
6. **Decks**: 3 columns on desktop and tablet, 1 on phone. Covers are 224 px deck-colored with an ink dot grid at 0.5, a paper tag and a PDF label.
7. **RateCard**: desktop and tablet rows are `[num 80·s | 48] [name flex 3] [desc flex 5] [rate 200·s | 120]` with gap 32·s or 24. On phone: number and rate on the top line, then name, then description. One name size fitted to the name column across all seven rows.
8. **Brief**: accent band. `fitLines('Start\na brief.', …)`, a mailto button, and a BACK TO ISSUE 001 outline button with `dismissTo`.
9. **Route**: `Head`, then `Page` → `Masthead current="business"` → `Main` [BizHero, Clients, Sponsors, Cases, Decks, RateCard, Brief] → `Footer variant="business"`.

### Failure Mode Analysis
| Step | What can fail | Detection | Behavior | Recovery |
|---|---|---|---|---|
| 2 | Card content taller than 380k on phone | Layout | Card grows (min height), and the ink block follows because it is absolute to the container | none |
| 7 | Rate text wider than its column | Layout | Wraps inside the column | none |

### Contracts
5.1–5.4 N/A. 5.5: client URLs (`https://pesito.la/en`, `https://risingfounder.net/`) are constants in `business.ts`.

### Verification
| # | Check | Method | Passes when |
|---|---|---|---|
| 1 | Types | `npx tsc --noEmit` | exit 0 |
| 2 | Copy fidelity | `get_page_text` at 1440 | every heading, row and label present |
| 3 | No overflow | `scrollWidth <= innerWidth` at 390, 820 and 1440 | true |
| 4 | Cross-page nav | click ROSTER on `/business` | URL is `/`, and `scrollY` equals the roster offset within ±2 px |
| 5 | Visual | screenshots at 1440 and 390 | composition matches the board |

### Rollback
Revert the files listed in Components.

---

## Phase F4: Motion, accessibility, release prep — Specification

### Goal
The motion layer, accessibility, icons and documentation are finished, and every build target passes.

### Steps (ordered)
1. **Reveal wiring**: `Reveal i={0..4}` wraps the eyebrow, h1, lede, calls to action and card in both heroes. Each step delays 120 + 90·i ms, runs 700 ms with ease-out cubic, and rises 18 px. Under Reduce Motion the value is set to 1 immediately.
2. **Tilt**: `TiltCard` animates rotate from the given angle to 0 and translates (−4, −4) over 260 ms on hover-in or press-in (100 ms press delay), and reverses on out. It is static under Reduce Motion.
3. **Accessibility**: masthead `banner`, nav `navigation` with label "Sections", `main`, bands `region` with labels, cards `article`, footer `contentinfo`. Headings: h1 once per page, h2 per band, h3 per card. Chips get `a11yLabel` "<Creator> on <Platform>". Numerals, the marquee, dot grids and the barcode are hidden from assistive tech.
4. **Icons** (Pillow + the vendored font): `icon.png` 1024 (ink, paper BLNK, accent square), `android-icon-foreground.png` (mark inside the 66% safe zone, transparent), `android-icon-background.png` (ink), `android-icon-monochrome.png` (white mark), `splash-icon.png` (ink mark, transparent), `favicon.png` 48 (accent, ink B).
5. **README.md**: run and export commands, file map, content editing, photo and logo slots, deploy notes.
6. **Gates**: `npx expo lint`, `npx tsc --noEmit`, `npx expo-doctor`, `npx expo export --platform web --platform ios --platform android`; record sizes.

### Verification
| # | Check | Method | Passes when |
|---|---|---|---|
| 1 | Reduced motion | emulate `prefers-reduced-motion`, sample the marquee transform twice 2 s apart | identical |
| 2 | Accessibility tree | `read_page` | headings h1–h3 present; every chip has a name |
| 3 | Lint, types, doctor | commands above | exit 0, or findings fixed |
| 4 | Exports | web, ios, android | exit 0 |
| 5 | Budgets | byte sizes in `dist/` | JS ≤ 1.5 MB, fonts ≤ 600 KB |

### Rollback
Revert the touched files. Icon PNGs can be restored from git.

---

## Future Enhancement Notes
- Replace photo, logo and deck placeholders with real assets. `photo` fields already exist on creators, and the logo slot can take an `Image`.
- Fill `[DATE]`, `[N]`, `[X]`, `[RATE]` and the case-study fields when the numbers exist.
- Add `expo-image` if photos arrive in volume (caching, blurhash placeholders).
- Add an Open Graph image (1200×630 cover render) once a cover photo exists.
