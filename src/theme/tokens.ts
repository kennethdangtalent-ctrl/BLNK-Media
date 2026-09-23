/* Design tokens extracted from the BLNK.name boards (Claude Design bundle, Issue 001, September 2026). */

export const color = {
  paper: '#f2efe6',
  ink: '#111111',
  accent: '#e0341b',
  plate: '#26231f',
  deck: '#d9d3c4',
  muteOnInk: '#cfc9bb',
  muteOnPaper: '#3a3733',
  hairOnInk: '#3a3733',
  hairOnPaper: '#c9c3b4',
  credit: '#d9d4c7',
  dotOnPlate: 'rgba(242, 239, 230, 0.3)',
  dotOnCover: 'rgba(242, 239, 230, 0.32)',
  dotOnDeck: 'rgba(17, 17, 17, 0.5)',
  dashOnInk: 'rgba(242, 239, 230, 0.7)',
  tagOnPlate: 'rgba(17, 17, 17, 0.6)',
  tagOnCover: 'rgba(17, 17, 17, 0.55)',
  tagOnDeck: 'rgba(242, 239, 230, 0.85)',
} as const;

/** The other two accents offered by the board's brand control. */
export const accentAlternates = ['#d61c6c', '#2a44d9'] as const;

export const font = {
  display: 'BigShouldersDisplay-Black',
  mono: 'IBMPlexMono-Regular',
  monoSemi: 'IBMPlexMono-SemiBold',
  serif: 'InstrumentSerif-Regular',
  serifItalic: 'InstrumentSerif-Italic',
} as const;

/** Each cut is registered under its own family name; weight and style are never synthesized. */
export const fontSources = {
  [font.display]: require('../../assets/fonts/BigShouldersDisplay_900Black.ttf'),
  [font.mono]: require('../../assets/fonts/IBMPlexMono_400Regular.ttf'),
  [font.monoSemi]: require('../../assets/fonts/IBMPlexMono_600SemiBold.ttf'),
  [font.serif]: require('../../assets/fonts/InstrumentSerif_400Regular.ttf'),
  [font.serifItalic]: require('../../assets/fonts/InstrumentSerif_400Regular_Italic.ttf'),
};

export const motion = {
  marqueeMs: 48_000,
  revealMs: 700,
  revealStepMs: 90,
  revealDelayMs: 120,
  tiltMs: 260,
} as const;

/** Width of the design boards. Content frames never grow past it. */
export const BOARD_W = 1440;
