/* Business pages copy, verbatim from the "BLNK.name/business — Desktop" board. Bracketed text is a placeholder the board ships with. */
import type { ImageSourcePropType } from 'react-native';

import type { SectionCopy } from './home';
import { mailto } from './site';

export const bizHero = {
  eyebrow: '04 — THE BUSINESS PAGES',
  title: 'Put your brand\non the cover.',
  lede: 'Clients, sponsors, case studies, decks and rates. Everything a brand team needs to say yes, on one page.',
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
      kicker: 'PARTNER · FINTECH · PRE-LAUNCH',
      name: 'Pesito',
      line: 'One Wallet for families across the Americas',
      body: 'Send money to Mexico for 1%, capped at $1. Pre-launch. Waitlist open.',
      link: { label: 'PESITO.LA ↗', href: 'https://pesito.la/en' },
    },
    {
      n: '02',
      logoLabel: '[LOGO]',
      kicker: 'PARTNER · FOUNDER PROGRAM · 23 AND UNDER',
      name: 'J Rising Founder',
      line: 'An early chance for extraordinary founders.',
      body: 'Free, remote, three months. No fee, no equity.',
      link: { label: 'RISINGFOUNDER.NET ↗', href: 'https://risingfounder.net/' },
    },
    {
      n: '03',
      logoLabel: '[LOGO]',
      kicker: 'B2B CLIENT · [INDUSTRY]',
      name: '[Client]',
      line: '[One line on what BLNK did for them.]',
      body: '[Scope · creators involved · dates]',
      link: { label: '[CLIENT-URL] ↗' },
    },
    {
      n: '04',
      logoLabel: 'YOUR LOGO',
      kicker: 'THIS SLOT IS OPEN',
      name: 'Next.',
      line: 'The next company on this page is reading it right now.',
      body: 'Creator casting, campaign management, or a roster of your own. Start with a brief.',
      link: { label: 'START A BRIEF →', href: mailto('BLNK B2B Brief') },
    },
  ],
};

export const sponsors: {
  head: SectionCopy;
  logoLabel: string;
  items: readonly { name: string; with: string; logo?: ImageSourcePropType }[];
} = {
  head: {
    eyebrow: 'SPONSORS OUR CREATORS HAVE WORKED WITH',
    title: 'The brands.',
    dek: 'Already on a BLNK stream. Each tile names the creators they worked with.',
  },
  logoLabel: '[LOGO]',
  items: [
    { name: 'GFuel', with: 'WITH: [CREATOR HANDLES]' },
    { name: 'Red Bull', with: 'WITH: [CREATOR HANDLES]' },
    { name: 'Streamer University', with: 'WITH: [CREATOR HANDLES]' },
    { name: 'CapCity', with: 'WITH: [CREATOR HANDLES]' },
  ],
};

export type CaseStudy = {
  label: string;
  title: string;
  objective: string;
  rows: readonly (readonly [term: string, value: string])[];
  cta: { label: string; href: string };
};

export const cases: { head: SectionCopy; items: readonly CaseStudy[] } = {
  head: {
    eyebrow: 'CASE STUDIES',
    title: 'The receipts.',
    dek: 'What happened when a brand put money behind a BLNK stream.',
  },
  items: [
    {
      label: 'CASE 01',
      title: '[Brand] × [Creator]',
      objective: '[The objective, in one line.]',
      rows: [
        ['FORMAT', '[FORMAT]'],
        ['REACH', '[VIEWS / IMPRESSIONS]'],
        ['RESULT', '[RESULT]'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: mailto('BLNK Case Study 01') },
    },
    {
      label: 'CASE 02',
      title: '[Brand] × [Creator]',
      objective: '[The objective, in one line.]',
      rows: [
        ['FORMAT', '[FORMAT]'],
        ['REACH', '[VIEWS / IMPRESSIONS]'],
        ['RESULT', '[RESULT]'],
      ],
      cta: { label: 'REQUEST THE FULL CASE →', href: mailto('BLNK Case Study 02') },
    },
    {
      label: 'CASE 03',
      title: '[Brand] × [Creator]',
      objective: '[The objective, in one line.]',
      rows: [
        ['FORMAT', '[FORMAT]'],
        ['REACH', '[VIEWS / IMPRESSIONS]'],
        ['RESULT', '[RESULT]'],
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
      cta: { label: 'REQUEST THE DECK →', href: mailto('BLNK Media Kit request') },
    },
    {
      label: 'DECK 02',
      title: 'Creator one-sheets',
      body: 'One page per creator: audience, schedule, past sponsors, three clips. NovaPovie, fumibean, m0rals_, jackypoowoo, cloyyd.',
      coverLabel: '[DECK COVER]',
      cta: { label: 'REQUEST THE ONE-SHEETS →', href: mailto('BLNK Creator one-sheets request') },
    },
    {
      label: 'DECK 03',
      title: 'Campaign proposal',
      body: "The shape of a BLNK proposal, brief to report — so your team knows what they're signing before the first call.",
      coverLabel: '[DECK COVER]',
      cta: { label: 'REQUEST AN EXAMPLE →', href: mailto('BLNK Proposal example request') },
    },
  ],
};

export type Rate = { n: string; name: string; desc: string; rate: string };

export const rates: { head: SectionCopy; groups: readonly { label: string; rows: readonly Rate[] }[] } = {
  head: {
    eyebrow: 'FORMATS & SERVICES',
    title: 'Rate card.',
    dek: 'Brand formats and B2B services. Numbers on request.',
  },
  groups: [
    {
      label: 'FOR BRANDS',
      rows: [
        { n: '01', name: 'Sponsored stream', desc: 'A dedicated segment or a full stream, led by the creator in their own voice.', rate: '[RATE]' },
        { n: '02', name: 'Short-form package', desc: 'Clips cut from the stream for TikTok, Shorts and Reels.', rate: '[RATE]' },
        { n: '03', name: 'IRL integration', desc: 'Your product out in the world on a live IRL stream.', rate: '[RATE]' },
        { n: '04', name: 'Issue takeover', desc: 'Every creator on the roster. One campaign. One month.', rate: '[RATE]' },
      ],
    },
    {
      label: 'FOR COMPANIES — B2B',
      rows: [
        { n: '05', name: 'Creator casting', desc: 'We find, vet and book the creators for your campaign — on the roster or off it.', rate: '[RATE]' },
        { n: '06', name: 'Campaign management', desc: 'Brief to report, end to end. One contact, every creator.', rate: '[RATE]' },
        { n: '07', name: 'Roster build-out', desc: 'For companies starting a creator program of their own. We build it the way we built ours.', rate: '[RATE]' },
      ],
    },
  ],
};

export const brief = {
  eyebrow: 'BOOKING',
  title: 'Start\na brief.',
  body: 'Send the product, a budget range, and the creator you have in mind. We reply within [X] days.',
  primary: { label: 'BUSINESS@BLNK.NAME →', href: mailto('BLNK Brand Brief') },
  secondary: { label: 'BACK TO ISSUE 001', href: '/' },
} as const;
