import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Mono } from './Type';
import { color } from '@/theme/tokens';

/** Section kicker: a 10 px square and a tracked label, e.g. "01 — THE ROSTER". */
export function Eyebrow({ children, square = color.accent }: { children: string; square?: string }) {
  return (
    <View style={styles.eyebrow}>
      <View style={[styles.square, { backgroundColor: square }]} />
      <Mono size={12} weight={600} ls={0.16} style={styles.shrink}>
        {children}
      </Mono>
    </View>
  );
}

/** Dashed placeholder label, e.g. "[PHOTO — NOVAPOVIE]" or "[LOGO]". */
export function Tag({
  label,
  tint,
  border,
  fill,
  size = 12,
  ls = 0.14,
  padX = 12,
  padY = 8,
  style,
}: {
  label: string;
  tint: string;
  border: string;
  fill?: string;
  size?: number;
  ls?: number;
  padX?: number;
  padY?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.tag, { borderColor: border, backgroundColor: fill, paddingHorizontal: padX, paddingVertical: padY }, style]}>
      <Mono size={size} ls={ls} color={tint}>
        {label}
      </Mono>
    </View>
  );
}

/** Accent block label, e.g. "APPLICATIONS OPEN". */
export function Badge({ label, size = 11, padX = 12, padY = 6 }: { label: string; size?: number; padX?: number; padY?: number }) {
  return (
    <View style={[styles.badge, { paddingHorizontal: padX, paddingVertical: padY }]}>
      <Mono size={size} weight={600} ls={0.16} color={color.ink}>
        {label}
      </Mono>
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  square: { width: 10, height: 10 },
  shrink: { flexShrink: 1 },
  tag: { borderWidth: 1, borderStyle: 'dashed', alignSelf: 'flex-start', maxWidth: '100%' },
  badge: { backgroundColor: color.accent, alignSelf: 'flex-start' },
});
