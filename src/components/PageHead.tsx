import Head from 'expo-router/head';

import { SITE_URL } from '@/content/site';

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
      <link rel="canonical" href={url} />
    </Head>
  );
}
