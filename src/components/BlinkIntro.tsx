import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated';

import { Display, Mono } from './Type';
import { BlinkMark } from './Wordmark';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';

/** Same 1150 ms timeline as BlinkIntro.web.tsx: shut, snap open, dive into the pupil, fade to the app. */
const INTRO_MS = 1150;

const clamp = { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP };

/**
 * Native build of the opening (iOS and Android, Expo Go included). One shared progress value from
 * 0 to 1 drives every layer on the UI thread with Reanimated; the keyframes mirror the web CSS.
 * Plays on app launch and on every move to another screen. Skipped under Reduce Motion; a tap skips it.
 */
export function BlinkIntro() {
  const L = useLayout();
  const pathname = usePathname();
  // The screen whose intro has finished (or was skipped). A new pathname makes it play again.
  const [donePath, setDonePath] = useState<string | null>(null);
  const done = L.reduceMotion || donePath === pathname;
  const t = useSharedValue(0);

  useEffect(() => {
    if (done) return;
    t.value = 0;
    t.value = withTiming(1, { duration: INTRO_MS, easing: Easing.linear });
    const timer = setTimeout(() => setDonePath(pathname), INTRO_MS);
    return () => clearTimeout(timer);
  }, [done, pathname, t]);

  const screen = useAnimatedStyle(() => ({ opacity: interpolate(t.value, [0.8, 1], [1, 0], clamp) }));
  const word = useAnimatedStyle(() => ({ opacity: interpolate(t.value, [0.4, 0.52], [1, 0], clamp) }));

  if (done) return null;
  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.screen, screen]}>
      <Pressable accessibilityLabel="Skip intro" onPress={() => setDonePath(pathname)} style={styles.press}>
        <View style={styles.stack}>
          <IntroEye width={L.fl(220, 150)} t={t} />
          <Animated.View style={[styles.word, word]}>
            <Display size={L.fl(96, 64)} lh={0.8} ls={0.01} upper={false} color={color.ink}>
              BLNK
            </Display>
            <Mono size={12} weight={600} ls={0.2} color={color.ink}>
              MEDIA
            </Mono>
          </Animated.View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/** The closed and open marks stacked, plus an ink disc over the iris that does the zoom. */
function IntroEye({ width, t }: { width: number; t: SharedValue<number> }) {
  const height = (width * 22) / 64;
  // Iris centre and radius from BlinkMark's open drawing: (32, 15.5), r 6.5 in a 64 × 22 box.
  const r = (width * 6.5) / 64;
  const cx = (width * 32) / 64;
  const cy = (height * 15.5) / 22;

  const closed = useAnimatedStyle(() => ({ opacity: interpolate(t.value, [0.22, 0.23], [1, 0], clamp) }));
  const open = useAnimatedStyle(() => ({
    opacity: interpolate(t.value, [0.22, 0.23], [0, 1], clamp),
    transform: [{ scaleY: interpolate(t.value, [0.23, 0.31, 0.34], [0.2, 1.08, 1], clamp) }],
  }));
  const pupil = useAnimatedStyle(() => ({
    opacity: interpolate(t.value, [0.44, 0.45], [0, 1], clamp),
    transform: [{ scale: interpolate(t.value, [0.45, 0.58, 0.7, 0.8], [1, 3, 14, 120], clamp) }],
  }));

  return (
    <View style={{ width, height }}>
      <Animated.View style={[styles.layer, closed]}>
        <BlinkMark width={width} color={color.ink} />
      </Animated.View>
      <Animated.View style={[styles.layer, styles.openOrigin, open]}>
        <BlinkMark width={width} color={color.ink} open />
      </Animated.View>
      <Animated.View style={[styles.pupil, { left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: r }, pupil]} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: color.paper, zIndex: 100, overflow: 'hidden' },
  press: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  stack: { alignItems: 'center', gap: 32 },
  layer: { position: 'absolute', top: 0, left: 0 },
  openOrigin: { transformOrigin: '50% 70%' },
  pupil: { position: 'absolute', backgroundColor: color.ink },
  word: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
});
