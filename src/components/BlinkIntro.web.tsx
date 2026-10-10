import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Display, Mono } from './Type';
import { BlinkMark } from './Wordmark';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/**
 * One timeline for every layer, 1150 ms long:
 *   0–23 %   the eye is shut (the logo's lashes)
 *   23–34 %  it snaps open, lid lifting
 *   45–80 %  the pupil grows until it fills the screen (you fall into the eye)
 *   80–100 % the black screen fades to reveal the page
 */
const INTRO_MS = 1150;

/**
 * The opening: the logo's eye opens, then the view dives into the pupil and comes out on the
 * page. Plays on every page load and every move to another page (keyed by pathname, so a
 * `?s=` scroll on the same page does not replay it). Skipped under reduced motion; a tap skips it.
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
    <Pressable
      key={pathname}
      accessibilityLabel="Skip intro"
      onPress={() => setDonePath(pathname)}
      style={[styles.screen, fixedFill, motion.screen]}>
      <View style={styles.stack}>
        <IntroEye width={L.fl(220, 150)} />
        <View style={[styles.word, motion.word]}>
          <Display size={L.fl(96, 64)} lh={0.8} ls={0.01} upper={false} color={color.ink}>
            BLNK
          </Display>
          <Mono size={12} weight={600} ls={0.2} color={color.ink}>
            MEDIA
          </Mono>
        </View>
      </View>
    </Pressable>
  );
}

/**
 * The logo's eye at intro size: the closed and open marks stacked in one box, plus a plain ink
 * disc laid exactly over the iris. The disc is what zooms, so the dive is a clean circle growing
 * out of the pupil rather than the whole drawing (lashes, sparkle) blowing up.
 */
function IntroEye({ width }: { width: number }) {
  const height = (width * 22) / 64;
  // Iris centre and radius from BlinkMark's open drawing: (32, 15.5), r 6.5 in a 64 × 22 box.
  const r = (width * 6.5) / 64;
  const cx = (width * 32) / 64;
  const cy = (height * 15.5) / 22;
  return (
    <View style={{ width, height }}>
      <View style={[styles.layer, motion.closed]}>
        <BlinkMark width={width} color={color.ink} />
      </View>
      <View style={[styles.layer, motion.open]}>
        <BlinkMark width={width} color={color.ink} open />
      </View>
      <View style={[styles.pupil, { left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: r }, motion.pupil]} />
    </View>
  );
}

const fixedFill = webStyle<ViewStyle>({ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100 });

const run = { animationDuration: `${INTRO_MS}ms`, animationTimingFunction: 'linear', animationFillMode: 'both' };

// react-native-web only injects @keyframes for styles registered with StyleSheet.create (see
// Marquee.web.tsx); inline keyframe objects are dropped. Transforms are CSS strings.
const motion = StyleSheet.create({
  closed: {
    ...run,
    animationKeyframes: [{ '0%': { opacity: 1 }, '22%': { opacity: 1 }, '23%': { opacity: 0 }, '100%': { opacity: 0 } }],
  } as unknown as ViewStyle,
  open: {
    ...run,
    transformOrigin: '50% 70%',
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scaleY(0.2)' },
        '22%': { opacity: 0, transform: 'scaleY(0.2)' },
        '23%': { opacity: 1, transform: 'scaleY(0.2)' },
        '31%': { opacity: 1, transform: 'scaleY(1.08)' },
        '34%': { opacity: 1, transform: 'scaleY(1)' },
        '100%': { opacity: 1, transform: 'scaleY(1)' },
      },
    ],
  } as unknown as ViewStyle,
  // Hidden until the dive, then grows from the iris's size to well past the screen, accelerating.
  pupil: {
    ...run,
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scale(1)' },
        '44%': { opacity: 0, transform: 'scale(1)' },
        '45%': { opacity: 1, transform: 'scale(1)' },
        '58%': { opacity: 1, transform: 'scale(3)' },
        '70%': { opacity: 1, transform: 'scale(14)' },
        '80%': { opacity: 1, transform: 'scale(120)' },
        '100%': { opacity: 1, transform: 'scale(120)' },
      },
    ],
  } as unknown as ViewStyle,
  word: {
    ...run,
    animationKeyframes: [{ '0%': { opacity: 1 }, '40%': { opacity: 1 }, '52%': { opacity: 0 }, '100%': { opacity: 0 } }],
  } as unknown as ViewStyle,
  screen: {
    ...run,
    animationKeyframes: [{ '0%': { opacity: 1 }, '80%': { opacity: 1 }, '100%': { opacity: 0 } }],
  } as unknown as ViewStyle,
});

const styles = StyleSheet.create({
  screen: { backgroundColor: color.paper, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' },
  stack: { alignItems: 'center', gap: 32 },
  layer: { position: 'absolute', top: 0, left: 0 },
  pupil: { position: 'absolute', backgroundColor: color.ink },
  word: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
});
