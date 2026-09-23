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
import { RateCard } from '@/sections/business/RateCard';
import { Sponsors } from '@/sections/business/Sponsors';

/** The business pages: clients, sponsors, case studies, decks and rates for brand teams. */
export default function Business() {
  return (
    <>
      <PageHead {...meta.business} />
      <Page>
        <Masthead current="business" />
        <Main>
          <BizHero />
          <Clients />
          <Sponsors />
          <Cases />
          <Decks />
          <RateCard />
          <Brief />
        </Main>
        <Footer variant="business" />
      </Page>
    </>
  );
}
