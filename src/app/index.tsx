import { useLocalSearchParams } from 'expo-router';

import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { Apply } from '@/sections/home/Apply';
import { Cover } from '@/sections/home/Cover';
import { Marquee } from '@/sections/home/Marquee';
import { Mission } from '@/sections/home/Mission';
import { Roster } from '@/sections/home/Roster';

/** Issue 001: the creator-facing front page. `?s=roster|mission|apply` scrolls to a section. */
export default function IssueOne() {
  const { s } = useLocalSearchParams<{ s?: string }>();
  return (
    <>
      <PageHead {...meta.home} />
      <Page section={typeof s === 'string' ? s : undefined}>
        <Masthead current="home" />
        <Main>
          <Cover />
          <Marquee />
          <Roster />
          <Mission />
          <Apply />
        </Main>
        <Footer variant="home" />
      </Page>
    </>
  );
}
