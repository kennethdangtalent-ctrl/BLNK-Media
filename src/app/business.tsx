import { useLocalSearchParams } from 'expo-router';

import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { BizHero } from '@/sections/business/BizHero';
import { BrandServices } from '@/sections/business/BrandServices';
import { Brief } from '@/sections/business/Brief';
import { Cases } from '@/sections/business/Cases';
import { DeckRequests } from '@/sections/business/DeckRequests';
import { Proof } from '@/sections/business/Proof';

/**
 * The business page, in the order a brand team decides: the pitch, who we work with, the case
 * studies, how we work with brands, the decks to request, then the brief. The full service list lives on
 * /services. `?s=cases` scrolls to a section.
 */
export default function Business() {
  const { s } = useLocalSearchParams<{ s?: string }>();
  return (
    <>
      <PageHead {...meta.business} />
      <Page section={typeof s === 'string' ? s : undefined}>
        <Masthead current="business" />
        <Main>
          <BizHero />
          <Proof />
          <Cases />
          <BrandServices />
          <DeckRequests />
          <Brief />
        </Main>
        <Footer variant="business" />
      </Page>
    </>
  );
}
