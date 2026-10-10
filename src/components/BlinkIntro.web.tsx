import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Copy, Display } from './Type';
import { BlinkMark } from './Wordmark';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/**
 * One timeline for every layer, 1800 ms long:
 *   0–14 %   the eye is shut (the logo's lashes)
 *   14–22 %  it snaps open, lid lifting
 *   26–36 %  the iris glances left and holds
 *   44–54 %  it glances right and holds
 *   62–68 %  it comes back to centre
 *   70–90 %  the pupil grows until it fills the screen (you fall into the eye)
 *   90–100 % the black screen fades to reveal the page
 */
const INTRO_MS = 1800;

/**
 * The opening: the logo's eye opens, looks left, looks right, then the view dives into the pupil
 * and comes out on the page. Plays on every page load and every move to another page (keyed by
 * pathname, so a `?s=` scroll on the same page does not replay it). Skipped under reduced motion;
 * a tap skips it.
 */
export function BlinkIntro() {
  const L = useLayout();
  const pathname = usePathname();
  // The page whose intro has finished (or was skipped). A new pathname makes it play again.
  const [donePath, setDonePath] = useState<string | null>(null);
  const show = L.hydrated && !L.reduceMotion && donePath !== pathname;

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setDonePath(pathname), INTRO_MS);
    return () => clearTimeout(timer);
  }, [show, pathname]);

  if (!show) return null;
  return (
    // Keyed by page, so the CSS animations restart from the first frame on each navigation.
    <Pressable key={pathname} accessibilityLabel="Skip intro" onPress={() => setDonePath(pathname)} style={[styles.screen, fixedFill, motion.screen]}>
      <View style={styles.stack}>
        <IntroEye width={L.fl(240, 160)} />
        <View style={[styles.word, motion.word]}>
          <Display size={L.fl(96, 64)} lh={0.82} upper={false} color={color.ink}>
            BLNK
          </Display>
          <Copy size={14} weight={600} upper color={color.ink}>
            Media
          </Copy>
        </View>
      </View>
    </Pressable>
  );
}

/**
 * The logo's eye at intro size. The closed and open lids are stacked in one box; the iris is drawn
 * on its own so it can look around under the lid, and a plain ink disc laid exactly over it is
 * what zooms, so the dive is a clean circle growing out of the pupil.
 */
function IntroEye({ width }: { width: number }) {
  const height = (width * 22) / 64;
  // Iris centre and radius from BlinkMark's open drawing: (32, 15.5), r 6.5 in a 64 × 22 box.
  const r = (width * 6.5) / 64;
  const cx = (width * 32) / 64;
  const cy = (height * 15.5) / 22;
  const look = Math.round(r * 1.1);
  const disc = { left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: r };
  return (
    <View style={{ width, height }}>
      <View style={[styles.layer, motion.closed]}>
        <BlinkMark width={width} color={color.crimson} />
      </View>
      <View style={[styles.layer, motion.open]}>
        <BlinkMark width={width} color={color.crimson} open iris={false} />
      </View>
      <View style={[styles.iris, disc, motion.irisShow]}>
        <View style={[StyleSheet.absoluteFill, glance(look)]}>
          <View style={[styles.irisFill, { borderRadius: r }]} />
          {/* The sparkle, as in the logo: a bright glint up and to the right, a dot down and to the left. */}
          <View style={[styles.glint, { width: r * 0.55, height: r * 0.55, borderRadius: r, left: r * 1.15, top: r * 0.35 }]} />
          <View style={[styles.glint, { width: r * 0.3, height: r * 0.3, borderRadius: r, left: r * 0.45, top: r * 1.25 }]} />
        </View>
      </View>
      <View style={[styles.pupil, disc, motion.pupil]} />
    </View>
  );
}

const fixedFill = webStyle<ViewStyle>({ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100 });

const run = { animationDuration: `${INTRO_MS}ms`, animationTimingFunction: 'linear', animationFillMode: 'both' };

