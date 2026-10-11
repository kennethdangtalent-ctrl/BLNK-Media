/* Issue 001 copy, verbatim from the "BLNK.name — Desktop" board. Bracketed text is a placeholder the board ships with. */
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
  /** The quieter link beside the button, for creators. */
  creators: { label: string; href: string };
  /**
   * The cover card rotates through `slides` every 5 seconds. A slide's `photo` fills the card and needs a
   * full-size portrait, 800 px wide or more (`photoFocus` is the crop point from the top, in percent).
   */
  card: { meta: readonly string[]; slides: readonly CoverSlide[] };
} = {
  eyebrow: 'CREATOR-POWERED MARKETING',
  title: 'We make\nbrands\npeople\nactually\nwatch.',
  lede: 'Social, content and creator campaigns, from a team that lives online.',
  cta: { label: 'WORK WITH US →', href: '/contact' },
  creators: { label: 'Creators → apply to the roster', href: '/apply' },
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
  'SOCIAL MEDIA ★ CONTENT ★ CREATOR CAMPAIGNS ★ SPONSORED STREAMS ★ SHORT-FORM ★ NOW BOOKING ★ BLNK.NAME ★';

export const rosterHead: SectionCopy & { link: string; partnerships: string } = {
  eyebrow: '03 — THE ROSTER',
  title: 'The roster.',
  dek: 'Five creators in-house, so your campaign goes out through people their audiences already trust.',
  link: 'SEE THE BRANDS OUR CREATORS HAVE WORKED WITH →',
  partnerships: 'BRAND PARTNERSHIPS →',
};

export const roster: readonly Creator[] = [
  {
    n: '01',
    name: 'NovaPovie',
    kicker: 'PARTNER · LIFESTYLE / IRL',
    hook: 'Chasing the K-pop idol dream, one stream at a time.',
    body: 'Meet NovaPovie, the Austin streamer who decided to audition to become a K-pop idol on stream and keep going until it works. She has a big personality and she’s up for anything, whether that’s a JYP audition arc, a chaotic night on Omegle or her first day in Shibuya streamed live. People come for her energy and stay for the bit. A natural fit for lifestyle, beauty and everyday consumer brands.',
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
    hook: 'Cozy streams, a sketchbook and a lot of heart.',
    body: 'Meet fumibean, an artist whose streams feel like hanging out with a friend who happens to be drawing. She makes art live, ranks anime with her chat, and brings everyone along for Subaru Saturdays and her Third Wheel Thursday series. She went through Streamer University and was one of four students Ludwig picked for Team Streamer University at the 2026 Streamer Games. A great fit for anime, art supply and gaming brands.',
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
    hook: 'The sweet guy of Roblox.',
    body: 'Meet m0rals_, a Roblox streamer who has built his channel around the people in it. His streams are co-op sessions, community games and a lot of hanging out, and his regulars treat the chat like a group of friends. Across the internet he’s known as the sweet guy, and that reputation is a big part of why his community feels so welcoming.',
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
    hook: 'A filmmaker who never stops making things.',
    body: 'Meet jackypoowoo, a creator who always has a project going. Some of his favorite segments on stream are slow, hands-on ones, like building collages while his chat hangs out, and off stream he’s working on his next short film. His community loves movies as much as he does, which makes him a great match for camera, tech and creative software brands.',
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
    hook: '100% runs and rock climbing days.',
    body: 'Meet cloyyd, a creator who likes to finish what he starts. He’s known for taking games all the way to 100%, finding creative ways through every last challenge with his chat along for the ride. On other days he trades the controller for a harness and takes everyone rock climbing. Between the two, his streams are patient, clever and a lot of fun.',
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

/** The three things BLNK sells brands, right under the cover. */
export const offer = {
  eyebrow: '01 — FOR BRANDS',
  title: 'What we do for brands.',
  accent: 'brands',
  dek: 'One team for your socials, your content and your creator campaigns.',
  pillars: [
    {
      name: 'Social media',
      body: 'We run your accounts: the plan, the posts, the community, and a monthly report on what worked.',
    },
    {
      name: 'Content',
      body: 'Short-form video, photos and edits made for how people actually scroll, by people who post every day.',
    },
    {
      name: 'Creator campaigns',
      body: 'Sponsored streams, clips and YouTube integrations with our roster, plus creators we bring in for you.',
    },
  ],
  link: { label: 'SEE ALL SERVICES →', href: '/services' },
} as const;

/** The closing ask, for brands. */
export const close = {
  title: 'Put your brand\non the cover.',
  accent: 'brand',
  body: 'Tell us what you’re launching. We’ll come back within one business day with a plan, the creators who fit and a quote.',
  primary: { label: 'WORK WITH US →', href: '/contact' },
  secondary: { label: 'SEE OUR WORK', href: '/business' },
} as const;

/** The smaller band for creators, after the brand close. */
export const apply = {
  eyebrow: 'FOR CREATORS',
  title: 'Issue 002 is being cast.',
  body: 'Five spots on the roster. Every application gets read.',
  primary: { label: 'APPLY TO THE ROSTER →', href: '/apply' },
  services: { label: 'What we do for the creators we sign →', href: '/services' },
  sendLabel: 'WHAT TO SEND',
  send: ['Your Twitch link.', 'Your streaming schedule.', 'One clip that shows who you are.', 'Nothing else.'],
} as const;
