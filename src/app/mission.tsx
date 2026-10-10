import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { Chain } from '@/sections/mission/Chain';
import { Founder } from '@/sections/mission/Founder';
import { Thesis } from '@/sections/mission/Thesis';
import { Values } from '@/sections/mission/Values';

/** The Mission: the company thesis, where it leads, the four values, and the founder. */
export default function Mission() {
  return (
    <>
      <PageHead {...meta.mission} />
      <Page>
        <Masthead current="mission" />
        <Main>
          <Thesis />
          <Chain />
          <Values />
          <Founder />
        </Main>
        <Footer variant="mission" />
      </Page>
    </>
  );
}
