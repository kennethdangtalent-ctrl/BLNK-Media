import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Copy } from './Type';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * A rubber stamp pressed onto the page at an angle: an inked frame around bold caps, e.g.
 * "RESULTS SOON". It annotates something already on the page; it never heads a section.
 */
export function Stamp({ label, tilt = -4, tint, style }: { label: string; tilt?: number; tint?: string; style?: StyleProp<ViewStyle> }) {
  const tone = useTone();
  const ink = tint ?? tone.fg;
  return (
    <View style={[styles.stamp, { borderColor: ink, transform: [{ rotate: `${tilt}deg` }] }, style]}>
      <Copy size={13} weight={600} upper lh={1.1} color={ink}>
        {label}
      </Copy>
    </View>
  );
}

/**
 * A strip of masking tape with a typed label, used for placeholders such as "[PHOTO — NOVAPOVIE]"
 * or "[LOGO]". The `tint`, `border` and `fill` props are accepted for older call sites; tape is
 * always tape-colored with toner text.
 */
export function Tag({
  label,
  size = 12,
  padX = 12,
  padY = 6,
  tilt = -2,
  style,
}: {
  label: string;
  tint?: string;
  border?: string;
  fill?: string;
  size?: number;
  ls?: number;
  padX?: number;
  padY?: number;
  tilt?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.tape, { paddingHorizontal: padX, paddingVertical: padY, transform: [{ rotate: `${tilt}deg` }] }, style]}>
      <Copy size={size} weight={600} upper color={color.ink}>
        {label}
      </Copy>
    </View>
  );
}

/** A press-red sticker slapped on at an angle, e.g. "APPLICATIONS OPEN". */
export function Badge({ label, size = 13, padX = 12, padY = 6, tilt = 3 }: { label: string; size?: number; padX?: number; padY?: number; tilt?: number }) {
  return (
    <View style={[styles.sticker, { paddingHorizontal: padX, paddingVertical: padY, transform: [{ rotate: `${tilt}deg` }] }]}>
      <Copy size={size} weight={600} upper lh={1.1} color={color.onHi}>
        {label}
      </Copy>
    </View>
  );
}

const styles = StyleSheet.create({
  stamp: { borderWidth: 2.5, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', opacity: 0.9 },
  tape: { backgroundColor: color.tape, alignSelf: 'flex-start', maxWidth: '100%' },
  sticker: { backgroundColor: color.hi, alignSelf: 'flex-start' },
});
