import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useLayout } from '@/theme/layout';
import { motion } from '@/theme/tokens';

/**
 * A card laid at an angle on the page, like the board's cover and media kit. Hover or a press
 * picks it up: it squares to 0° and lifts 4 px off its offset block. Static under Reduce Motion.
 */
export function TiltCard({ rotate, children }: { rotate: number; children: ReactNode }) {
  const { reduceMotion } = useLayout();
  const lift = useSharedValue(0);

  const tilt = useAnimatedStyle(() => ({
    transform: [
      { translateX: -4 * lift.value },
      { translateY: -4 * lift.value },
      { rotate: `${rotate * (1 - lift.value)}deg` },
    ],
  }));

  const to = (target: number) => {
    if (reduceMotion) return;
    lift.value = withTiming(target, { duration: motion.tiltMs, easing: Easing.out(Easing.cubic) });
  };

  return (
    <Pressable
      accessible={false}
      focusable={false}
      unstable_pressDelay={100}
      onHoverIn={() => to(1)}
      onHoverOut={() => to(0)}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      style={styles.cursor}>
      <Animated.View style={tilt}>{children}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cursor: { cursor: 'auto' },
});
