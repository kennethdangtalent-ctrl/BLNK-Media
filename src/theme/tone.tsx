import { createContext, useContext, type ReactNode } from 'react';

import { color } from './tokens';

/**
 * `stock` is the white page, `paper` a brighter sheet laid on it, `brand` a full oxblood section,
 * `crimson` a full saturated-red one,
 * `ink` a black one. Legacy names map onto these: `light` prints on the page, `accent` on the
 * bright white sheet (the apply and brief sections stay easy on the eyes), `dark` on oxblood.
 */
export type ToneName = 'stock' | 'paper' | 'brand' | 'crimson' | 'ink' | 'accent' | 'light' | 'dark';

export type Tone = {
  name: ToneName;
  bg: string;
  fg: string;
  mute: string;
  hair: string;
};

const stock: Tone = { name: 'stock', bg: color.stock, fg: color.ink, mute: color.muteOnStock, hair: color.ink };
const paper: Tone = { name: 'paper', bg: color.paper, fg: color.ink, mute: color.greyOnPaper, hair: color.ink };
const brand: Tone = { name: 'brand', bg: color.brand, fg: color.stock, mute: color.greyOnBrand, hair: color.ruleOnInk };
const crimson: Tone = { name: 'crimson', bg: color.crimson, fg: color.paper, mute: color.greyOnCrimson, hair: color.ruleOnInk };
const ink: Tone = { name: 'ink', bg: color.ink, fg: color.stock, mute: color.greyOnInk, hair: color.ruleOnInk };

export const TONES: Record<ToneName, Tone> = {
  stock,
  paper,
  brand,
  crimson,
  ink,
  accent: { ...paper, name: 'accent' },
  light: { ...stock, name: 'light' },
  dark: { ...brand, name: 'dark' },
};

const ToneContext = createContext<Tone>(TONES.stock);

/** Text and rules inside a band read their colors from the band's tone. */
export function ToneProvider({ tone, children }: { tone: ToneName; children: ReactNode }) {
  return <ToneContext.Provider value={TONES[tone]}>{children}</ToneContext.Provider>;
}

export function useTone(): Tone {
  return useContext(ToneContext);
}
