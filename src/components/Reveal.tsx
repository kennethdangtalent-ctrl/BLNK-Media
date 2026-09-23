import { useEffect, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { useLayout } from '@/theme/layout';
import { motion } from '@/theme/tokens';

/**
 * Page-load stagger: fades and lifts 18 px, `index` steps of 90 ms apart. It starts only after
 * hydration so the server markup and the first client render match, and it is skipped when
 * Reduce Motion is on.
 */
export function Reveal({ index = 0, children, style }: { index?: number; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { hydrated, reduceMotion } = useLayout();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!hydrated) return;
    if (reduceMotion) {
      progress.value = 1;
      return;
    }
    progress.value = withDelay(
      motion.revealDelayMs + index * motion.revealStepMs,
      withTiming(1, { duration: motion.revealMs, easing: Easing.out(Easing.cubic) }),
    );
  }, [hydrated, reduceMotion, index, progress]);

  const reveal = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 18 }],
  }));

  return <Animated.View style={[style, reveal]}>{children}</Animated.View>;
}
