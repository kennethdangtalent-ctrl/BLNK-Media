import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { Footer } from '@/components/Footer';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Masthead } from '@/components/Masthead';
import { meta } from '@/content/site';
import { Proof } from '@/sections/business/Proof';
import { Apply } from '@/sections/home/Apply';
import { Close } from '@/sections/home/Close';
import { Cover } from '@/sections/home/Cover';
import { Marquee } from '@/sections/home/Marquee';
import { Offer } from '@/sections/home/Offer';
import { Roster } from '@/sections/home/Roster';

/** The mission used to be a band on this page. Links shared before it moved still arrive as `?s=mission` or `#mission`. */
const MOVED = 'mission';

/**
 * Issue 001, the front page, brands first: the pitch, what we do for brands, who we work with, the
 * roster as the reach, the ask, then a smaller corner for creators. `?s=brands|roster|apply` scrolls to a section.
 */
export default function IssueOne() {
  const { s } = useLocalSearchParams<{ s?: string }>();
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web' && window.location.hash === `#${MOVED}`) router.replace('/mission');
  }, [router]);

  if (s === MOVED) return <Redirect href="/mission" />;

  return (
    <>
      <PageHead {...meta.home} />
      <Page section={typeof s === 'string' ? s : undefined}>
        <Masthead current="home" />
        <Main>
          <Cover />
          <Marquee />
          <Offer />
          <Proof />
          <Roster />
          <Close />
          <Apply />
        </Main>
        <Footer variant="home" />
      </Page>
    </>
  );
}
