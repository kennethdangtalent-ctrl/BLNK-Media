import { useLocalSearchParams } from 'expo-router';

import { NotFoundPage } from '@/components/NotFoundPage';
import { cases } from '@/content/business';
import { CaseStory } from '@/sections/case/CaseStory';

/** One page per case study, pre-rendered for each slug in the static export. */
export function generateStaticParams(): { slug: string }[] {
  return cases.items.map((item) => ({ slug: item.slug }));
}

export default function CasePage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const index = cases.items.findIndex((item) => item.slug === slug);
  if (index < 0) return <NotFoundPage />;
  return <CaseStory index={index} />;
}
