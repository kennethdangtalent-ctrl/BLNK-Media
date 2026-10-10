import Head from 'expo-router/head';

import { SITE_URL } from '@/content/site';

/** The image link previews show when blnk.name is shared: the logo, 1200 x 630, from `public/og.png`. */
const SHARE_IMAGE = `${SITE_URL}/og.png`;

/** Per-route <title>, description, Open Graph tags and canonical URL, written into the static HTML. */
export function PageHead({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SHARE_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="BLNK Media logo: the blink eye over BLNK" />
      <meta name="twitter:image" content={SHARE_IMAGE} />
      <link rel="canonical" href={url} />
    </Head>
  );
}
