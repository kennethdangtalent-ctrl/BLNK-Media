/* The application page: copy, form fields and the messages the form shows. */
import type { FormCopy } from '@/components/FormPage';
import { EMAIL } from './site';

export const applyPage: FormCopy = {
  label: 'Apply',
  kicker: 'Casting call · Nº 002',
  title: 'Apply to the roster.',
  accent: 'roster',
  intro:
    'Tell us who you are and show us what you make. We read every application ourselves and reply to the ones that feel like a fit, usually within a week.',
  form: { title: 'Roster application', number: 'Form Nº 002', note: 'Fields marked * are required. Takes about two minutes.' },
  fields: [
    { key: 'name', label: 'Your name', placeholder: 'What should we call you?', required: true, half: true },
    { key: 'email', label: 'Email', placeholder: 'you@example.com', required: true, kind: 'email', half: true },
    { key: 'twitch', label: 'Twitch channel', placeholder: 'twitch.tv/yourname', required: true, kind: 'url', half: true },
    { key: 'schedule', label: 'When you stream', placeholder: 'e.g. Tue, Thu, Sat at 7pm CT', half: true },
    { key: 'socials', label: 'Other socials', placeholder: 'TikTok, YouTube, Instagram links' },
    { key: 'clip', label: 'One clip that shows who you are', placeholder: 'A link to your best moment', required: true, kind: 'url' },
    { key: 'about', label: 'Tell us about you', placeholder: 'What you make, what you’re building toward, anything else.', multiline: true },
  ],
  groups: [
    { title: 'Who you are', keys: ['name', 'email'] },
    { title: 'Where you stream', keys: ['twitch', 'schedule', 'socials'] },
    { title: 'Show us', keys: ['clip', 'about'] },
  ],
  subject: (v) => `BLNK Roster Application: ${v.name.trim()}`,
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
};

export const lookFor = {
  title: 'What we look for',
  points: [
    { head: 'A clear voice', body: 'Whatever the size of your channel. We sign people, not numbers.' },
    { head: 'A schedule you keep', body: 'You already show up. We help that turn into a career.' },
    { head: 'Something only you make', body: 'The segment, the bit, the thing your chat comes back for.' },
  ],
  link: { label: 'MORE ON WHAT WE LOOK FOR →', href: '/mission' },
} as const;
