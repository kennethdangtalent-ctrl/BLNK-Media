import { StyleSheet, View } from 'react-native';

import { Band, Frame } from '@/components/Band';
import { CaseCover, coverFor } from '@/components/CaseCover';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { Btn, ULink } from '@/components/Link';
import { Stamp } from '@/components/Marks';
import { Masthead } from '@/components/Masthead';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { PhotoSlot } from '@/components/PhotoSlot';
import { TiltCard } from '@/components/TiltCard';
import { Display, Copy, Deck } from '@/components/Type';
import { cases, type CaseStudy } from '@/content/business';
import { roster } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { ToneProvider, useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * A case study laid out like a magazine feature: a cover-colored opener with the brand set huge
 * and the cover beside it, the numbers, the creator, then the ask and the next story.
 */
export function CaseStory({ index }: { index: number }) {
  const item = cases.items[index];
  const next = cases.items[(index + 1) % cases.items.length];
  const title = `${item.brand} × ${item.creator}`;
  const format = item.rows.find(([term]) => term === 'FORMAT')?.[1] ?? 'TBD';
  return (
    <>
      <PageHead
        title={`BLNK Media — ${title}`}
        description={`Case study: ${title}. Format: ${format}. Results are published when the campaign wraps.`}
        path={`/cases/${item.slug}`}
      />
      <Page>
        <Masthead current="other" />
        <Main>
          <Opener item={item} index={index} />
          <Numbers item={item} />
          <Creator item={item} />
          <Ask item={item} next={next} />
        </Main>
        <Footer variant="case" />
      </Page>
    </>
  );
}

function Opener({ item, index }: { item: CaseStudy; index: number }) {
  const L = useLayout();
  const cover = coverFor(index);
  const showCover = !L.isPhone;
  const coverW = L.isDesktop ? Math.round(340 * L.s) : 240;
  const textW = showCover ? L.inner - coverW - L.fl(64, 32) : L.inner;
  const brandSize = fitWords(item.brand, textW, L.fl(200, 88), -0.01);
  return (
    <ToneProvider tone={cover.tone}>
      <View role="region" aria-label="Cover story" style={[styles.opener, { backgroundColor: cover.bg }]}>
        <Frame style={{ paddingTop: L.fl(96, 56), paddingBottom: L.fl(96, 56) }}>
          <View style={[styles.openerRow, { gap: L.fl(64, 32) }]}>
            <View style={styles.openerText}>
              <Display level={1} size={brandSize} lh={0.85} ls={-0.01} color={color.ink}>
                {item.brand}
              </Display>
              <Deck italic size={L.fl(56, 34)} lh={1} color={color.ink}>
                × {item.creator}
              </Deck>
              {item.objective ? (
                <Deck size={L.fl(28, 22)} lh={1.2} maxCh={36} color={color.ink}>
                  {item.objective}
                </Deck>
              ) : null}
              <Stamp label={`${item.label.replace('CASE', 'CASE STUDY')} · RESULTS SOON`} tint={color.ink} />

            </View>
            {showCover ? (
              <View style={{ width: coverW }}>
                <TiltCard rotate={index % 2 === 0 ? 3 : -3}>
                  <View style={styles.coverFrame}>
                    <CaseCover
                      item={item}
                      index={index + 1}
                      brandSize={fitWords(item.brand, coverW - 44, 64, -0.01)}
                      pad={18}
                      minHeight={Math.round(coverW * 1.3)}
                    />
                  </View>
                </TiltCard>
              </View>
            ) : null}
          </View>
        </Frame>
      </View>
    </ToneProvider>
  );
}

function Numbers({ item }: { item: CaseStudy }) {
  const L = useLayout();
  return (
    <Band tone="dark" label="The numbers">
      <View style={{ gap: L.fl(48, 32) }}>
        <Display level={2} size={L.fl(64, 40)} lh={0.9}>The numbers</Display>
        <Grid cols={L.isPhone ? 1 : 3} gap={L.fl(32, 20)} rowGap={24}>
          {item.rows.map(([term, value]) => (
            <Stat key={term} term={term} value={value} />
          ))}
        </Grid>
        <Deck italic size={L.fl(28, 22)} lh={1.2} maxCh={44}>
          Results are published here when the campaign wraps.
        </Deck>
      </View>
    </Band>
  );
}

function Stat({ term, value }: { term: string; value: string }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={styles.stat}>
      <Copy size={12} weight={600} ls={0.16} color={tone.mute}>
        {term}
      </Copy>
      <Display size={fitWords(value, L.isPhone ? L.inner : L.inner / 3 - 32, L.fl(72, 48))} lh={0.9}>
        {value}
      </Display>
    </View>
  );
}

