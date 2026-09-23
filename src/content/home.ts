/* Issue 001 copy, verbatim from the "BLNK.name — Desktop" board. Bracketed text is a placeholder the board ships with. */
import { mailto } from './site';
import type { IconName } from '@/components/Icons';

export type SectionCopy = { eyebrow: string; title: string; dek: string };

export type Social = {
  label: string;
  icon?: IconName;
  href?: string;
  /** Platform name for the accessible label, e.g. "NovaPovie on TikTok, 27K followers". */
  platform?: string;
  followers?: string;
  dashed?: boolean;
};

export type Stat = { value: string; label: string };

export type Creator = {
  n: string;
  name: string;
  kicker: string;
  hook: string;
  body: string;
  stats: readonly [Stat, Stat, Stat];
  socials: readonly Social[];
  photoLabel: string;
  /** `photo: require('../../assets/creators/novapovie.jpg')`. */
  photo?: number;
  /**
   * `'fill'` (default) fills the 480 × 320 slot and needs a full-size original.
   * `'print'` mounts the photo as a small square instant print, which suits small or square images.
   */
  photoStyle?: 'fill' | 'print';
  /** Vertical crop point for a filled `photo`, in percent from the top. Selfies read best around 25. Default 30. */
  photoFocus?: number;
  /** A die-cut logo or avatar (transparent PNG) shown on the halftone plate when there is no photo. */
  logo?: number;
};

