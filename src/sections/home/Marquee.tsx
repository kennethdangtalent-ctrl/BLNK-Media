import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { Mono } from '@/components/Type';
import { marquee } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { color, motion } from '@/theme/tokens';

/** 107 characters of 14 px Plex Mono at 0.2 em tracking (11.2 px each) plus 48 px padding, rounded up. */
const ESTIMATED_COPY_W = 1300;

/**
 * "INSIDE THIS ISSUE ★ …" ticker. Enough copies are laid end to end to cover any screen, and
 * the track slides one copy width per 48 s on the UI thread, so the loop is seamless.
 * Decorative: every name in it appears in the roster.
 */
export function Marquee() {
  const L = useLayout();
  const [copyW, setCopyW] = useState(0);
  const x = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(x);
    x.value = 0;
    if (!L.hydrated || L.reduceMotion || copyW <= 0) return;
    x.value = withRepeat(withTiming(-copyW, { duration: motion.marqueeMs, easing: Easing.linear }), -1, false);
    return () => cancelAnimation(x);
  }, [L.hydrated, L.reduceMotion, copyW, x]);

  const slide = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const copies = copyW > 0 ? Math.max(2, Math.ceil(L.width / copyW) + 1) : 3;
  // The track must be wider than its copies, or text inside it wraps before it can be measured.
  const trackW = copies * (copyW > 0 ? copyW : ESTIMATED_COPY_W) + 200;

  return (
    <View aria-hidden style={styles.band}>
      <Animated.View style={[styles.track, { width: trackW }, slide]}>
        {Array.from({ length: copies }, (_, i) => (
          <View
            key={i}
            style={styles.copy}
            onLayout={i === 0 ? (event) => setCopyW(Math.round(event.nativeEvent.layout.width)) : undefined}>
            <Mono size={14} weight={600} ls={0.2} color={color.paper} numberOfLines={1}>
              {marquee}
            </Mono>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    height: 59,
    borderBottomWidth: 3,
    borderColor: color.ink,
    backgroundColor: color.ink,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  track: { flexDirection: 'row' },
  copy: { paddingHorizontal: 24, flexShrink: 0 },
});
