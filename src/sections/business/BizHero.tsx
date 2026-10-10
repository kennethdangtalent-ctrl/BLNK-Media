import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Band } from '@/components/Band';
import { Btn, ULink } from '@/components/Link';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { Display, Copy, Deck } from '@/components/Type';
import { bizHero } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { color } from '@/theme/tokens';

/** Width of the board's media-kit composition: a 480 px card plus its 40 px ink offset. */
const COMPOSITION_W = 520;

export function BizHero() {
  const L = useLayout();
  const twoColumns = L.isDesktop;
  const cardW = twoColumns ? Math.round(COMPOSITION_W * L.s) : Math.min(COMPOSITION_W, L.inner);
  const gap = twoColumns ? Math.round(64 * L.s) : L.fl(64, 48);
  const textW = twoColumns ? L.inner - cardW - gap : L.inner;
  // The board lets this headline wrap inside its column, so only single words must fit.
  const titleSize = fitWords(bizHero.title, textW, L.fl(150, 64), -0.01);

  return (
    <Band tone="light" label="Business" ruleBottom padTop={L.fl(80, 40)} padBottom={L.fl(72, 56)}>
      <View style={[styles.grid, { flexDirection: twoColumns ? 'row' : 'column', gap }]}>
        <View style={[twoColumns && styles.textColumn, { gap: L.fl(40, 28) }]}>
          <Reveal index={1}>
            <Display level={1} size={titleSize} lh={0.88} ls={-0.01}>
              {bizHero.title}
            </Display>
          </Reveal>
          <Reveal index={2}>
            <Deck size={L.fl(30, 21)} lh={1.2} maxCh={36}>
              {bizHero.lede}
            </Deck>
          </Reveal>
          <Reveal index={3} style={styles.ctas}>
            <Btn href={bizHero.cta.href} label={bizHero.cta.label} />
            <ULink href={bizHero.back.href} dismissTo size={13} weight={400} ls={0.04}>
              {bizHero.back.label}
            </ULink>
          </Reveal>
        </View>
        <Reveal index={4}>
          <MediaKitCard width={cardW} />
        </Reveal>
      </View>
    </Band>
  );
}

/** The media-kit card, tilted +2° on a soft paper shadow. It grows with its rows on small screens. */
function MediaKitCard({ width }: { width: number }) {
  const k = width / COMPOSITION_W;
  const px = (n: number) => Math.round(n * k * 10) / 10;
  const { kit } = bizHero;

  return (
    <View style={{ width, paddingRight: px(40), paddingBottom: px(40) }}>
      <TiltCard rotate={2}>
        <View style={[styles.kit, { minHeight: px(380), padding: px(28), gap: px(24) }]}>
          <View style={styles.kitTop}>
            <Display size={px(56)} lh={0.85} style={styles.shrink}>
              {kit.title}
            </Display>
            <Copy size={11} weight={600} ls={0.16}>
              {kit.issue}
            </Copy>
          </View>
          <View>
            {kit.rows.map((row, i) => (
              <View key={row.label} style={[styles.kitRow, i === kit.rows.length - 1 && styles.kitRowLast]}>
                <Copy size={12} weight={600} ls={0.16}>
                  {row.label}
                </Copy>
                <Copy size={12} ls={0.08} align="right" style={styles.shrink}>
                  {row.value}
                </Copy>
              </View>
            ))}
          </View>
        </View>
      </TiltCard>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { alignItems: 'flex-start' },
  textColumn: { flex: 1, minWidth: 0 },
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 28, rowGap: 16 },
  kit: {
    backgroundColor: color.paper,
    borderWidth: 3,
    borderColor: color.ink,
    justifyContent: 'space-between',
    boxShadow: '0px 14px 30px rgba(13, 13, 13, 0.18)',
  } as ViewStyle,
  kitTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  kitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: color.ink,
  },
  kitRowLast: { borderBottomWidth: 2 },
  shrink: { flexShrink: 1 },
});