function Creator({ item }: { item: CaseStudy }) {
  const L = useLayout();
  const creator = roster.find((c) => c.name.toLowerCase() === item.creator.toLowerCase());
  if (!creator) return null;
  const stacked = L.isPhone;
  const photoW = L.isDesktop ? Math.round(420 * L.s) : L.isTablet ? Math.round(L.inner * 0.4) : L.inner;
  return (
    <Band tone="light" label="The creator">
      <View style={{ gap: L.fl(48, 32) }}>
        <Display level={2} size={L.fl(64, 40)} lh={0.9}>The creator</Display>
        <View style={[styles.creatorRow, { flexDirection: stacked ? 'column' : 'row', gap: L.fl(64, 32) }]}>
          <View style={{ width: photoW }}>
            <PhotoSlot subject={creator} height={Math.round((photoW * 2) / 3)} tilt={-3} />
          </View>
          <CreatorText creator={creator} />
        </View>
      </View>
    </Band>
  );
}

function CreatorText({ creator }: { creator: (typeof roster)[number] }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={styles.creatorText}>
      <Copy size={12} weight={600} ls={0.16} color={tone.mute}>
        {creator.kicker}
      </Copy>
      <Display level={2} size={L.fl(80, 52)} lh={0.88} upper>
        {creator.name}
      </Display>
      <Deck italic size={L.fl(28, 21)} lh={1.15}>
        {creator.hook}
      </Deck>
      <Copy size={L.fl(15, 14)} lh={1.65} color={tone.mute} maxCh={60}>
        {creator.body}
      </Copy>
      <ULink href="/?s=roster">MEET THE ROSTER →</ULink>
    </View>
  );
}

function Ask({ item, next }: { item: CaseStudy; next: CaseStudy }) {
  const L = useLayout();
  return (
    <Band tone="accent" label="Request the full case" ruleTop>
      <View style={{ gap: L.fl(48, 32) }}>
        <Display level={2} size={fitWords('Want the full case?', L.inner, L.fl(120, 56))} lh={0.88}>
          Want the full case?
        </Display>
        <View style={styles.actions}>
          <Btn href={item.cta.href} label={item.cta.label} />
          <Btn href="/business?s=cases" label="← ALL CASE STUDIES" variant="outline" shadow="ink" />
        </View>
        <View style={styles.next}>
          <Copy size={12} weight={600} ls={0.16}>
            NEXT STORY
          </Copy>
          <ULink href={`/cases/${next.slug}`} size={14}>{`${next.brand.toUpperCase()} × ${next.creator.toUpperCase()} →`}</ULink>
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  opener: { borderBottomWidth: 3, borderColor: color.ink },
  openerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  openerText: { flex: 1, minWidth: 0, gap: 20 },
  coverFrame: { borderWidth: 2, borderColor: color.ink, boxShadow: '0px 14px 28px rgba(13, 13, 13, 0.3)' },
  stat: { gap: 12, borderTopWidth: 3, borderColor: color.paper, paddingTop: 16 },
  creatorRow: { alignItems: 'flex-start' },
  creatorText: { flex: 1, minWidth: 0, gap: 16 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  next: { gap: 10, paddingTop: 24, borderTopWidth: 1, borderColor: color.ink },
});
