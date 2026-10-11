/* The brand contact page: one form for briefs, deck requests and case studies. */
import type { FormCopy } from '@/components/FormPage';
import { CALL_URL, EMAIL, mailto } from './site';

/**
 * What a brand can ask for. The `id` goes in links (`/contact?topic=media-kit`) so each request
 * button on the business pages opens the form with its topic already picked.
 */
export const topics = [
  { id: 'brief', label: 'Start a brief' },
  { id: 'media-kit', label: 'Media kit' },
  { id: 'one-sheets', label: 'Creator one-sheets' },
  { id: 'proposal', label: 'Campaign proposal example' },
  { id: 'case-gfuel', label: 'Case study: GFuel' },
  { id: 'case-razer', label: 'Case study: Razer' },
  { id: 'case-andaseat', label: 'Case study: Anda Seat' },
  { id: 'other', label: 'Something else' },
] as const;

export type TopicId = (typeof topics)[number]['id'];

/** The contact page link with `topic` picked. */
export const contactHref = (topic?: TopicId) => (topic ? `/contact?topic=${topic}` : '/contact');

export const contactPage: FormCopy = {
  label: 'Contact',
  kicker: 'The brand desk · Nº 001',
  title: 'Let’s work together.',
  accent: 'together',
  intro: 'Start a brief, ask for a deck or a full case study, or just ask a question. Tell us what you need and we’ll get back to you within one business day.',
  form: { title: 'Brand request', number: 'Desk Nº 001', note: 'Fields marked * are required.' },
  fields: [
    { key: 'topic', label: 'What do you need?', required: true, kind: 'choice', options: topics.map((t) => t.label) },
    { key: 'name', label: 'Your name', placeholder: 'First and last', required: true, half: true },
    { key: 'email', label: 'Work email', placeholder: 'you@brand.com', required: true, kind: 'email', half: true },
    { key: 'company', label: 'Brand or company', placeholder: 'Who you’re with', required: true, half: true },
    { key: 'website', label: 'Website', placeholder: 'brand.com', kind: 'url', half: true },
    {
      key: 'creators',
      label: 'Creators you’re interested in',
      kind: 'multi',
      options: ['NovaPovie', 'fumibean', 'm0rals_', 'jackypoowoo', 'cloyyd', 'Not sure yet'],
    },
    { key: 'budget', label: 'Budget range', placeholder: 'e.g. $2–5K', half: true },
    { key: 'timeline', label: 'Timeline', placeholder: 'e.g. Launching in March', half: true },
    { key: 'message', label: 'Anything else', placeholder: 'The product, the campaign, or your question.', multiline: true },
  ],
  groups: [
    { title: 'What you need', keys: ['topic'] },
    { title: 'Who you are', keys: ['name', 'email', 'company', 'website'] },
    { title: 'The details', keys: ['creators', 'budget', 'timeline', 'message'] },
  ],
  subject: (v) => `BLNK ${v.topic || 'Brand request'}: ${v.company.trim() || v.name.trim()}`,
  submit: 'SEND REQUEST →',
  sending: 'SENDING…',
  sent: {
    title: 'Got it. Talk soon.',
    body: 'Your request is in. We’ll reply to the email you gave us within one business day, and decks usually go out the same day.',
  },
  failed: `Something went wrong sending that. Try again, or email us at ${EMAIL}.`,
  mailtoNote: 'This opens your email app with your request filled in. Just hit send.',
  required: 'Required',
  badEmail: 'That email doesn’t look right.',
};

export const nextSteps = {
  title: 'What happens next',
  points: [
    { head: 'We read it', body: 'A person, not an inbox rule. Usually the same day.' },
    { head: 'You get what you asked for', body: 'Decks and case studies go straight to your inbox.' },
    { head: 'We set up a call', body: 'Planning a campaign? We’ll find a time to talk through the brief.' },
  ],
  direct: [
    { label: 'Rather talk?', link: { label: 'BOOK A 30-MIN CALL ↗', href: CALL_URL } },
    { label: 'Rather email?', link: { label: 'BUSINESS@BLNK.NAME →', href: mailto('BLNK Brand Brief') } },
  ],
} as const;
