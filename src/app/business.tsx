import { useLocalSearchParams } from 'expo-router';

import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { BizHero } from '@/sections/business/BizHero';
import { Brief } from '@/sections/business/Brief';
import { Cases } from '@/sections/business/Cases';
import { Clients } from '@/sections/business/Clients';
import { Decks } from '@/sections/business/Decks';
import { Services } from '@/sections/business/Services';
import { Sponsors } from '@/sections/business/Sponsors';

/** The business pages: clients, sponsors, case studies, decks and services for brand teams. `?s=cases` scrolls to a section. */
export default function Business() {
  const { s } = useLocalSearchParams<{ s?: string }>();
  return (
    <>
      <PageHead {...meta.business} />
      <Page section={typeof s === 'string' ? s : undefined}>
        <Masthead current="business" />
        <Main>
          <BizHero />
          <Clients />
          <Sponsors />
          <Cases />
          <Decks />
          <Services />
          <Brief />
        </Main>
        <Footer variant="business" />
      </Page>
    </>
  );
}
