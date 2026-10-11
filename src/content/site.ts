/* Site-wide constants. Every outbound URL on the site is a constant in src/content. */

export const EMAIL = 'business@BLNK.name';

/** Canonical origin for metadata. The boards write the domain as BLNK.name. */
export const SITE_URL = 'https://blnk.name';

export const DOMAIN_URL = 'https://BLNK.name';

export const ISSUE = { no: 'Nº 001', date: 'SEP 2026', domain: 'BLNK.NAME' } as const;

/**
 * Where the site's forms (roster applications, brand requests) post: FormSubmit's AJAX endpoint,
 * which emails each submission to `EMAIL`. The very first submission makes FormSubmit send a
 * one-time activation email to that inbox; once the link in it is clicked, submissions arrive as
 * emails. Set this to '' to fall back to opening the sender's email app with everything filled in.
 */
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

/** Where brands book an intro call (Calendly, 30 minutes). Opens in a new tab; nothing is embedded. */
export const CALL_URL = 'https://calendly.com/business-blnk/30min';

export function mailto(subject?: string): string {
  return subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`;
}

export const meta = {
  home: {
    title: 'BLNK Media — Twitch-first creator management',
    description: 'BLNK Media is a creator management house, Twitch first. Five creators, one roster, no tiers. Applications for Issue 002 are open.',
    path: '/',
  },
  business: {
    title: 'BLNK Media — Our work',
    description: 'Clients, sponsors, case studies, decks and services. Everything a brand team needs to say yes to a BLNK campaign, on one page.',
    path: '/business',
  },
  mission: {
    title: 'BLNK Media — The Mission',
    description:
      'What BLNK Media is about: a creator management company that helps streamers turn what they love into a real career. Why we exist, what we look for, and who runs it.',
    path: '/mission',
  },
  privacy: {
    title: 'BLNK Media — Privacy Policy',
    description: "How BLNK Media handles your information. No tracking cookies, no analytics, and we don't sell your data.",
    path: '/privacy',
  },
  apply: {
    title: 'BLNK Media — Apply to the roster',
    description: 'Apply to join the BLNK Media roster. Tell us who you are, link your Twitch and one clip that shows what you make. We read every application.',
    path: '/apply',
  },
  brands: {
    title: 'BLNK Media — For brands',
    description:
      'Work with BLNK Media: sponsored streams and content with our five Twitch-first creators, plus social media and campaigns run by the BLNK team.',
    path: '/brands',
  },
  contact: {
    title: 'BLNK Media — Work with us',
    description: 'Brands and sponsors: start a brief, request the media kit, creator one-sheets or a full case study. We reply within 1 business day.',
    path: '/contact',
  },
  services: {
    title: 'BLNK Media — Services',
    description:
      'What BLNK does for brands (sponsored streams, short- and long-form, campaigns) and for the creators it signs (brand deals, growth, the business side).',
    path: '/services',
  },
  terms: {
    title: 'BLNK Media — Terms of Service',
    description: 'The terms for using blnk.name.',
    path: '/terms',
  },
} as const;

export const masthead = {
  home: { issue: 'Nº 001 — THE CREATOR ISSUE', badge: 'APPLICATIONS OPEN' },
  business: { issue: 'Nº 001 — OUR WORK', badge: 'NOW BOOKING' },
  mission: { issue: 'Nº 001 — THE MISSION', badge: 'APPLICATIONS OPEN' },
  services: { issue: 'Nº 001 — THE SERVICES', badge: 'NOW BOOKING' },
  apply: { issue: 'Nº 002 — CASTING NOW', badge: 'APPLICATIONS OPEN' },
  contact: { issue: 'Nº 001 — THE BRAND DESK', badge: 'NOW BOOKING' },
  brands: { issue: 'Nº 001 — FOR BRANDS', badge: 'NOW BOOKING' },
} as const;

export const footer = {
  copyright: '© 2026 BLNK Media. Managed by Ken.',
  notes: {
    home: 'Follower counts from public trackers, September 2026.',
    business: 'Brand names and logos are the property of their owners.',
    mission: 'Written by the founder, October 2026.',
    legal: 'Questions about these pages? Email business@BLNK.name.',
    services: 'Every project is scoped to you. We reply within 1 business day.',
    apply: 'We read every application ourselves.',
    brands: 'Follower counts from public trackers, September 2026.',
    contact: 'Every request is read by a person. We reply within 1 business day.',
    case: 'Campaign results are added when each campaign wraps.',
  },
  legal: [
    { label: 'PRIVACY', href: '/privacy' },
    { label: 'TERMS', href: '/terms' },
    { label: 'COOKIES', href: '/privacy#cookies' },
  ],
} as const;

/** Every page a reader can turn to, for the "Continued on" links and the footer's contents. */
export const pages = {
  home: { no: '01', title: 'Home', line: 'Meet the five creators on the roster.', href: '/' },
  brands: { no: '02', title: 'For brands', line: 'Work with our creators, and with us.', href: '/brands' },
  business: { no: '03', title: 'Our work', line: 'Who we work with, case studies and media decks.', href: '/business' },
  services: { no: '04', title: 'Services', line: 'Everything we do for brands and for creators.', href: '/services' },
  mission: { no: '05', title: 'The mission', line: 'Why BLNK exists, and what we look for.', href: '/mission' },
  contact: { no: '06', title: 'Contact', line: 'Start a brief or ask for a deck.', href: '/contact' },
  apply: { no: '07', title: 'Apply', line: 'Join the roster for Issue 002.', href: '/apply' },
} as const;

export type PageId = keyof typeof pages;

/** Where each page sends the reader next, in the order the cards appear. */
export const continueTo: Record<PageId | 'case', readonly PageId[]> = {
  home: ['brands', 'mission', 'business'],
  brands: ['business', 'services', 'contact'],
  business: ['brands', 'services', 'contact'],
  services: ['brands', 'business', 'contact'],
  mission: ['home', 'apply', 'brands'],
  contact: ['business', 'services', 'brands'],
  apply: ['mission', 'home', 'services'],
  case: ['business', 'brands', 'contact'],
};
