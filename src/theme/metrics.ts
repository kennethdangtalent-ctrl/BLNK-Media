/**
 * Advance widths of Libre Franklin Black in em, read from the vendored TTF
 * (hmtx advance / unitsPerEm). Display text is always set in capitals, so only
 * capitals, figures and punctuation are listed.
 *
 * React Native has no synchronous text measurement, so the layout uses this table to
 * pick display sizes that fit a column on every platform. Kerning is ignored, which
 * overestimates width slightly; the safety factor covers rendering differences.
 */
const ADVANCE: Record<string, number> = {
  ' ': 0.2, '!': 0.277, '"': 0.509, '#': 0.603, $: 0.687, '%': 0.963, '&': 0.878, "'": 0.253,
  '(': 0.332, ')': 0.332, '*': 0.521, '+': 0.6, ',': 0.279, '-': 0.38, '.': 0.279, '/': 0.38,
  '0': 0.722, '1': 0.537, '2': 0.673, '3': 0.685, '4': 0.716, '5': 0.69, '6': 0.701, '7': 0.632,
  '8': 0.693, '9': 0.701, ':': 0.279, ';': 0.279, '<': 0.599, '=': 0.6, '>': 0.599, '?': 0.546,
  '@': 0.834, A: 0.799, B: 0.739, C: 0.737, D: 0.771, E: 0.671, F: 0.65, G: 0.761, H: 0.762,
  I: 0.331, J: 0.467, K: 0.772, L: 0.643, M: 0.977, N: 0.761, O: 0.78, P: 0.731, Q: 0.782,
  R: 0.739, S: 0.701, T: 0.704, U: 0.728, V: 0.751, W: 1.109, X: 0.756, Y: 0.774, Z: 0.714,
  '[': 0.336, ']': 0.336, _: 0.562, '×': 0.6, '·': 0.279, '—': 0.928, 'º': 0.391, '’': 0.253,
  '‘': 0.253, '“': 0.509, '”': 0.514, '–': 0.602, '→': 0.612, '←': 0.612, '↗': 0.612,
};

const FALLBACK_ADVANCE = 0.72;
const SAFETY = 1.03;

/**
 * Average prose character width in em for Libre Franklin Regular and Italic. Franklin's figures
 * are tabular and wide (0.688 em), so a true `ch` would overshoot a 65-character measure.
 */
export const CH = { copy: 0.52, deck: 0.5 } as const;

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
