import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { Band } from '@/components/Band';
import { FillPhoto } from '@/components/FillPhoto';
import { Btn, ULink } from '@/components/Link';
import { Badge } from '@/components/Marks';
import { Reveal } from '@/components/Reveal';
import { Copy, Deck, Display } from '@/components/Type';
import { Wordmark } from '@/components/Wordmark';
import { cover } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/** How long each creator holds the cover. */
const SLIDE_MS = 5000;

/**
 * Each headline line is a separate strip cut and pasted down by hand: what it was cut from,
 * the ink on it, its angle, and how far it is nudged in from the left (in em of the strip type).
 * All black with white type, one crimson strip for the key word, angles kept under a degree:
 * red-on-black and black-on-red pairs vibrate, and mixed fills and steep tilts read as noise.
 */
const STRIPS: readonly { bg: string; fg: string; tilt: number; nudge: number }[] = [
  { bg: color.ink, fg: color.paper, tilt: -0.8, nudge: 0 },
  { bg: color.ink, fg: color.paper, tilt: 0.5, nudge: 0.3 },
  { bg: color.ink, fg: color.paper, tilt: -0.4, nudge: 0.1 },
  { bg: color.crimson, fg: color.paper, tilt: 0.7, nudge: 0.45 },
  { bg: color.ink, fg: color.paper, tilt: -0.6, nudge: 0.2 },
];

/** Below this width the cover stacks: the pitch first, the pile of issues under it. */
const SIDE_BY_SIDE = 900;
/** Height of the masthead row on desktop, so the cover can fill the rest of the screen. */
const MASTHEAD_H = 84;
/** Everything in the text column besides the headline: pitch scrap, the plain "what BLNK is" line, call to action and gaps. */
const FIXED_H = 360;
/** The magazine cover's proportions, width over height. */
const CARD_RATIO = 0.74;
/** How much wider and taller the fanned pile is than the issue on top. */
const PILE_X = 1.6;
const PILE_Y = 1.2;

/**
 * The Issue 001 cover. On the left the headline is pasted down in cut strips over the pitch and
 * the call to action; on the right the issues are fanned out on the table, one per creator.
 * The whole thing fits one screen under the masthead and scales with the window.
 */
export function Cover() {
  const L = useLayout();
  const screen = useWindowDimensions();
  const lines = cover.title.toUpperCase().split('\n');
  // The static HTML is rendered without a window, so it assumes a laptop screen until hydration.
  const winH = L.hydrated && screen.height > 0 ? screen.height : 900;

  const wide = L.width >= SIDE_BY_SIDE;
  const pad = wide ? Math.round(Math.min(64, winH * 0.06)) : L.fl(56, 32);
  const coverH = Math.round(Math.min(940, Math.max(620, winH - MASTHEAD_H)));
  const gap = wide ? L.fl(64, 40) : 40;

  // The fanned pile is PILE_X wider and PILE_Y taller than the top issue. Side by side it gets about
  // half the frame and as much height as the screen allows; the text takes the rest.
  const cardH = wide
    ? Math.round(Math.min((coverH - 2 * pad) / PILE_Y, ((L.inner - gap) * 0.52) / PILE_X / CARD_RATIO))
    : Math.round(Math.min(L.inner / PILE_X, 420) / CARD_RATIO);
  const cardW = Math.round(cardH * CARD_RATIO);
  const textW = wide ? L.inner - Math.round(cardW * PILE_X) - gap : L.inner;

  // The headline fits the column's width and, side by side, the screen's height. Stacked, it stops at 72 px.
  const byWidth = fitLines(cover.title, textW * 0.82, 112, -0.03);
  const byHeight = wide ? Math.floor((coverH - 2 * pad - FIXED_H) / 5.7) : 72;
  const strip = Math.max(34, Math.min(byWidth, byHeight));

  return (
    <Band tone="stock" label="Cover" padTop={pad} padBottom={pad}>
      <View style={[styles.row, wide ? { flexDirection: 'row', gap, minHeight: coverH - 2 * pad } : { gap }]}>
        <View style={[styles.copy, { width: textW, gap: wide ? 24 : 20 }]}>
          <View role="heading" aria-level={1} aria-label={cover.title.replace(/\n/g, ' ')} style={{ gap: Math.round(strip * 0.08) }}>
            {lines.map((line, i) => {
              const s = STRIPS[i % STRIPS.length];
              return (
                <Reveal key={line} index={i}>
                  <View
                    aria-hidden
                    style={[
                      styles.strip,
                      {
                        backgroundColor: s.bg,
                        marginLeft: Math.round(strip * s.nudge),
                        paddingHorizontal: Math.round(strip * 0.14),
                        paddingTop: Math.round(strip * 0.1),
                        paddingBottom: Math.round(strip * 0.02),
                        transform: [{ rotate: `${s.tilt}deg` }],
                      },
                    ]}>
                    <Display size={strip} lh={0.92} color={s.fg}>
                      {line}
                    </Display>
                  </View>
                </Reveal>
              );
            })}
          </View>
          <Reveal index={lines.length} style={[styles.scrap, { maxWidth: Math.min(440, textW), paddingHorizontal: wide ? 24 : 18, paddingVertical: wide ? 18 : 14 }]}>
            <Deck italic size={wide ? 24 : 20} lh={1.3} color={color.ink}>
              {cover.lede}
            </Deck>
            {/* Tape last, so it lies over the note's corners and onto the page. */}
            <View aria-hidden style={[styles.tape, styles.tapeLeft]} />
            <View aria-hidden style={[styles.tape, styles.tapeRight]} />
          </Reveal>
          {/* The headline is the attitude; this line is the plain answer to "what is BLNK?". */}
          <Reveal index={lines.length} style={{ maxWidth: Math.min(460, textW) }}>
            <Copy size={wide ? 17 : 16} lh={1.5} color={color.muteOnStock}>
              {cover.about}
            </Copy>
          </Reveal>
          <Reveal index={lines.length + 1} style={[styles.ctas, { columnGap: 24, rowGap: 14 }]}>
            <Btn href={cover.cta.href} label={cover.cta.label} />
            <ULink href={cover.brands.href} size={14} weight={600}>
              {cover.brands.label}
            </ULink>
          </Reveal>
        </View>
        <Reveal index={lines.length + 2} style={wide ? styles.cardSlotWide : styles.cardSlot}>
          <CoverCard width={cardW} height={cardH} />
        </Reveal>
      </View>
    </Band>
  );
}

