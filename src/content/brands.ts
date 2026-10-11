/* The For Brands page: the one link to send a business. Not in the main nav. */
import { contactHref } from './contact';

export const brandsHero = {
  kicker: 'For brands · Nº 001',
  title: 'Work with our creators. And with us.',
  /** The word printed in crimson in the title. */
  accent: 'creators',
  intro:
    'BLNK is five Twitch-first creators and the team behind them. Bring us a launch and we’ll put it in front of their audiences, or run your socials and content ourselves. Most brands do both.',
  primary: { label: 'WORK WITH US →', href: contactHref('brief') },
  secondary: { label: 'GET THE MEDIA KIT', href: contactHref('media-kit') },
} as const;

/** The first way in: the roster. The creator tiles come from the home cover's photos and the roster's stats. */
export const withCreators = {
  label: 'Our creators',
  title: 'Put your brand on their stream.',
  formats: ['Sponsored streams', 'Stream segments', 'TikTok, Reels & Shorts', 'YouTube integrations', 'Whole-roster takeover'],
  /** The roster's reach in one line. ~56K is the sum of the five Twitch counts on the home page. */
  reach: [
    { value: '~56K', label: 'Combined Twitch followers' },
    { value: '5', label: 'Creators, one team' },
    { value: '4', label: 'Platforms: Twitch, TikTok, YouTube, Instagram' },
  ],
  /** What each creator is the right fit for, by roster name. */
  bestFor: {
    NovaPovie: 'Lifestyle & beauty',
    fumibean: 'Art & lifestyle',
    m0rals_: 'Roblox & gaming',
    jackypoowoo: 'Film & creative',
    cloyyd: 'Gaming & IRL',
  } as Record<string, string>,
  link: { label: 'MEET THE ROSTER →', href: '/?s=roster' },
} as const;

/** The second way in: the team, as four services. */
export const withTeam = {
  label: 'The BLNK team',
  title: 'Let us run it for you.',
  services: [
    { head: 'Social media', body: 'The plan, the posts and the community, run for you.' },
    { head: 'Content', body: 'Short-form video, photos and edits made to be scrolled.' },
    { head: 'Creator campaigns', body: 'With our roster, or creators we find for you.' },
    { head: 'Reporting', body: 'What worked and what we’d do next, every month.' },
  ],
  link: { label: 'SEE ALL SERVICES →', href: '/services' },
} as const;

export const steps = {
  title: 'How it works.',
  items: [
    { head: 'Tell us what you’re launching', body: 'The product, the audience, a budget range. Two minutes on our contact form.' },
    { head: 'We pitch the idea', body: 'Within one business day: the concept, the creators who fit and a quote.' },
    { head: 'It goes live', body: 'We run it end to end, then send you the numbers and what we’d do next.' },
  ],
} as const;

export const brandsClose = {
  title: 'Put your brand\non the cover.',
  accent: 'brand',
  body: 'Tell us what you’re working on. We reply within one business day.',
  primary: { label: 'WORK WITH US →', href: contactHref('brief') },
  secondary: { label: 'SEE CASE STUDIES', href: '/business?s=cases' },
} as const;
