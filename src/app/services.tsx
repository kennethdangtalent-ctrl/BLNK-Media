import { ContinuedOn } from '@/components/ContinuedOn';
import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { ServiceList } from '@/sections/services/ServiceList';

/** Everything BLNK does, for brands and for the creators it signs. */
export default function Services() {
  return (
    <>
      <PageHead {...meta.services} />
      <Page>
        <Masthead current="services" />
        <Main>
          <ServiceList />
          <ContinuedOn from="services" />
        </Main>
        <Footer variant="services" />
      </Page>
    </>
  );
}
