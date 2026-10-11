/* Business pages copy, verbatim from the "BLNK.name/business — Desktop" board. Bracketed text is a placeholder the board ships with. */
import type { ImageSourcePropType } from 'react-native';

import type { SectionCopy } from './home';
import { contactHref } from './contact';

export const bizHero = {
  eyebrow: '04 — OUR WORK',
  title: 'The work\nso far.',
  /** The word printed in crimson in the title. */
  accent: 'work',
  lede: 'Who we work with, the campaigns we’ve run, and the decks to send your team.',
  cta: { label: 'START A BRIEF →', href: contactHref('brief') },
  back: { label: '← Back to home', href: '/' },
} as const;

export type Client = {
  n: string;
  logoLabel: string;
  /** Drop a logo in with `logo: require('../../assets/logos/pesito.png')`. */
  logo?: ImageSourcePropType;
  /** Width ÷ height of `logo`. Wide wordmarks get a wider slot at the same height. Default 1. */
  logoAspect?: number;
  /** A one-color logo (white or black art) printed in ink so it shows on the light page. Keep off for full-color logos. */
  logoInk?: boolean;
  kicker: string;
  name: string;
  line: string;
  body: string;
  link: { label: string; href?: string };
};

export const clients: { head: SectionCopy; items: readonly Client[] } = {
  head: {
    eyebrow: 'B2B — CLIENTS & CURRENT PARTNERS',
    title: 'Clients.',
    dek: 'Companies that hire BLNK, and companies building with it.',
  },
  items: [
    {
      n: '01',
      logoLabel: '[LOGO]',
      logo: require('../../assets/logos/pesito.png'),
      kicker: 'PARTNER · FINTECH · PRE-LAUNCH',
      name: 'Pesito',
      line: 'One Wallet for families across the Americas',
      body: 'Send money to Mexico for 1%, capped at $1. Pre-launch. Waitlist open.',
      link: { label: 'PESITO.LA ↗', href: 'https://pesito.la/en' },
    },
    {
      n: '02',
      logoLabel: '[LOGO]',
      logo: require('../../assets/logos/rising-founders.png'),
      logoAspect: 325 / 75,
      logoInk: true,
      kicker: 'PARTNER · FOUNDER PROGRAM · 23 AND UNDER',
      name: 'J Rising Founder',
      line: 'An early chance for extraordinary founders.',
      body: 'Free, remote, three months. No fee, no equity.',
      link: { label: 'RISINGFOUNDER.NET ↗', href: 'https://risingfounder.net/' },
    },
  ],
};

/**
 * Who we work with, in two groups: partners (companies BLNK works with directly, business to business)
 * and the brands BLNK's creators have been sponsored by.
 */
export const proof = {
  title: 'Who we work with.',
  accent: 'work with',
  partners: { title: 'Partners', dek: 'Companies that hire BLNK, and companies building with it.' },
  brands: { title: 'Brands our creators have worked with' },
} as const;

/** The brand half of the services, as previewed on the business page. */
export const sponsors: {
  head: SectionCopy;
  logoLabel: string;
  items: readonly { name: string; logo?: ImageSourcePropType }[];
} = {
  head: {
    eyebrow: 'SPONSORS OUR CREATORS HAVE WORKED WITH',
    title: 'The brands.',
    dek: 'Already on a BLNK stream.',
  },
  logoLabel: '[LOGO]',
  items: [
    { name: 'GFuel', logo: require('../../assets/logos/gfuel.png') },
    { name: 'Red Bull', logo: require('../../assets/logos/red-bull.png') },
    { name: 'Streamer University', logo: require('../../assets/logos/streamer-university.png') },
    { name: 'CapCity', logo: require('../../assets/logos/capcity.png') },
  ],
};

export type CaseStudy = {
  /** URL segment for the case's own page: /cases/<slug>. */
  slug: string;
  label: string;
  brand: string;
  creator: string;
  /**
   * The picture in the middle of the magazine cover. `photo` fills a framed panel (cropped toward
   * `focus`, percent from the top); `sticker` sits on the cover color like a die-cut decal.
   */
  coverImage?: { source: ImageSourcePropType; style: 'photo' | 'sticker'; focus?: number };
  /** One line on what the brand wanted. Optional: the card leaves the line out until it is known. */
  objective?: string;
  /**
   * The brand's own colors for its cover and the top of its case page: `bg` the ground, `fg` the type,
   * `accent` the BLNK masthead and the brand name. Leave out to use BLNK's colors.
   */
  brandColors?: { bg: string; fg: string; accent: string; dark: boolean };
  rows: readonly (readonly [term: string, value: string])[];
  cta: { label: string; href: string };
};

