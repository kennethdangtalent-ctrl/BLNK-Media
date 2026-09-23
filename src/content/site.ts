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
      'Clients, sponsors, case studies, decks and rates. Everything a brand team needs to say yes to a BLNK campaign, on one page.',
    path: '/business',
  },
} as const;

export const masthead = {
  home: { issue: 'Nº 001 — THE CREATOR ISSUE', badge: 'APPLICATIONS OPEN' },
  business: { issue: 'Nº 001 — THE BUSINESS PAGES', badge: 'NOW BOOKING' },
} as const;

export const footer = {
  copyright: '© 2026 BLNK Media. Managed by Ken.',
  notes: {
    home: 'Follower counts from public Twitch trackers, September 2026. Photos: [TO BE SHOT].',
    business: 'Brand names are the property of their owners. Logos: [TO BE SUPPLIED].',
  },
} as const;
