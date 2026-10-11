/* Site-wide constants. Every outbound URL on the site is a constant in src/content. */

export const EMAIL = 'business@BLNK.name';

/** Canonical origin for metadata. The boards write the domain as BLNK.name. */
export const SITE_URL = 'https://blnk.name';

export const DOMAIN_URL = 'https://BLNK.name';

export const ISSUE = { no: 'Nº 001', date: 'SEP 2026', domain: 'BLNK.NAME' } as const;

export function mailto(subject?: string): string {
  return subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`;
}

export const meta = {
  home: {
    title: 'BLNK Media — Issue 001',
    description:
      'BLNK Media is a creator management house, Twitch first. Five creators, one roster, no tiers. Applications for Issue 002 are open.',
    path: '/',
  },
  business: {
    title: 'BLNK Media — Business',
    description:
      'Clients, sponsors, case studies, decks and services. Everything a brand team needs to say yes to a BLNK campaign, on one page.',
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
  services: {
    title: 'BLNK Media — Services',
    description: 'What BLNK does for brands (sponsored streams, short- and long-form, campaigns) and for the creators it signs (brand deals, growth, the business side).',
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
  business: { issue: 'Nº 001 — THE BUSINESS PAGES', badge: 'NOW BOOKING' },
  mission: { issue: 'Nº 001 — THE MISSION', badge: 'APPLICATIONS OPEN' },
  services: { issue: 'Nº 001 — THE SERVICES', badge: 'NOW BOOKING' },
  apply: { issue: 'Nº 002 — CASTING NOW', badge: 'APPLICATIONS OPEN' },
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
    case: 'Campaign results are added when each campaign wraps.',
  },
  legal: [
    { label: 'PRIVACY', href: '/privacy' },
    { label: 'TERMS', href: '/terms' },
    { label: 'COOKIES', href: '/privacy#cookies' },
  ],
} as const;
