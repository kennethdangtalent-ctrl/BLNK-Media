import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Mono } from '@/components/Type';
import { marquee } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { color, motion } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/** A deliberate underestimate of one copy's width (about 1246 px), so a half always covers the screen. */
const MIN_COPY_W = 1200;

/**
 * Web build of the ticker: two identical halves on a max-content track, slid by -50% with CSS
 * keyframes like the board's `.mq` rule. No Reanimated on web; the compositor runs it.
 */
export function Marquee() {
  const L = useLayout();
  const perHalf = Math.max(1, Math.ceil(L.width / MIN_COPY_W));
  const animate = L.hydrated && !L.reduceMotion;
  // The board moves one copy per 48 s; a half holds `perHalf` copies.
  const duration = webStyle<ViewStyle>({ animationDuration: `${(motion.marqueeMs * perHalf) / 1000}s` });

  return (
    <View aria-hidden style={styles.band}>
      <View style={[styles.track, animate && styles.slide, animate && duration]}>
        {Array.from({ length: perHalf * 2 }, (_, i) => (
          <View key={i} style={styles.copy}>
            <Mono size={14} weight={600} ls={0.2} color={color.paper} numberOfLines={1}>
              {marquee}
            </Mono>
          </View>
        ))}
      </View>
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
  track: { flexDirection: 'row', width: 'max-content' } as unknown as ViewStyle,
  copy: { paddingHorizontal: 24, flexShrink: 0 },
  // react-native-web keyframes take CSS transform strings; RN transform arrays are dropped.
  slide: {
    animationKeyframes: [{ '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  } as unknown as ViewStyle,
});
