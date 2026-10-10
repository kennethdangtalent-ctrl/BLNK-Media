import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useLayout } from '@/theme/layout';
import { motion } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/**
 * Web build of Reveal: each piece is pasted down, dropping from a hair above the page and settling
 * flat, as a CSS animation so the web bundle does not need Reanimated. Hidden until hydration,
 * then the keyframes start with the staggered delay.
 */
export function Reveal({ index = 0, children, style }: { index?: number; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { hydrated, reduceMotion } = useLayout();
  const delay = webStyle<ViewStyle>({ animationDelay: `${motion.revealDelayMs + index * motion.revealStepMs}ms` });
  const state = !hydrated ? styles.hidden : reduceMotion ? null : [styles.rise, delay];
  return <View style={[style, state]}>{children}</View>;
}

const styles = StyleSheet.create({
  hidden: { opacity: 0 },
  // react-native-web keyframes take CSS transform strings; RN transform arrays are dropped.
  rise: {
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scale(1.06) rotate(-1.2deg)' },
        '45%': { opacity: 1 },
        '100%': { opacity: 1, transform: 'scale(1) rotate(0deg)' },
      },
    ],
    animationDuration: `${motion.revealMs}ms`,
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'both',
  } as unknown as ViewStyle,
});
