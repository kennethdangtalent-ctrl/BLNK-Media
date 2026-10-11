import { ContinuedOn } from '@/components/ContinuedOn';
import { Footer } from '@/components/Footer';
import { Masthead } from '@/components/Masthead';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { meta } from '@/content/site';
import { BrandsClose, BrandsHero, Steps, Ways } from '@/sections/brands/BrandSections';
import { Proof } from '@/sections/business/Proof';

/**
 * For brands: the one link to send a business. The pitch, the two ways to work with BLNK (the
 * creators, the team), how a campaign runs, who we work with, and the ask.
 */
export default function Brands() {
  return (
    <>
      <PageHead {...meta.brands} />
      <Page>
        <Masthead current="brands" />
        <Main>
          <BrandsHero />
          <Ways />
          <Steps />
          <Proof compact />
          <BrandsClose />
          <ContinuedOn from="brands" />
        </Main>
        <Footer variant="brands" />
      </Page>
    </>
  );
}
