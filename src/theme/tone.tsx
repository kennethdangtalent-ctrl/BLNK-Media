import { createContext, useContext, type ReactNode } from 'react';

import { color } from './tokens';

export type ToneName = 'light' | 'dark' | 'accent';

export type Tone = {
  name: ToneName;
  bg: string;
  fg: string;
  mute: string;
  hair: string;
};

export const TONES: Record<ToneName, Tone> = {
  light: { name: 'light', bg: color.paper, fg: color.ink, mute: color.muteOnPaper, hair: color.hairOnPaper },
  dark: { name: 'dark', bg: color.ink, fg: color.paper, mute: color.muteOnInk, hair: color.hairOnInk },
  accent: { name: 'accent', bg: color.accent, fg: color.ink, mute: color.ink, hair: color.ink },
};

const ToneContext = createContext<Tone>(TONES.light);

/** Text and hairlines inside a band read their colors from the band's tone. */
export function ToneProvider({ tone, children }: { tone: ToneName; children: ReactNode }) {
  return <ToneContext.Provider value={TONES[tone]}>{children}</ToneContext.Provider>;
}

export function useTone(): Tone {
  return useContext(ToneContext);
}
