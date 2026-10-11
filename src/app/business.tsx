import { useLocalSearchParams } from 'expo-router';

import { ContinuedOn } from '@/components/ContinuedOn';
import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { BizHero } from '@/sections/business/BizHero';
import { Cases } from '@/sections/business/Cases';
import { DeckRequests } from '@/sections/business/DeckRequests';
import { Proof } from '@/sections/business/Proof';
import { WorkClose } from '@/sections/business/WorkClose';

/**
 * Our Work (still at /business, so old links keep working): the proof, with the selling left to
 * /brands. The case studies first, then who we work with, the decks to request, and one ask.
 * `?s=cases` scrolls to a section.
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
          <Cases />
          <Proof />
          <DeckRequests />
          <WorkClose />
          <ContinuedOn from="business" />
        </Main>
        <Footer variant="business" />
      </Page>
    </>
  );
}
