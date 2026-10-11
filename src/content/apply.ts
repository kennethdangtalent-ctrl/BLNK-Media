/* The application page: copy, form fields and the messages the form shows. */
import { EMAIL } from './site';

/**
 * Where the form posts applications: FormSubmit's AJAX endpoint, which emails each one to `EMAIL`.
 * The very first submission makes FormSubmit send a one-time activation email to that inbox; after
 * the link in it is clicked, applications arrive as emails. Set this to '' to fall back to opening
 * the applicant's email app with everything filled in.
 */
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

export const applyPage = {
  kicker: 'Casting call · Nº 002',
  title: 'Apply to the roster.',
  /** The word printed in crimson in the title. */
  accent: 'roster',
  intro: 'Tell us who you are and show us what you make. We read every application ourselves and reply to the ones that feel like a fit, usually within a week.',
  lookFor: {
    title: 'What we look for',
    points: [
      { head: 'A clear voice', body: 'Whatever the size of your channel. We sign people, not numbers.' },
      { head: 'A schedule you keep', body: 'You already show up. We help that turn into a career.' },
      { head: 'Something only you make', body: 'The segment, the bit, the thing your chat comes back for.' },
    ],
    link: { label: 'MORE ON WHAT WE LOOK FOR →', href: '/mission' },
  },
  form: { title: 'Roster application', number: 'Form Nº 002', note: 'Fields marked * are required. Takes about two minutes.' },
  submit: 'SEND APPLICATION →',
  sending: 'SENDING…',
  sent: {
    title: 'Got it. Thank you.',
    body: 'Your application is in. We read every one, and if it feels like a fit we’ll be in touch at the email you gave us.',
  },
  failed: `Something went wrong sending that. Try again, or email it to ${EMAIL}.`,
  mailtoNote: 'This opens your email app with your application filled in. Just hit send.',
  required: 'Required',
  badEmail: 'That email doesn’t look right.',
} as const;

/** The form's sections, in order, and the fields each holds. */
export const groups: readonly { title: string; keys: readonly FieldKey[] }[] = [
  { title: 'Who you are', keys: ['name', 'email'] },
  { title: 'Where you stream', keys: ['twitch', 'schedule', 'socials'] },
  { title: 'Show us', keys: ['clip', 'about'] },
];

export type FieldKey = 'name' | 'email' | 'twitch' | 'socials' | 'clip' | 'schedule' | 'about';

export const fields: readonly {
  key: FieldKey;
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  kind?: 'email' | 'url';
}[] = [
  { key: 'name', label: 'Your name', placeholder: 'What should we call you?', required: true },
  { key: 'email', label: 'Email', placeholder: 'you@example.com', required: true, kind: 'email' },
  { key: 'twitch', label: 'Twitch channel', placeholder: 'twitch.tv/yourname', required: true, kind: 'url' },
  { key: 'socials', label: 'Other socials', placeholder: 'TikTok, YouTube, Instagram links' },
  { key: 'clip', label: 'One clip that shows who you are', placeholder: 'A link to your best moment', required: true, kind: 'url' },
  { key: 'schedule', label: 'When you stream', placeholder: 'e.g. Tue, Thu, Sat at 7pm CT' },
  { key: 'about', label: 'Tell us about you', placeholder: 'What you make, what you’re building toward, anything else.', multiline: true },
];
