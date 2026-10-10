/* The Mission page copy, in the founder's own plain voice (rewritten with the founder, October 2026). */
import type { SectionCopy } from './home';
import type { PhotoSubject } from '@/components/PhotoSlot';

export type ThesisLine = { kind: 'lead' | 'body' | 'pull'; text: string };

export const thesis: { eyebrow: string; title: string; lines: readonly ThesisLine[] } = {
  eyebrow: '01 — WHY BLNK',
  title: 'Why BLNK exists.',
  lines: [
    {
      kind: 'lead',
      text: 'BLNK is a creator management company. We help streamers and creators turn what they love doing into a real career.',
    },
    {
      kind: 'body',
      text: 'Creating is a real job now, but most creators are still doing everything on their own: pitching brands, reading contracts, chasing invoices, and trying to grow at the same time. Very few have anyone in their corner.',
    },
    { kind: 'pull', text: 'We start with the creators.' },
    {
      kind: 'body',
      text: 'We find people early, help them figure out their brand, bring them sponsorships that actually fit, and take care of the business side so they can focus on making things.',
    },
    { kind: 'pull', text: 'And we’re in it for the long run.' },
    {
      kind: 'body',
      text: 'Management is where it starts. Over time, we want BLNK to be where creators, brands and their audiences meet, with media, technology and funding built around the talent.',
    },
  ],
};

export const chain: { eyebrow: string; intro: string; steps: readonly string[] } = {
  eyebrow: '02 — THE LONG GAME',
  intro: 'Where it goes from here:',
  steps: ['Creator talent', 'Media', 'Brand partnerships', 'Technology', 'Capital'],
};

export const mission: {
  head: SectionCopy;
  values: readonly { label: string; title: string; body: string }[];
  quote: string;
  cite: string;
} = {
  head: {
    eyebrow: '03 — WHAT WE LOOK FOR',
    title: 'What we look for.',
    dek: 'Four things we notice in a creator. Follower count isn’t one of them.',
  },
  values: [
    {
      label: '01 — BELIEF',
      title: 'Great creators come from anywhere.',
      body: 'Some of our favorite channels were tiny when we found them. If your voice is clear, the size of your audience matters a lot less.',
    },
    {
      label: '02 — BOLDNESS',
      title: 'Start before you feel ready.',
      body: 'We’d rather work with someone already streaming on a schedule than someone still planning their first one.',
    },
    {
      label: '03 — RANGE',
      title: 'There’s no one right way.',
      body: 'Lifestyle, anime art, Roblox, short films, IRL challenges. Everyone on our roster does something different, and that’s on purpose.',
    },
    {
      label: '04 — CONVICTION',
      title: 'Show up. Keep going.',
      body: 'A viral clip is nice. Showing up week after week is what builds a career, and those are the creators we back.',
    },
  ],
  quote: 'If you’re serious about creating, we’d love to hear from you.',
  cite: '— BLNK MEDIA',
};

export const founder: PhotoSubject & { eyebrow: string; role: string; school: string; bio: string } = {
  eyebrow: '04 — THE FOUNDER',
  name: 'Kenneth Dang',
  role: 'CEO',
  school: 'Marketing — Cal Poly San Luis Obispo',
  bio: 'Kenneth started BLNK Media after studying at Cal Poly San Luis Obispo, where he got into organic content strategy and brand storytelling. He’s based in the Bay Area and works directly with every creator and brand partner, from the first pitch to the final post.',
  photoLabel: '[PHOTO — KENNETH DANG]',
  photo: require('../../assets/team/kenneth-dang.jpg'),
  photoFocus: 22,
};
