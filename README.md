# BLNK Media — BLNK.name

The BLNK Media website, built with Expo (SDK 57) and Expo Router. The same code runs as a native app in **Expo Go** on iOS and Android and exports as a **static website** for any host.

It is a build of the Claude Design file `BLNK-site.html`, which has two 1440 px desktop boards:

| Route | Board | What it is |
|---|---|---|
| `/` | BLNK.name — Desktop | Issue 001: cover, roster of five creators, mission, applications |
| `/business` | BLNK.name/business — Desktop | Clients, sponsors, case studies, media decks, rate card, booking |

At 1440 px the pages match the boards. Tablet and phone layouts use the same tokens and type.

## Run it

```bash
npm install
```

**In Expo Go (phone or tablet).** Install Expo Go from the App Store or Google Play, then start the dev server and scan the QR code. On iPhone, scan with the Camera app; on Android, scan from inside Expo Go.

```bash
npx expo start
```

If the phone is not on the same Wi-Fi network as the computer, use a tunnel:

```bash
npx expo start --tunnel
```

**In a browser.** Start the dev server with web open:

```bash
npx expo start --web
```

## Build the website

```bash
npm run export
```

This writes a static site to `dist/`, with one HTML file per route (`index.html`, `business.html`). Every page carries its own title, description, Open Graph tags and canonical URL. To preview the production build locally:

```bash
npm run serve
```

To deploy, upload `dist/` to any static host. For Cloudflare Pages, set the build command to `npx expo export --platform web` and the output directory to `dist`. Netlify and Vercel work the same way.

## Checks

```bash
npm run typecheck
npm run lint
npx expo-doctor
```

## Where things live

| Path | What it holds |
|---|---|
| `src/content/home.ts` | Every string on Issue 001: cover, roster, stats, socials, mission, applications |
| `src/content/business.ts` | Every string on the business page: clients, sponsors, cases, decks, rates |
| `src/content/site.ts` | Email, domain, mailto subjects, page metadata, footer notes |
| `src/theme/tokens.ts` | Colors, fonts, rules and motion timings from the boards |
| `src/theme/layout.tsx` | Breakpoints (phone < 768, tablet < 1100, desktop), gutters and fluid sizes |
| `src/theme/metrics.ts` | Big Shoulders glyph widths, used to size headlines so they never overflow a column |
| `src/components/` | Shared pieces: type, links and buttons, masthead, footer, bands, grid, dot grid |
| `src/sections/home/`, `src/sections/business/` | One file per section of each page |
| `src/app/` | Routes (`index.tsx`, `business.tsx`), the root layout and the web HTML shell |
| `assets/fonts/` | Big Shoulders Display, IBM Plex Mono and Instrument Serif, with their OFL licenses |

## Editing content

All copy is plain data in `src/content/`. Change a string there and every platform picks it up. The boards ship with placeholders such as `[DATE]`, `[N]`, `[RATE]` and `[X]`; they appear in the content files exactly as written, so a search for `[` finds all of them.

**Adding creator photos.** Put the image in `assets/creators/` and set the creator's `photo` field in `src/content/home.ts`. By default the photo fills the card's 480 × 320 slot, and `photoFocus` sets the crop point in percent from the top. Selfies usually read best around 25.

```ts
photo: require('../../assets/creators/novapovie.jpg'),
photoFocus: 25,
```

The current creator photos are 150 px squares, too small to fill the slot. They use `photoStyle: 'print'`, which mounts the photo as a tilted instant print on the halftone plate. To switch a creator to a full-size original, replace the file and delete the `photoStyle` line.

The magazine cover takes `cover.card.photo` and `cover.card.photoFocus` the same way, and a portrait suits its 3:4 shape. Use full-size originals: the roster slot is 480 × 320 and the cover is 480 × 640, so small previews look soft.

**Creator logos.** A creator without a photo can show a logo instead, set through the `logo` field. It sits on the dark halftone plate as a tilted die-cut sticker with an accent shadow cut to its outline, so it needs a transparent PNG. fumibean's sticker, `assets/creators/fumibun-sticker.png`, was keyed out of the original square logo, which is kept beside it as `fumibun-logo.png`.

**Client and sponsor logos.** Set the `logo` fields in `src/content/business.ts`, and deck covers through `cover`. When an image is set, it replaces the dashed placeholder label.

**Changing the accent.** The boards offer three accents. The default `#e0341b` lives in `color.accent` in `src/theme/tokens.ts`, and the other two are listed in `accentAlternates`.

## How it behaves

- **Navigation.** ROSTER, MISSION and APPLY scroll to their section on Issue 001. From other pages they open `/?s=<section>`, which lands on that section; `/#roster` style links work too.
- **Links.** Social and client links open in the system browser on native and in a new tab on web. Email links open the mail app with the subject filled in.
- **Motion.** A 48-second marquee, a staggered entrance on both heroes, a hard-shadow lift on buttons, and cards that square up on hover or press. On iOS and Android the motion runs on the UI thread with Reanimated. On the web the same motion is plain CSS (`*.web.tsx` files), which keeps Reanimated out of the web bundle. Everything stops when the device asks for reduced motion.
- **Web scrolling.** The document scrolls on the web, not an inner container, so browser gestures, anchors and the mobile toolbar behave normally.
