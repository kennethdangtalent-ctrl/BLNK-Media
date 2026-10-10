/* Business pages copy, verbatim from the "BLNK.name/business — Desktop" board. Bracketed text is a placeholder the board ships with. */
import type { ImageSourcePropType } from 'react-native';

import type { SectionCopy } from './home';
import { mailto } from './site';

export const bizHero = {
  eyebrow: '04 — THE BUSINESS PAGES',
  title: 'Put your brand\non the cover.',
  lede: 'Clients, sponsors, case studies, decks and services. Everything a brand team needs to say yes, on one page.',
  cta: { label: 'START A BRIEF →', href: mailto('BLNK Brand Brief') },
  back: { label: '← Back to Issue 001', href: '/' },
  kit: {
    title: 'Media kit',
    issue: 'Nº 001 · SEP 2026',
    rows: [
      { label: 'ROSTER', value: '5 CREATORS · ONE ROSTER' },
      { label: 'REACH', value: '~50K COMBINED TWITCH FOLLOWERS' },
      { label: 'PLATFORMS', value: 'TWITCH · TIKTOK · YOUTUBE · INSTAGRAM' },
      { label: 'CONTACT', value: 'BUSINESS@BLNK.NAME' },
    ],
  },
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
export const brandServices = {
  title: 'How we work with brands.',
  link: { label: 'SEE ALL SERVICES →', href: '/services' },
} as const;

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
      coverImage: { source: require('../../assets/creators/fumibean.jpg'), style: 'photo', focus: 30 },
      rows: [
        ['FORMAT', 'TBD'],
        ['REACH', 'TBD'],
        ['RESULT', 'TBD'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: mailto('BLNK Case Study 01') },
    },
    {
      slug: 'razer',
      label: 'CASE 02',
      brand: 'Razer',
      creator: 'NovaPovie',
      coverImage: { source: require('../../assets/creators/novapovie-cover.jpg'), style: 'photo', focus: 25 },
      rows: [
        ['FORMAT', 'TWITCH · TIKTOK'],
        ['REACH', 'TBD'],
        ['RESULT', 'TBD'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: mailto('BLNK Case Study 02') },
    },
    {
      slug: 'anadaseat',
      label: 'CASE 03',
      brand: 'AnadaSeat',
      creator: 'NovaPovie',
      coverImage: { source: require('../../assets/creators/novapovie-cover.jpg'), style: 'photo', focus: 45 },
      rows: [
        ['FORMAT', 'YOUTUBE'],
        ['REACH', 'TBD'],
        ['RESULT', 'TBD'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: mailto('BLNK Case Study 03') },
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
    title: 'The decks.',
    dek: "Ask for one and it's in your inbox the same day.",
  },
  items: [
    {
      label: 'DECK 01',
      title: 'BLNK Media Kit — Nº 001',
      body: 'Roster, reach, formats and rates. The one deck to send a brand team first.',
      coverLabel: '[DECK COVER]',
      cover: require('../../assets/decks/media-kit.jpg'),
      cta: { label: 'REQUEST THE DECK →', href: mailto('BLNK Media Kit request') },
    },
    {
      label: 'DECK 02',
      title: 'Creator one-sheets',
      body: 'One page per creator: audience, schedule, past sponsors, three clips. NovaPovie, fumibean, m0rals_, jackypoowoo, cloyyd.',
      coverLabel: '[DECK COVER]',
      cover: require('../../assets/decks/creator-one-sheets.jpg'),
      cta: { label: 'REQUEST THE ONE-SHEETS →', href: mailto('BLNK Creator one-sheets request') },
    },
    {
      label: 'DECK 03',
      title: 'Campaign proposal',
      body: "The shape of a BLNK proposal, brief to report — so your team knows what they're signing before the first call.",
      coverLabel: '[DECK COVER]',
      cover: require('../../assets/decks/campaign-proposal.jpg'),
      cta: { label: 'REQUEST AN EXAMPLE →', href: mailto('BLNK Proposal example request') },
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

/** Shown under the brief's buttons: each deck as a quiet request link. */
export const deckLinks = { label: 'Or request a deck:' } as const;

export const brief = {
  eyebrow: 'BOOKING',
  title: 'Start\na brief.',
  body: 'Send the product, a budget range, and the creator you have in mind. We reply within 1 business day.',
  primary: { label: 'BUSINESS@BLNK.NAME →', href: mailto('BLNK Brand Brief') },
  secondary: { label: 'BACK TO ISSUE 001', href: '/' },
} as const;
