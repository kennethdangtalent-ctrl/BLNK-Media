import Head from 'expo-router/head';
import { StyleSheet, View } from 'react-native';

import { Band } from './Band';
import { Footer } from './Footer';
import { Btn } from './Link';
import { Eyebrow } from './Marks';
import { Main, Page } from './Page';
import { Masthead } from './Masthead';
import { Display, Serif } from './Type';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';

const TITLE = 'Not in\nthis issue.';

export function NotFoundPage() {
  const L = useLayout();
  return (
    <>
      <Head>
        <title>Not found — BLNK Media</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Page>
        <Masthead current="other" />
        <Main>
          <Band tone="accent" label="Page not found">
            <View style={[styles.stack, { gap: L.fl(40, 28) }]}>
              <Eyebrow square={color.ink}>Nº 404 — MISSING PAGE</Eyebrow>
              <Display level={1} size={fitLines(TITLE, L.inner, L.fl(160, 72), -0.01)} lh={0.86} ls={-0.01}>
                {TITLE}
              </Display>
              <Serif size={L.fl(30, 21)} lh={1.2} maxCh={40}>
                The page you asked for was never printed. The current issue is one tap away.
              </Serif>
              <Btn href="/" label="BACK TO ISSUE 001" shadow="ink" dismissTo />
            </View>
          </Band>
        </Main>
        <Footer variant="home" />
      </Page>
    </>
  );
}

const styles = StyleSheet.create({
  stack: { alignItems: 'flex-start' },
});
