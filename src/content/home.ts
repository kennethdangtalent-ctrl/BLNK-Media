/* Issue 001 copy, verbatim from the "BLNK.name — Desktop" board. Bracketed text is a placeholder the board ships with. */
import { mailto } from './site';
import type { IconName } from '@/components/Icons';
import type { PhotoSubject } from '@/components/PhotoSlot';

export type SectionCopy = { eyebrow: string; title: string; dek: string };

export type Social = {
  label: string;
  icon?: IconName;
  href?: string;
  /** Platform name for the accessible label, e.g. "fumibean on Twitch". */
  platform?: string;
  followers?: string;
  dashed?: boolean;
};

export type Stat = { value: string; label: string };

/** A roster creator. Picture fields (`photo`, `photoStyle`, `photoFocus`, `logo`) come from `PhotoSubject`; the slot is 480 × 320. */
export type Creator = PhotoSubject & {
  n: string;
  kicker: string;
  hook: string;
  body: string;
  /** Up to three figures for the fact box. Leave a figure out rather than showing one you don't want public. */
  stats: readonly Stat[];
  socials: readonly Social[];
};

/** One creator on the rotating cover. */
export type CoverSlide = { name: string; line: string; photo: number; photoFocus?: number };

export const cover: {
  eyebrow: string;
  title: string;
  lede: string;
  cta: { label: string; href: string };
  brands: { label: string; href: string };
  /**
   * The cover card rotates through `slides` every 5 seconds. A slide's `photo` fills the card and needs a
   * full-size portrait, 800 px wide or more (`photoFocus` is the crop point from the top, in percent).
   */
  card: { meta: readonly string[]; slides: readonly CoverSlide[] };
} = {
  eyebrow: 'A CREATOR MANAGEMENT HOUSE · TWITCH FIRST',
  title: 'We sign the\ncreators\nbefore the\nalgorithm\ndoes.',
  lede: 'Five creators, one team behind every one of them.',
  cta: { label: 'APPLY TO THE ROSTER →', href: mailto('BLNK Roster Application') },
  brands: { label: 'Brands & sponsors → business@BLNK.name', href: mailto() },
  card: {
    meta: ['Nº 001', 'SEP 2026', 'BLNK.NAME'],
    slides: [
      { name: 'NovaPovie', photo: require('../../assets/creators/novapovie-cover.jpg'), photoFocus: 20, line: 'Lifestyle, live and unscripted.' },
      { name: 'fumibean', photo: require('../../assets/creators/fumibean.jpg'), photoFocus: 30, line: 'An artist on and off stream.' },
      { name: 'm0rals_', photo: require('../../assets/creators/m0rals-cover.jpg'), photoFocus: 22, line: 'Roblox creator. The sweet one.' },
      { name: 'jackypoowoo', photo: require('../../assets/creators/jackypoowoo-cover.jpg'), line: 'Filmmaker on stream. Film nerd off it.' },
      { name: 'cloyyd', photo: require('../../assets/creators/cloyyd-cover.jpg'), line: 'IRL meets gaming. The chat plays too.' },
    ],
  },
};

export const marquee =
  'INSIDE THIS ISSUE ★ NOVAPOVIE ★ FUMIBEAN ★ M0RALS_ ★ JACKYPOOWOO ★ CLOYYD ★ APPLICATIONS OPEN ★ BLNK.NAME ★';

export const rosterHead: SectionCopy & { link: string; partnerships: string } = {
  eyebrow: '01 — THE ROSTER',
  title: 'The roster.',
  dek: 'Five creators. One roster. No tiers.',
  link: 'SEE THE BRANDS OUR CREATORS HAVE WORKED WITH →',
  partnerships: 'BRAND PARTNERSHIPS →',
};

