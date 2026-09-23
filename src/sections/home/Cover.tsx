import { Image as Photo } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { DotGrid } from '@/components/DotGrid';
import { Btn, ULink } from '@/components/Link';
import { Badge, Eyebrow, Tag } from '@/components/Marks';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { Display, Mono, Serif } from '@/components/Type';
import { cover } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';

/** Width of the board's cover composition: a 480 px card plus its 40 px accent offset. */
const COMPOSITION_W = 520;

export function Cover() {
  const L = useLayout();
  const twoColumns = L.isDesktop;
  const cardW = twoColumns ? Math.round(COMPOSITION_W * L.s) : Math.min(COMPOSITION_W, L.inner);
  const gap = twoColumns ? Math.round(64 * L.s) : L.fl(64, 48);
  const textW = twoColumns ? L.inner - cardW - gap : L.inner;
  const titleSize = fitLines(cover.title, textW, L.fl(112, 58), -0.005);

  return (
    <Band tone="light" label="Cover" ruleBottom padTop={L.fl(80, 40)} padBottom={L.fl(72, 56)}>
      <View style={[styles.grid, { flexDirection: twoColumns ? 'row' : 'column', gap }]}>
        <View style={[twoColumns && styles.textColumn, { gap: L.fl(40, 28) }]}>
          <Reveal index={0}>
            <Eyebrow>{cover.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal index={1}>
            <Display level={1} size={titleSize} lh={0.88} ls={-0.005}>
              {cover.title}
            </Display>
          </Reveal>
          <Reveal index={2}>
            <Serif size={L.fl(30, 21)} lh={1.2} maxCh={34}>
              {cover.lede}
            </Serif>
          </Reveal>
          <Reveal index={3} style={styles.ctas}>
            <Btn href={cover.cta.href} label={cover.cta.label} />
            <ULink href={cover.brands.href} size={13} weight={400} ls={0.04}>
              {cover.brands.label}
            </ULink>
          </Reveal>
        </View>
        <Reveal index={4}>
          <CoverCard width={cardW} />
        </Reveal>
      </View>
    </Band>
  );
}

/** The magazine cover: dark halftone plate tilted −2° over an accent block, scaled as one piece. */
function CoverCard({ width }: { width: number }) {
  const k = width / COMPOSITION_W;
  const px = (n: number) => Math.round(n * k * 10) / 10;
  // Card labels shrink with the card but stay legible on a phone.
  const label = (n: number) => Math.max(9, Math.round(n * k));
  const { card } = cover;

  return (
    <View style={{ width, paddingRight: px(40), paddingBottom: px(44) }}>
      <View aria-hidden style={[styles.offset, { left: px(40), top: px(44) }]} />
      <TiltCard rotate={-2}>
        <View style={[styles.plate, { height: px(640), padding: px(24) }]}>
          {card.photo ? (
            <Photo
              source={card.photo}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              contentPosition={{ top: `${card.photoFocus ?? 30}%`, left: '50%' }}
              accessibilityLabel="Cover photo of NovaPovie"
            />
          ) : (
            <DotGrid color={color.dotOnCover} />
          )}
          <View style={styles.plateTop}>
            <Display size={px(150)} lh={0.8} ls={0.01} upper={false} color={color.paper}>
              BLNK
            </Display>
            <View style={styles.plateMeta}>
              {card.meta.map((line) => (
                <Mono key={line} size={label(11)} weight={600} ls={0.16} color={color.paper} align="right">
                  {line}
                </Mono>
              ))}
            </View>
          </View>
          {card.photo ? null : (
            <Tag
              label={card.photoLabel}
              tint={color.paper}
              border={color.dashOnInk}
              fill={color.tagOnCover}
              size={label(12)}
              padX={px(18)}
              padY={px(14)}
              style={styles.center}
            />
          )}
          <View style={{ gap: px(12) }}>
            <Badge label={card.badge} size={label(11)} padX={px(10)} padY={px(5)} />
            <Serif italic size={px(34)} lh={1.05} color={color.paper}>
              {card.line}
            </Serif>
            <Mono size={label(11)} ls={0.1} lh={1.7} color={color.credit}>
              {card.credits}
            </Mono>
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
  offset: { position: 'absolute', right: 0, bottom: 0, backgroundColor: color.accent },
  plate: {
    borderWidth: 3,
    borderColor: color.ink,
    backgroundColor: color.plate,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  plateTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  plateMeta: { alignItems: 'flex-end', gap: 2 },
  center: { alignSelf: 'center' },
});