/**
 * The iris's look left and right, `px` either side of centre. Eased between holds so it reads as
 * a glance rather than a slide. Registered per distance so react-native-web injects the keyframes.
 */
const glances = new Map<number, ViewStyle>();
function glance(px: number): ViewStyle {
  if (!glances.has(px)) {
    glances.set(
      px,
      StyleSheet.create({
        g: {
          ...run,
          animationTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
          animationKeyframes: [
            {
              '0%': { transform: 'translateX(0px)' },
              '26%': { transform: 'translateX(0px)' },
              '33%': { transform: `translateX(${-px}px)` },
              '44%': { transform: `translateX(${-px}px)` },
              '52%': { transform: `translateX(${px}px)` },
              '62%': { transform: `translateX(${px}px)` },
              '68%': { transform: 'translateX(0px)' },
              '100%': { transform: 'translateX(0px)' },
            },
          ],
        } as unknown as ViewStyle,
      }).g,
    );
  }
  return glances.get(px) as ViewStyle;
}

// react-native-web only injects @keyframes for styles registered with StyleSheet.create (see
// Marquee.web.tsx); inline keyframe objects are dropped. Transforms are CSS strings.
const motion = StyleSheet.create({
  closed: {
    ...run,
    animationKeyframes: [{ '0%': { opacity: 1 }, '13%': { opacity: 1 }, '14%': { opacity: 0 }, '100%': { opacity: 0 } }],
  } as unknown as ViewStyle,
  open: {
    ...run,
    transformOrigin: '50% 70%',
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scaleY(0.2)' },
        '13%': { opacity: 0, transform: 'scaleY(0.2)' },
        '14%': { opacity: 1, transform: 'scaleY(0.2)' },
        '19%': { opacity: 1, transform: 'scaleY(1.08)' },
        '22%': { opacity: 1, transform: 'scaleY(1)' },
        '100%': { opacity: 1, transform: 'scaleY(1)' },
      },
    ],
  } as unknown as ViewStyle,
  // The iris appears as the lid lifts, popping up from nothing.
  irisShow: {
    ...run,
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scale(0.3)' },
        '14%': { opacity: 0, transform: 'scale(0.3)' },
        '20%': { opacity: 1, transform: 'scale(1.08)' },
        '23%': { opacity: 1, transform: 'scale(1)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
    ],
  } as unknown as ViewStyle,
  // Hidden until the dive, then grows from the iris's size to well past the screen, accelerating.
  pupil: {
    ...run,
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scale(1)' },
        '69%': { opacity: 0, transform: 'scale(1)' },
        '70%': { opacity: 1, transform: 'scale(1)' },
        '78%': { opacity: 1, transform: 'scale(3)' },
        '84%': { opacity: 1, transform: 'scale(16)' },
        '90%': { opacity: 1, transform: 'scale(140)' },
        '100%': { opacity: 1, transform: 'scale(140)' },
      },
    ],
  } as unknown as ViewStyle,
  word: {
    ...run,
    animationKeyframes: [{ '0%': { opacity: 1 }, '68%': { opacity: 1 }, '76%': { opacity: 0 }, '100%': { opacity: 0 } }],
  } as unknown as ViewStyle,
  screen: {
    ...run,
    animationKeyframes: [{ '0%': { opacity: 1 }, '90%': { opacity: 1 }, '100%': { opacity: 0 } }],
  } as unknown as ViewStyle,
});

const styles = StyleSheet.create({
  screen: { backgroundColor: color.stock, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' } as ViewStyle,
  stack: { alignItems: 'center', gap: 28 },
  layer: { position: 'absolute', top: 0, left: 0 },
  iris: { position: 'absolute' },
  irisFill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: color.crimson },
  glint: { position: 'absolute', backgroundColor: color.paper },
  pupil: { position: 'absolute', backgroundColor: color.ink },
  word: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
});