export const cases: { head: SectionCopy; items: readonly CaseStudy[] } = {
  head: {
    eyebrow: 'PAST CAMPAIGNS',
    title: 'Case studies.',
    dek: 'What happens when a brand works with a BLNK creator. Pick a cover to read the story.',
  },
  items: [
    {
      slug: 'gfuel',
      label: 'CASE 01',
      brand: 'GFuel',
      creator: 'fumibean',
      // From the GFuel logo: sky blue with deep purple (white type would be too faint on the blue).
      brandColors: { bg: '#3cbef2', fg: '#3d0e9a', accent: '#3d0e9a', dark: false },
      coverImage: { source: require('../../assets/creators/fumibean.jpg'), style: 'photo', focus: 30 },
      rows: [
        ['FORMAT', 'TBD'],
        ['REACH', 'TBD'],
        ['RESULT', 'TBD'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: contactHref('case-gfuel') },
    },
    {
      slug: 'razer',
      label: 'CASE 02',
      brand: 'Razer',
      creator: 'NovaPovie',
      // Razer's signature green on black.
      brandColors: { bg: '#000000', fg: '#ffffff', accent: '#44d62c', dark: true },
      coverImage: { source: require('../../assets/creators/novapovie-cover.jpg'), style: 'photo', focus: 25 },
      rows: [
        ['FORMAT', 'TWITCH · TIKTOK'],
        ['REACH', 'TBD'],
        ['RESULT', 'TBD'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: contactHref('case-razer') },
    },
    {
      slug: 'andaseat',
      label: 'CASE 03',
      brand: 'Anda Seat',
      creator: 'NovaPovie',
      // From andaseat.com: a white logo on charcoal, with their orange accent.
      brandColors: { bg: '#202223', fg: '#ffffff', accent: '#ff4200', dark: true },
      coverImage: { source: require('../../assets/creators/novapovie-cover.jpg'), style: 'photo', focus: 45 },
      rows: [
        ['FORMAT', 'YOUTUBE'],
        ['REACH', 'TBD'],
        ['RESULT', 'TBD'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: contactHref('case-andaseat') },
    },
  ],
};

export type Deck = {
  label: string;
  title: string;
  body: string;
  coverLabel: string;
  cover?: ImageSourcePropType;
  cta: { label: string; href: string };
};

export const decks: { head: SectionCopy; items: readonly Deck[] } = {
  head: {
    eyebrow: 'EXAMPLES OF MEDIA DECKS',
    title: 'Request a deck.',
    dek: "Ask for one and it's in your inbox the same day.",
  },
  items: [
    {
      label: 'DECK 01',
      title: 'BLNK Media Kit — Nº 001',
      body: 'Roster, reach, formats and rates. The one deck to send a brand team first.',
      coverLabel: '[DECK COVER]',
      cover: require('../../assets/decks/media-kit.jpg'),
      cta: { label: 'REQUEST THE DECK →', href: contactHref('media-kit') },
    },
    {
      label: 'DECK 02',
      title: 'Creator one-sheets',
      body: 'One page per creator: audience, schedule, past sponsors, three clips. NovaPovie, fumibean, m0rals_, jackypoowoo, cloyyd.',
      coverLabel: '[DECK COVER]',
      cover: require('../../assets/decks/creator-one-sheets.jpg'),
      cta: { label: 'REQUEST THE ONE-SHEETS →', href: contactHref('one-sheets') },
    },
    {
      label: 'DECK 03',
      title: 'Campaign proposal',
      body: "The shape of a BLNK proposal, brief to report — so your team knows what they're signing before the first call.",
      coverLabel: '[DECK COVER]',
      cover: require('../../assets/decks/campaign-proposal.jpg'),
      cta: { label: 'REQUEST AN EXAMPLE →', href: contactHref('proposal') },
    },
  ],
};

export type Service = { n: string; name: string; desc: string };

export const services: {
  head: SectionCopy;
  groups: readonly { label: string; rows: readonly Service[] }[];
  /** Closing line under the list. */
  note: string;
} = {
  head: {
    eyebrow: 'WHAT WE DO',
    title: 'Services.',
    dek: 'What we do for brands, and for the creators we sign.',
  },
  groups: [
    {
      label: 'FOR BRANDS',
      rows: [
        { n: '01', name: 'Sponsored streams', desc: "A dedicated segment or full stream, in the creator's own voice." },
        { n: '02', name: 'Short-form', desc: 'Clips for TikTok, Shorts and Reels.' },
        { n: '03', name: 'Long-form', desc: 'Your brand built into a YouTube video.' },
        { n: '04', name: 'Issue takeover', desc: 'Every creator on the roster. One campaign, one month.' },
        { n: '05', name: 'Creator campaigns', desc: 'We find the creators, run the campaign and report the results.' },
        { n: '06', name: 'Social media', desc: "We run your brand's socials. Analytics included." },
      ],
    },
    {
      label: 'FOR CREATORS',
      rows: [
        { n: '07', name: 'Brand deals', desc: 'We pitch, negotiate and close sponsorships that fit your channel.' },
        { n: '08', name: 'Brand building', desc: 'Positioning, content strategy and a media kit that sells you.' },
        { n: '09', name: 'Content support', desc: 'Editing and clipping, so every stream turns into short-form.' },
        { n: '10', name: 'Growth & analytics', desc: "Monthly reports on what's working and where to grow next." },
        { n: '11', name: 'The business side', desc: 'Contracts, invoices and scheduling, handled.' },
      ],
    },
  ],
  note: "Every project is scoped to you. Send a brief and we'll reply within 1 business day.",
};

/** The short close at the end of Our Work: one ask, and the way to the pitch. */
export const workClose = {
  title: 'Like what you see?',
  accent: 'see',
  body: 'Tell us what you’re launching and we’ll put together the creators and the plan.',
  primary: { label: 'WORK WITH US →', href: contactHref('brief') },
  secondary: { label: 'What we do for brands →', href: '/brands' },
} as const;
