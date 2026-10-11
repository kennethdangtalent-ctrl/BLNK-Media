/*
 * Privacy policy, terms of service and the cookie notice. Written for the site as built:
 * no accounts, no analytics, no cookies; one roster application form, delivered to our inbox.
 * If tracking or a newsletter is ever added, update the privacy policy first.
 */
import { EMAIL } from './site';

export type LegalSection = {
  heading: string;
  body: readonly string[];
  /** In-page anchor, e.g. `cookies` for /privacy#cookies. */
  id?: string;
};

export type LegalDoc = { eyebrow: string; title: string; updated: string; intro: string; sections: readonly LegalSection[] };

export const LEGAL_UPDATED = 'Last updated October 11, 2026';

export const privacy: LegalDoc = {
  eyebrow: 'LEGAL',
  title: 'Privacy policy.',
  updated: LEGAL_UPDATED,
  intro:
    "The short version: we don't use tracking cookies, we don't run analytics, and we don't sell your information. The only personal information we get is what you choose to send us, by email or through our application form.",
  sections: [
    {
      heading: 'Who we are',
      body: [
        `BLNK Media ("BLNK", "we", "us") is a creator management company. This policy covers blnk.name and its pages. Questions go to ${EMAIL}.`,
      ],
    },
    {
      heading: 'What we collect',
      body: [
        'Information you send us. If you apply to the roster through our application form, or email us to apply or to start a brief, we receive what you include: your name, email address, social links, a clip link, your streaming schedule, and anything else you choose to share.',
        'Technical information. Like any website, our hosting provider automatically records basic request data, such as IP address, browser type and the pages requested, to keep the site running and secure.',
        "Our application form sends what you enter to our email inbox through a form-delivery service. We don't have accounts, newsletters or payment pages on this site.",
      ],
    },
    {
      heading: 'How we use it',
      body: [
        'To reply to you, review applications, prepare quotes and run the campaigns you ask us about.',
        'To keep the site secure and working.',
        "We don't use your information for advertising, and we don't sell it or share it for advertising.",
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        "With creators or brands, only as needed for a partnership you've asked us about.",
        'With service providers that help us run the business, such as email, form delivery and website hosting, who may only use it to provide their service to us.',
        'When the law requires it, or to protect our rights or the safety of others.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      body: [
        "This site doesn't set cookies and doesn't use analytics or tracking tools.",
        'When you dismiss the cookie notice, your browser stores a small note on your own device (in local storage) so the notice stays closed. It holds no personal information, and clearing your browser data removes it.',
        "Links to Twitch, TikTok, Instagram, YouTube and our clients' sites take you to services with their own cookie and privacy policies.",
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        "We keep emails and applications for as long as they're useful for the conversation or partnership, then delete them. Ask us and we'll delete yours sooner.",
      ],
    },
    {
      heading: 'Your choices and rights',
      body: [
        `You can ask us to see, correct or delete the personal information we hold about you by emailing ${EMAIL}. We'll respond within 30 days.`,
        "If you live in California, you have the right to know, delete and correct personal information, and to opt out of its sale or sharing. We don't sell or share personal information, and we won't treat you differently for using these rights.",
      ],
    },
    {
      heading: 'Children',
      body: [
        "This site isn't directed at children under 13, and we don't knowingly collect their information. Creators under 18 should apply with a parent or guardian's permission.",
      ],
    },
    {
      heading: 'Changes',
      body: ['If we change this policy, we will update the date at the top of this page.'],
    },
  ],
};

export const terms: LegalDoc = {
  eyebrow: 'LEGAL',
  title: 'Terms of service.',
  updated: LEGAL_UPDATED,
  intro: 'These terms cover your use of blnk.name. By using the site, you agree to them.',
  sections: [
    {
      heading: 'Who we are',
      body: [`BLNK Media ("BLNK", "we", "us") runs this site. You can reach us at ${EMAIL}.`],
    },
    {
      heading: 'Using the site',
      body: [
        "You may browse the site and share links to it. Please don't copy it wholesale, scrape it, or use it in a way that harms the site or other people.",
      ],
    },
    {
      heading: 'Applications',
      body: [
        "Sending us an application doesn't create an agreement or guarantee a spot on the roster. Management is only agreed in a separate written contract.",
      ],
    },
    {
      heading: 'Brands and quotes',
      body: [
        "Services and descriptions on this site are general information, not offers. Any campaign or service is quoted for your brief and agreed in a separate written agreement, which controls if it conflicts with these terms.",
      ],
    },
    {
      heading: 'Content and trademarks',
      body: [
        'The site design and text belong to BLNK Media. Creator names, photos and handles belong to the creators. Brand names and logos belong to their owners and appear only to describe work and partnerships.',
      ],
    },
    {
      heading: 'Other sites',
      body: [
        "The site links to platforms and companies we don't control. Their own terms and privacy policies apply, and we aren't responsible for their content.",
      ],
    },
    {
      heading: 'No warranties',
      body: [
        'The site is provided "as is". We work to keep it accurate, but figures such as follower counts and views change over time and may not be current.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        "To the extent the law allows, BLNK Media isn't liable for indirect or consequential losses arising from your use of the site.",
      ],
    },
    {
      heading: 'Changes',
      body: ['We may update these terms. The date at the top of this page shows the latest version.'],
    },
    {
      heading: 'Governing law',
      body: ['These terms are governed by the laws of the State of California.'],
    },
  ],
};

export const cookieNotice = {
  text: "We don't use tracking cookies. This site only remembers that you've closed this notice.",
  link: { label: 'PRIVACY POLICY', href: '/privacy#cookies' },
  dismiss: 'GOT IT',
  /** Local storage key that keeps the notice closed. Bump the version to show it again after a policy change. */
  storageKey: 'blnk.cookie-notice.v1',
} as const;
