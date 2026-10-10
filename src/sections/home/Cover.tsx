import { Image as Photo } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { Band } from '@/components/Band';
import { Btn, ULink } from '@/components/Link';
import { Badge, Eyebrow } from '@/components/Marks';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { Display, Mono, Serif } from '@/components/Type';
import { cover } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

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

/** How long each creator holds the cover. */
const SLIDE_MS = 5000;
const fade = webStyle<ViewStyle>({ transitionProperty: 'opacity', transitionDuration: '700ms', transitionTimingFunction: 'ease' });

/**
 * The magazine cover: dark halftone plate tilted −2° over an accent block, scaled as one piece.
 * It rotates through the roster every 5 seconds, cross-fading between creators. Hovering the card
 * holds the current one, the dots jump to any creator, and under reduced motion it stays put.
 */
function CoverCard({ width }: { width: number }) {
  const L = useLayout();
  const k = width / COMPOSITION_W;
  const px = (n: number) => Math.round(n * k * 10) / 10;
  // Card labels shrink with the card but stay legible on a phone.
  const label = (n: number) => Math.max(9, Math.round(n * k));
  const { card } = cover;
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  // One timer per slide, so jumping with a dot restarts the 5 seconds.
  useEffect(() => {
    if (held || L.reduceMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % card.slides.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [index, held, L.reduceMotion, card.slides.length]);

  const dot = Math.max(7, px(9));
  const textBottom = px(24) + dot + px(18);

  return (
    <Pressable
      accessible={false}
      focusable={false}
      onHoverIn={() => setHeld(true)}
      onHoverOut={() => setHeld(false)}
      style={{ width, paddingRight: px(40), paddingBottom: px(44) }}>
      <View aria-hidden style={[styles.offset, { left: px(40), top: px(44) }]} />
      <TiltCard rotate={-2}>
        <View style={[styles.plate, { height: px(640), padding: px(24) }]}>
          {card.slides.map((slide, i) => {
            const shown = i === index;
            const others = card.slides.filter((s) => s !== slide).map((s) => s.name.toUpperCase());
            return (
              <View
                key={slide.name}
                aria-hidden={!shown}
                style={[styles.slide, fade, { opacity: shown ? 1 : 0, padding: px(24), paddingBottom: textBottom }]}>
                <Photo
                  source={slide.photo}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                  contentPosition={{ top: `${slide.photoFocus ?? 30}%`, left: '50%' }}
                  accessibilityLabel={`Cover photo of ${slide.name}`}
                />
                <Scrim />
                <View style={{ gap: px(12) }}>
                  <Badge label={`COVER · ${slide.name.toUpperCase()}`} size={label(11)} padX={px(10)} padY={px(5)} />
                  <Serif italic size={px(34)} lh={1.05} color={color.paper}>
                    {slide.line}
                  </Serif>
                  <Mono size={label(11)} weight={600} ls={0.1} lh={1.7} color={color.paper}>
                    {`INSIDE: ${others.join(' · ')}`}
                  </Mono>
                </View>
              </View>
            );
          })}
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
          <View style={[styles.dots, { gap: px(8) }]}>
            {card.slides.map((slide, i) => (
              <Pressable
                key={slide.name}
                accessibilityRole="button"
                accessibilityLabel={`Show ${slide.name} on the cover`}
                accessibilityState={{ selected: i === index }}
                hitSlop={8}
                onPress={() => setIndex(i)}
                style={[styles.dot, { height: dot, width: i === index ? dot * 3 : dot }, i === index && styles.dotOn]}
              />
            ))}
          </View>
        </View>
      </TiltCard>
    </Pressable>
  );
}

/**
 * Shade over a cover photo so the masthead and cover lines read on any picture: dark at the top
 * behind BLNK, clear through the middle, and deepest at the bottom behind the cover lines.
 */
function Scrim() {
  return (
    <View aria-hidden style={styles.scrim}>
      <Svg width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="coverScrim" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color.ink} stopOpacity={0.55} />
            <Stop offset="0.28" stopColor={color.ink} stopOpacity={0} />
            <Stop offset="0.5" stopColor={color.ink} stopOpacity={0} />
            <Stop offset="1" stopColor={color.ink} stopOpacity={0.88} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="1" height="1" fill="url(#coverScrim)" />
      </Svg>
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
  slide: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'flex-end' },
  scrim: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  plateTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  plateMeta: { alignItems: 'flex-end', gap: 2 },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { backgroundColor: color.paper, opacity: 0.45 },
  dotOn: { backgroundColor: color.accent, opacity: 1 },
});
