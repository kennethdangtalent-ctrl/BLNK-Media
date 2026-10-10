/* The Mission page copy. The thesis is verbatim from the founder's brief, with typographic apostrophes and dashes only. */
import type { SectionCopy } from './home';
import type { PhotoSubject } from '@/components/PhotoSlot';

export type ThesisLine = { kind: 'lead' | 'body' | 'pull'; text: string };

export const thesis: { eyebrow: string; title: string; lines: readonly ThesisLine[] } = {
  eyebrow: '01 — THE THESIS',
  title: 'The thesis.',
  lines: [
    { kind: 'lead', text: 'BLNK exists to build the infrastructure and brand layer for the next generation of internet creators.' },
    {
      kind: 'body',
      text: 'The creator economy is becoming a real industry, but most creators are still operating like independent businesses with fragmented tools, inconsistent representation, and no institutional infrastructure behind them.',
    },
    { kind: 'pull', text: 'BLNK starts with talent.' },
    {
      kind: 'body',
      text: 'We identify high-potential creators, help them build their brand, connect them with opportunities, and handle the business side they don’t have the time or expertise to handle themselves.',
    },
    { kind: 'pull', text: 'But talent management is only the entry point.' },
    { kind: 'body', text: 'The long-term goal is to build a company that sits between creators, brands, audiences, and capital.' },
  ],
};

export const chain: { eyebrow: string; intro: string; steps: readonly string[] } = {
  eyebrow: '02 — THE LONG GAME',
  intro: 'Think:',
  steps: ['Creator talent', 'Media', 'Brand partnerships', 'Technology', 'Capital'],
};

export const mission: {
  head: SectionCopy;
  values: readonly { label: string; title: string; body: string }[];
  quote: string;
  cite: string;
} = {
  head: {
    eyebrow: '03 — THE MISSION',
    title: 'The mission.',
    dek: 'Four things we look for. None of them is a follower count.',
  },
  values: [
    {
      label: '01 — BELIEF',
      title: 'Great creators come from anywhere.',
      body: "A small channel with a clear voice is a cover story that hasn't been shot yet.",
    },
    {
      label: '02 — BOLDNESS',
      title: 'Start before you feel ready.',
      body: 'We look for people already streaming the schedule, not people planning to.',
    },
    {
      label: '03 — RANGE',
      title: 'There is no blueprint.',
      body: 'Lifestyle, anime art, Roblox, short film, IRL challenges. Every creator on our roster plays a different sport.',
    },
    {
      label: '04 — CONVICTION',
      title: 'Show up. Keep going.',
      body: 'Consistency beats a viral clip. We back the ones who stream through the dead nights.',
    },
  ],
  quote: 'Every name on our roster was a DM once.',
  cite: '— BLNK MEDIA',
};

export const founder: PhotoSubject & { eyebrow: string; role: string; school: string; bio: string } = {
  eyebrow: '04 — THE FOUNDER',
  name: 'Kenneth Dang',
  role: 'CEO',
  school: 'Marketing — Cal Poly San Luis Obispo',
  bio: 'Kenneth founded BLNK Media after studying Business Administration at Cal Poly SLO, with a background in organic content strategy and brand storytelling. Based in the Bay Area, he worked hands-on with every creator and brand partner, from first pitch to final post.',
  photoLabel: '[PHOTO — KENNETH DANG]',
  photo: require('../../assets/team/kenneth-dang.jpg'),
  photoFocus: 22,
};