export const roster: readonly Creator[] = [
  {
    n: '01',
    name: 'NovaPovie',
    kicker: 'PARTNER · LIFESTYLE / IRL',
    hook: 'Lifestyle creator. Entertainer first.',
    body: 'NovaPovie turns everyday life into appointment viewing: IRL streams, travel days and high-energy Just Chatting, carried by a big personality and genuinely creative formats. Her audience shows up for her, which makes her a natural fit for lifestyle, beauty and consumer brands.',
    stats: [
      { value: '11.5K', label: 'TWITCH FOLLOWERS' },
      { value: '100K', label: 'YOUTUBE SUBSCRIBERS' },
      { value: 'PARTNER', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/novapovie' },
      { label: 'TIKTOK', icon: 'tiktok', platform: 'TikTok', href: 'https://www.tiktok.com/@clipnovapovie' },
      { label: 'INSTAGRAM', icon: 'instagram', platform: 'Instagram', href: 'https://www.instagram.com/novapovie/' },
      { label: 'YOUTUBE', icon: 'youtube', platform: 'YouTube', href: 'https://www.youtube.com/@NovaPoviee' },
    ],
    photoLabel: '[PHOTO — NOVAPOVIE]',
    photo: require('../../assets/creators/novapovie.png'),
    photoStyle: 'print',
  },
  {
    n: '02',
    name: 'fumibean',
    kicker: "PARTNER · STREAMER UNIVERSITY '26 · JUST CHATTING / IRL",
    hook: 'Streamer University alum. Artist on and off stream.',
    body: 'A Streamer University alumna and 2026 Streamer Games competitor, fumibean pairs anime-driven content with live illustration her community watches come together stroke by stroke. A strong partner for anime, art-supply and gaming campaigns.',
    stats: [
      { value: '31K', label: 'TWITCH FOLLOWERS' },
      { value: 'TOP 4', label: "TEAM STREAMER U · STREAMER GAMES '26" },
      { value: 'PARTNER', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/fumibean' },
      { label: 'YOUTUBE', icon: 'youtube', platform: 'YouTube', href: 'https://www.youtube.com/@fumibeanttv' },
      { label: 'TIKTOK', icon: 'tiktok', platform: 'TikTok', href: 'https://www.tiktok.com/@fumib34n' },
      { label: 'INSTAGRAM', icon: 'instagram', platform: 'Instagram', href: 'https://www.instagram.com/fumibean/' },
    ],
    photoLabel: '[PHOTO — FUMIBEAN]',
    photo: require('../../assets/creators/fumibean.jpg'),
    photoStyle: 'print',
    // The die-cut sticker (assets/creators/fumibun-sticker.png) shows instead if `photo` is removed.
    logo: require('../../assets/creators/fumibun-sticker.png'),
  },
  {
    n: '03',
    name: 'm0rals_',
    kicker: 'AFFILIATE · ROBLOX',
    hook: 'Roblox creator. The sweet one.',
    body: 'm0rals_ builds his channel around Roblox: co-op sessions, community games and the warm, welcoming presence his viewers know him for. That reputation as the sweet guy earns a loyal, positive audience, and his short clips carry it well beyond the stream.',
    stats: [
      { value: '1.8K', label: 'TWITCH FOLLOWERS' },
      { value: '10M+', label: 'VIEWS ON TIKTOK' },
      { value: 'AFFILIATE', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/m0rals_' },
      { label: 'TIKTOK', icon: 'tiktok', platform: 'TikTok', href: 'https://www.tiktok.com/@m0rals1' },
      { label: 'INSTAGRAM', icon: 'instagram', platform: 'Instagram', href: 'https://www.instagram.com/m0ralslive/' },
      { label: 'YOUTUBE', icon: 'youtube', platform: 'YouTube', href: 'https://www.youtube.com/@M0rals' },
    ],
    photoLabel: '[PHOTO — M0RALS_]',
    photo: require('../../assets/creators/m0rals.png'),
    photoStyle: 'print',
  },
  {
    n: '04',
    name: 'jackypoowoo',
    kicker: 'AFFILIATE · SHORT FILM / IRL',
    hook: 'Filmmaker on stream. Film nerd off it.',
    body: "jackypoowoo brings a filmmaker's eye to streaming: writing, shooting and cutting short films, and talking craft with a community that loves cinema as much as he does. A natural partner for camera, tech and creative-tool brands.",
    stats: [
      { value: '5K', label: 'TWITCH FOLLOWERS' },
      { value: 'APPLE', label: 'FEATURED IN AN APPLE AD' },
      { value: 'AFFILIATE', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/jackypoowoo' },
    ],
    photoLabel: '[PHOTO — JACKYPOOWOO]',
    photo: require('../../assets/creators/jackypoowoo.png'),
    photoStyle: 'print',
  },
  {
    n: '05',
    name: 'cloyyd',
    kicker: 'AFFILIATE · IRL / GAMING',
    hook: 'IRL meets gaming. The chat plays too.',
    body: 'cloyyd blends IRL streams and gaming around challenges his community helps shape, from rock climbing to Minecraft runs, so viewers take part instead of just watching. That interactivity travels: his short-form clips reach far past the live audience.',
    stats: [
      { value: '1.3K', label: 'TWITCH FOLLOWERS' },
      { value: '5M+', label: 'SHORT-FORM VIEWS' },
      { value: 'AFFILIATE', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/cloyyd' },
      { label: 'TIKTOK', icon: 'tiktok', platform: 'TikTok', href: 'https://www.tiktok.com/@cloyyd' },
      { label: 'INSTAGRAM', icon: 'instagram', platform: 'Instagram', href: 'https://www.instagram.com/cloyyd/' },
      { label: 'YOUTUBE', icon: 'youtube', platform: 'YouTube', href: 'https://www.youtube.com/@Cloyydd' },
    ],
    photoLabel: '[PHOTO — CLOYYD]',
    photo: require('../../assets/creators/cloyyd.png'),
    photoStyle: 'print',
  },
];

export const apply = {
  eyebrow: '02 — APPLICATIONS',
  title: 'Issue 002\nis being cast.',
  body: 'Applications for the next cover close soon. 5 spots on the roster. Every one gets read.',
  primary: { label: 'APPLY → BUSINESS@BLNK.NAME', href: mailto('BLNK Roster Application') },
  secondary: { label: 'BRAND PARTNERSHIPS', href: '/business' },
  services: { label: 'What we do for the creators we sign →', href: '/services' },
  sendLabel: 'WHAT TO SEND',
  send: ['Your Twitch link.', 'Your streaming schedule.', 'One clip that shows who you are.', 'Nothing else.'],
} as const;
