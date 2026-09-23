/**
 * Advance widths of Big Shoulders Display Black in em, read from the vendored TTF
 * (hmtx advance / unitsPerEm 2000). Display text is always set in capitals, so only
 * capitals, figures and punctuation are listed.
 *
 * React Native has no synchronous text measurement, so the layout uses this table to
 * pick display sizes that fit a column on every platform. Kerning is ignored, which
 * overestimates width slightly; the safety factor covers rendering differences.
 */
const ADVANCE: Record<string, number> = {
  ' ': 0.22, '!': 0.25, '"': 0.403, '#': 0.736, $: 0.474, '%': 0.682, '&': 0.619, "'": 0.203,
  '(': 0.292, ')': 0.292, '*': 0.252, '+': 0.536, ',': 0.251, '-': 0.446, '.': 0.25, '/': 0.41,
  '0': 0.507, '1': 0.274, '2': 0.49, '3': 0.504, '4': 0.511, '5': 0.515, '6': 0.4985, '7': 0.485,
  '8': 0.5005, '9': 0.499, ':': 0.25, ';': 0.251, '<': 0.553, '=': 0.516, '>': 0.553, '?': 0.48,
  '@': 0.724, A: 0.478, B: 0.4725, C: 0.49, D: 0.495, E: 0.408, F: 0.406, G: 0.493, H: 0.485,
  I: 0.23, J: 0.4525, K: 0.4965, L: 0.402, M: 0.745, N: 0.543, O: 0.4965, P: 0.4705, Q: 0.4965,
  R: 0.477, S: 0.474, T: 0.419, U: 0.487, V: 0.494, W: 0.8, X: 0.471, Y: 0.465, Z: 0.418,
  '[': 0.356, ']': 0.356, _: 0.656, '×': 0.482, '·': 0.189, '—': 0.902, 'º': 0.406, '’': 0.251,
  '→': 0.88, '←': 0.88, '↗': 0.653,
};

const FALLBACK_ADVANCE = 0.5;
const SAFETY = 1.03;

/** Width of the digit zero in em, which is what CSS `ch` measures. */
export const CH = { mono: 0.6, serif: 0.46 } as const;

/** Rendered width in px of `text` set in display capitals at `size` with `trackingEm` letter-spacing. */
export function displayWidth(text: string, size: number, trackingEm = 0): number {
  let em = 0;
  for (const glyph of text.toUpperCase()) em += (ADVANCE[glyph] ?? FALLBACK_ADVANCE) + trackingEm;
  return em * size;
}

function fitUnits(units: string[], maxWidth: number, size: number, trackingEm: number): number {
  const widest = Math.max(0.001, ...units.map((unit) => displayWidth(unit, 1, trackingEm)));
  return Math.max(1, Math.floor(Math.min(size, maxWidth / SAFETY / widest)));
}

/** Largest size up to `size` at which every word fits `maxWidth`, so text only breaks between words. */
export function fitWords(text: string, maxWidth: number, size: number, trackingEm = 0): number {
  return fitUnits(text.split(/\s+/).filter(Boolean), maxWidth, size, trackingEm);
}

/** Largest size up to `size` at which every `\n`-separated line fits `maxWidth` without wrapping. */
export function fitLines(text: string, maxWidth: number, size: number, trackingEm = 0): number {
  return fitUnits(text.split('\n'), maxWidth, size, trackingEm);
}
