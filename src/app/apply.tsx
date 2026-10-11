import { ContinuedOn } from '@/components/ContinuedOn';
import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { ApplyForm } from '@/sections/apply/ApplyForm';

/** The roster application: what we look for, and the form. */
export default function Apply() {
  return (
    <>
      <PageHead {...meta.apply} />
      <Page>
        <Masthead current="apply" />
        <Main>
          <ApplyForm />
          <ContinuedOn from="apply" />
        </Main>
        <Footer variant="apply" />
      </Page>
    </>
  );
}
