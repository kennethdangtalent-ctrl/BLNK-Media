/*
 * Design tokens for the BLNK magazine identity (October 2026): white, black and three reds. Clean
 * white pages and black type like a premium print title; oxblood owns the big sections (roster,
 * case studies); one crimson red does every job red does (buttons, stickers, serials, highlighted
 * words), always with white type on it. No cream, no neon.
 */

export const color = {
  /** The page: an uncoated paper tone, light warm grey, low enough in saturation to never read as cream. */
  stock: '#efeee9',
  /** Printer's black. Type, rules and the footer. */
  ink: '#0d0d0d',
  /** Bright white sheet: taped notes and scraps laid on the page. */
  paper: '#ffffff',
  /** Oxblood. Owns whole sections; the brand color. */
  brand: '#5c0d12',
  /** Saturated crimson. Loud sections and calls to action; white type on it. */
  crimson: '#c1001f',
  /** The one red, used the same way everywhere: stickers, serials, highlighted words, buttons. Same as crimson. */
  hi: '#c1001f',
  /** Text on the red: white. */
  onHi: '#ffffff',
  /** Secondary text on white. */
  greyOnPaper: '#4a4a47',
  /** Secondary text on black. */
  greyOnInk: '#b4b4ae',
  /** Secondary text on oxblood. */
  greyOnBrand: '#e3bdb9',
  /** Secondary text on crimson. */
  greyOnCrimson: '#ffd6d9',
  /** Secondary text on the page. */
  muteOnStock: '#4a4a48',
  /** A thin rule on a dark section: the page showing through. */
  ruleOnInk: 'rgba(250, 250, 248, 0.28)',
  /** Masking tape: translucent beige-brown, so it reads on white notes and on the paper tone alike. */
  tape: 'rgba(196, 178, 140, 0.72)',
  /** Placeholder fills, so empty photo slots read as unprinted space. */
  blankOnInk: 'rgba(243, 243, 239, 0.12)',
  blankOnPaper: 'rgba(13, 13, 13, 0.08)',
  /** Back-compat aliases for components that still name the old roles. */
  accent: '#c1001f',
  plate: '#0d0d0d',
} as const;
export const font = {
  /** Libre Franklin Black: the Letraset gothic every photocopied flyer was set in. Display caps only. */
  display: 'LibreFranklin-Black',
  /** Libre Franklin Bold: labels, nav, buttons, stat figures. */
  bold: 'LibreFranklin-Bold',
  /** Libre Franklin Regular: running text. */
  text: 'LibreFranklin-Regular',
  /** Libre Franklin Italic: decks and pull lines. */
  italic: 'LibreFranklin-Italic',
} as const;

/** Each cut is registered under its own family name; weight and style are never synthesized. */
export const fontSources = {
  [font.display]: require('../../assets/fonts/LibreFranklin_900Black.ttf'),
  [font.bold]: require('../../assets/fonts/LibreFranklin_700Bold.ttf'),
  [font.text]: require('../../assets/fonts/LibreFranklin_400Regular.ttf'),
  [font.italic]: require('../../assets/fonts/LibreFranklin_400Regular_Italic.ttf'),
};

export const motion = {
  marqueeMs: 48_000,
  revealMs: 520,
  revealStepMs: 70,
  revealDelayMs: 80,
  tiltMs: 200,
} as const;

/** Width of the design frame. Content frames never grow past it. */
export const BOARD_W = 1440;