/**
 * Where each issue lies in the pile, by depth (0 is the one on top): its offset from the pile's
 * centre as a fraction of the cover size, and its angle. Deeper issues fan out further so a strip
 * of every creator stays visible and clickable.
 */
const FAN: readonly { x: number; y: number; r: number }[] = [
  { x: 0, y: 0, r: -2 },
  { x: 0.16, y: -0.05, r: 5 },
  { x: -0.15, y: 0.04, r: -7 },
  { x: 0.27, y: 0.07, r: 9 },
  { x: -0.25, y: -0.07, r: -11 },
];

const settle = webStyle<ViewStyle>({
  transitionProperty: 'transform',
  transitionDuration: '520ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
});

/**
 * Back issues fanned on the table: one magazine per creator, the newest on top. The top cover
 * carries the BLNK nameplate (eye shut) and its cover lines (name sticker, one-liner, who else is
 * inside), which pop up one after another whenever a new issue comes to the top. Click any issue
 * sticking out of the pile to pull it out and drop it on top. The pile reshuffles every 5 seconds;
 * hovering holds it, and under reduced motion it stays put.
 */
function CoverCard({ width, height }: { width: number; height: number }) {
  const L = useLayout();
  const { card } = cover;
  const n = card.slides.length;
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  // One timer per issue, so pulling one out restarts the 5 seconds.
  useEffect(() => {
    if (held || L.reduceMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % n), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [index, held, L.reduceMotion, n]);

  const k = width / 460;
  const px = (v: number) => Math.round(v * k);
  const inset = Math.max(16, px(24));
  // The pile spreads past the top cover's edges; reserve that room so it never overlaps the text.
  const spreadX = Math.round((width * (PILE_X - 1)) / 2);
  const spreadY = Math.round((height * (PILE_Y - 1)) / 2);

  return (
    <Pressable
      accessible={false}
      focusable={false}
      onHoverIn={() => setHeld(true)}
      onHoverOut={() => setHeld(false)}
      style={{ width: width + spreadX * 2, height: height + spreadY * 2, alignItems: 'center', justifyContent: 'center' }}>
      {card.slides.map((s, i) => {
        const depth = (i - index + n) % n;
        const f = FAN[depth];
        const top = depth === 0;
        const others = card.slides.filter((o) => o !== s).map((o) => o.name.toUpperCase());
        return (
          <Pressable
            key={s.name}
            accessibilityRole="button"
            accessibilityLabel={top ? `${s.name} is on the cover` : `Pull ${s.name}'s issue to the top`}
            accessibilityState={{ selected: top }}
            disabled={top}
            onPress={() => setIndex(i)}
            style={[
              styles.issue,
              settle,
              {
                width,
                height,
                zIndex: n - depth,
                transform: [{ translateX: Math.round(f.x * width) }, { translateY: Math.round(f.y * height) }, { rotate: `${f.r}deg` }],
              },
              !top && styles.issueBack,
            ]}>
            {/* Keyed by the issue on top, so the one just pulled out swings in from the side. */}
            <View key={top ? `top-${index}` : 'back'} style={[StyleSheet.absoluteFill, top && index !== 0 ? pull : null]}>
              <FillPhoto source={s.photo} label={`Cover photo of ${s.name}`} focus={s.photoFocus ?? 30} />
              <Scrim />
              {top ? (
                <View style={[styles.plateTop, { padding: inset }]}>
                  <Wordmark size={Math.max(44, px(92))} color={color.paper} />
                  <View style={styles.plateMeta}>
                    {card.meta.map((line) => (
                      <Copy key={line} size={Math.max(12, px(13))} weight={600} upper color={color.paper} align="right" lh={1.3}>
                        {line}
                      </Copy>
                    ))}
                  </View>
                </View>
              ) : null}
              {top ? (
                <View style={[styles.lines, { left: inset, right: inset, bottom: inset, gap: Math.max(8, px(12)) }]}>
                  <View style={[pop, delay(0)]}>
                    <Badge label={`Cover · ${s.name}`} size={Math.max(12, px(14))} tilt={-2} />
                  </View>
                  <View style={[pop, delay(1)]}>
                    <Display size={Math.max(26, px(40))} lh={0.95} upper={false} color={color.paper}>
                      {s.line}
                    </Display>
                  </View>
                  <View style={[pop, delay(2)]}>
                    <Copy size={Math.max(12, px(13))} weight={600} upper lh={1.5} color={color.paper}>
                      {`Inside: ${others.join(' · ')}`}
                    </Copy>
                  </View>
                </View>
              ) : (
                <View style={[styles.spine, { left: inset, bottom: inset }]}>
                  <Copy size={13} weight={600} upper color={color.ink}>
                    {s.name}
                  </Copy>
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </Pressable>
  );
}

/**
 * Shade over the photo so the nameplate and cover lines read on any picture: dark at the top
 * behind BLNK, clear through the middle, and deepest at the bottom behind the cover lines.
 */
function Scrim() {
  return (
    <View aria-hidden style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="coverScrim" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color.ink} stopOpacity={0.55} />
            <Stop offset="0.26" stopColor={color.ink} stopOpacity={0} />
            <Stop offset="0.48" stopColor={color.ink} stopOpacity={0} />
            <Stop offset="1" stopColor={color.ink} stopOpacity={0.9} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="1" height="1" fill="url(#coverScrim)" />
      </Svg>
    </View>
  );
}
const STEP_MS = 110;

/** Each cover line pops up: rising a little and settling, one after another. Web only; native shows them in place. */
const popStyles = StyleSheet.create({
  pop: {
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'translateY(14px) scale(0.96)' },
        '60%': { opacity: 1, transform: 'translateY(-2px) scale(1.01)' },
        '100%': { opacity: 1, transform: 'translateY(0px) scale(1)' },
      },
    ],
    animationDuration: '420ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  } as unknown as ViewStyle,
  pull: {
    animationKeyframes: [
      {
        '0%': { transform: 'translateX(46%) translateY(-4%) rotate(12deg)' },
        '100%': { transform: 'translateX(0%) translateY(0%) rotate(0deg)' },
      },
    ],
    animationDuration: '480ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  } as unknown as ViewStyle,
});
const pop = Platform.OS === 'web' ? popStyles.pop : undefined;
/** The issue just pulled out of the pile swings in from the right and lands on top. */
const pull = Platform.OS === 'web' ? popStyles.pull : undefined;
const delay = (step: number) => webStyle<ViewStyle>({ animationDelay: `${120 + step * STEP_MS}ms` });

const styles = StyleSheet.create({
  row: { alignItems: 'center', justifyContent: 'space-between' },
  copy: { zIndex: 1 },
  strip: { alignSelf: 'flex-start' },
  scrap: {
    backgroundColor: color.paper,
    gap: 12,
    transform: [{ rotate: '-0.8deg' }],
    alignSelf: 'flex-start',
    boxShadow: '0px 1px 2px rgba(13, 13, 13, 0.08), 0px 8px 18px rgba(13, 13, 13, 0.1)',
  } as ViewStyle,
  tape: {
    position: 'absolute',
    top: -9,
    width: 64,
    height: 18,
    backgroundColor: color.tape,
    boxShadow: '0px 1px 2px rgba(13, 13, 13, 0.12)',
  } as ViewStyle,
  tapeLeft: { left: -16, transform: [{ rotate: '-35deg' }] },
  tapeRight: { right: -16, transform: [{ rotate: '35deg' }] },
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  cardSlot: { alignSelf: 'center', paddingTop: 8 },
  cardSlotWide: { alignSelf: 'center' },
  issue: { position: 'absolute', backgroundColor: color.ink, overflow: 'hidden', boxShadow: '0px 10px 24px rgba(13, 13, 13, 0.28)' } as ViewStyle,
  issueBack: { cursor: 'pointer' } as ViewStyle,
  spine: { position: 'absolute', backgroundColor: color.paper, paddingHorizontal: 8, paddingVertical: 4 },
  plateTop: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  plateMeta: { alignItems: 'flex-end', paddingTop: 6 },
  lines: { position: 'absolute', alignItems: 'flex-start' },
});