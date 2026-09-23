import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { useLayout } from '@/theme/layout';
import { motion } from '@/theme/tokens';

/**
 * Web build of TiltCard: the same pick-up on hover or press, as a CSS transition on transform,
 * so the web bundle does not need Reanimated. Static under reduced motion.
 */
export function TiltCard({ rotate, children }: { rotate: number; children: ReactNode }) {
  const { reduceMotion } = useLayout();
  const [lifted, setLifted] = useState(false);
  const up = lifted && !reduceMotion;
  // Same function list in both states so the browser interpolates each one.
  const transform: ViewStyle['transform'] = up
    ? [{ translateX: -4 }, { translateY: -4 }, { rotate: '0deg' }]
    : [{ translateX: 0 }, { translateY: 0 }, { rotate: `${rotate}deg` }];

  return (
    <Pressable
      accessible={false}
      focusable={false}
      onHoverIn={() => setLifted(true)}
      onHoverOut={() => setLifted(false)}
      onPressIn={() => setLifted(true)}
      onPressOut={() => setLifted(false)}
      style={styles.cursor}>
      <View style={[styles.card, { transform }]}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cursor: { cursor: 'auto' },
  card: {
    transitionProperty: 'transform',
    transitionDuration: `${motion.tiltMs}ms`,
    transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  } as unknown as ViewStyle,
});