export const cover: {
  eyebrow: string;
  title: string;
  lede: string;
  cta: { label: string; href: string };
  brands: { label: string; href: string };
  /** `photo` fills the cover card (a portrait suits its 3:4 shape); `photoFocus` is the crop point from the top, in percent. */
  card: { meta: readonly string[]; photoLabel: string; photo?: number; photoFocus?: number; badge: string; line: string; credits: string };
} = {
  eyebrow: 'A CREATOR MANAGEMENT HOUSE · TWITCH FIRST',
  title: 'We sign the\ncreators\nbefore the\nalgorithm\ndoes.',
  lede: 'A roster you can count on one hand. Five creators, no tiers, no back pages. Applications, not sign-ups.',
  cta: { label: 'APPLY TO THE ROSTER →', href: mailto('BLNK Roster Application') },
  brands: { label: 'Brands & sponsors → business@BLNK.name', href: mailto() },
  card: {
    meta: ['Nº 001', 'SEP 2026', 'BLNK.NAME'],
    photoLabel: '[COVER PHOTO — NOVAPOVIE]',
    badge: 'COVER · NOVAPOVIE',
    line: 'Idol auditions, live from Austin.',
    credits: 'PHOTO: [CREDIT]\nINSIDE: FUMIBEAN · M0RALS_ · JACKYPOOWOO · CLOYYD',
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
    kicker: 'PARTNER · AUSTIN, TX · JUST CHATTING / IRL',
    hook: 'Auditioning to be a K-pop idol. On stream. Until it works.',
    body: "Four nights a week from Austin — JYP audition arcs, Omegle chaos, a first day in Shibuya streamed live, and a chat that shows up in Kai Cenat's replies.",
    stats: [
      { value: '11.5K', label: 'TWITCH FOLLOWERS' },
      { value: '1.9K', label: 'PEAK LIVE VIEWERS' },
      { value: '4×/WK', label: 'TUE · THU · FRI · SAT, 7PM CT' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/novapovie' },
      { label: 'TIKTOK 27K', icon: 'tiktok', platform: 'TikTok', followers: '27K', href: 'https://www.tiktok.com/@clipnovapovie' },
      { label: 'INSTAGRAM 15K', icon: 'instagram', platform: 'Instagram', followers: '15K', href: 'https://www.instagram.com/novapovie/' },
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
    hook: 'Got into Streamer University. Then got picked for the team.',
    body: 'Cozy drawing streams, anime tier lists, Subaru Saturdays IRL — and one of the four students Ludwig chose for Team Streamer University at the 2026 Streamer Games.',
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
    logo: require('../../assets/creators/fumibun-sticker.png'),
  },
  {
    n: '03',
    name: 'm0rals_',
    kicker: 'AFFILIATE · GEOMETRY DASH / ROBLOX',
    hook: 'Day 299 on one Geometry Dash level. Still going.',
    body: "Rhythm-platformer grinder with a Roblox side quest, Monday-night regulars, and a bio that's just a kaomoji.",
    stats: [
      { value: '1.8K', label: 'TWITCH FOLLOWERS' },
      { value: 'DAY 299', label: 'ONE LEVEL, STILL GOING' },
      { value: 'AFFILIATE', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/m0rals_' },
      { label: 'YOUTUBE [LINK]', icon: 'youtube' },
    ],
    photoLabel: '[PHOTO — M0RALS_]',
    photo: require('../../assets/creators/m0rals.png'),
    photoStyle: 'print',
  },
  {
    n: '04',
    name: 'jackypoowoo',
    kicker: 'AFFILIATE · IRL / JUST CHATTING',
    hook: 'Twelve-hour sleepover camping streams. On purpose.',
    body: 'Paddleboarding on the Fourth, Valorant solo queue at 2 a.m., cozy games at midnight. Treats the chat like a group chat.',
    stats: [
      { value: '5K', label: 'TWITCH FOLLOWERS' },
      { value: '12H 45M', label: 'LONGEST STREAM · IRL CAMPING' },
      { value: 'AFFILIATE', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/jackypoowoo' },
      { label: '[+ SOCIALS]', dashed: true },
    ],
    photoLabel: '[PHOTO — JACKYPOOWOO]',
    photo: require('../../assets/creators/jackypoowoo.png'),
    photoStyle: 'print',
  },
  {
    n: '05',
    name: 'cloyyd',
    kicker: 'AFFILIATE · IRL / MINECRAFT / YOUTUBE',
    hook: 'Rock climbing on stream. Freestyling over the Streamer Awards.',
    body: 'Twitch by night, YouTube by day — every stream title ends in NEW VIDEO. Minecraft when it rains.',
    stats: [
      { value: '1.3K', label: 'TWITCH FOLLOWERS' },
      { value: '74', label: 'PEAK VIEWERS, LAST 30 DAYS' },
      { value: 'AFFILIATE', label: 'TWITCH STATUS' },
    ],
    socials: [
      { label: 'TWITCH', icon: 'twitch', platform: 'Twitch', href: 'https://www.twitch.tv/cloyyd' },
      { label: 'YOUTUBE [LINK]', icon: 'youtube' },
    ],
    photoLabel: '[PHOTO — CLOYYD]',
    photo: require('../../assets/creators/cloyyd.png'),
    photoStyle: 'print',
  },
];

export const mission: {
  head: SectionCopy;
  values: readonly { label: string; title: string; body: string }[];
  quote: string;
  cite: string;
} = {
  head: {
    eyebrow: '02 — THE MISSION',
    title: 'The mission.',
    dek: 'Four things we look for. None of them is a follower count.',
  },
  values: [
    {
      label: '01 — BELIEF',
      title: 'Great creators come from anywhere.',
      body: "A seven-viewer Geometry Dash grind is a cover story that hasn't been shot yet.",
    },
    {
      label: '02 — BOLDNESS',
      title: 'Start before you feel ready.',
      body: 'We look for people already streaming the schedule, not people planning to.',
    },
    {
      label: '03 — RANGE',
      title: 'There is no blueprint.',
      body: 'K-pop auditions, rock climbing, sleepover camping, cozy drawing. Every channel on this page is a different sport.',
    },
    {
      label: '04 — CONVICTION',
      title: 'Show up. Keep going.',
      body: 'Consistency beats a viral clip. We back the ones who stream through the dead nights.',
    },
  ],
  quote: 'Every name on this cover was a DM once.',
  cite: '— BLNK MEDIA',
};

export const apply = {
  eyebrow: '03 — APPLICATIONS',
  title: 'Issue 002\nis being cast.',
  body: 'Applications for the next cover close [DATE]. [N] spots on the roster. Every one gets read.',
  primary: { label: 'APPLY → BUSINESS@BLNK.NAME', href: mailto('BLNK Roster Application') },
  secondary: { label: 'BRAND PARTNERSHIPS', href: '/business' },
  sendLabel: 'WHAT TO SEND',
  send: ['Your Twitch link.', 'Your streaming schedule.', 'One clip that shows who you are.', 'Nothing else.'],
} as const;
