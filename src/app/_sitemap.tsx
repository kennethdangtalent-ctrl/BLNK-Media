import { NotFoundPage } from '@/components/NotFoundPage';

/** Replaces Expo Router's built-in developer sitemap, which would otherwise ship at /_sitemap. */
export default function Sitemap() {
  return <NotFoundPage />;
}
