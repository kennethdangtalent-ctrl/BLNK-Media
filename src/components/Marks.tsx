import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Copy } from './Type';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * A rubber stamp pressed onto the page at an angle: an inked frame around bold caps, e.g.
 * "RESULTS SOON". It annotates something already on the page; it never heads a section.
 */
export function Stamp({
  label,
  tilt = -4,
  tint,
  pop = false,
  style,
}: {
  label: string;
  tilt?: number;
  tint?: string;
  /** Web only: slam the stamp down once the intro has played, then pulse a soft red glow. */
  pop?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const tone = useTone();
  const ink = tint ?? tone.fg;
  return (
    <View style={[{ transform: [{ rotate: `${tilt}deg` }] }, styles.stampSlot, style]}>
      <View style={[styles.stamp, { borderColor: ink }, pop && Platform.OS === 'web' ? motion.pop : null]}>
        <Copy size={13} weight={600} upper lh={1.1} color={ink}>
          {label}
        </Copy>
      </View>
    </View>
  );
}

/**
 * The stamp's entrance and glow, as CSS animations (react-native-web only injects keyframes
 * registered through StyleSheet.create). The slam waits for the 1.8 s intro; the glow then breathes
 * every 2.4 s.
 */
const motion = StyleSheet.create({
  pop: {
    animationKeyframes: [
      {
        '0%': { opacity: 0, transform: 'scale(1.9) rotate(-10deg)' },
        '55%': { opacity: 1, transform: 'scale(0.92) rotate(1deg)' },
        '75%': { transform: 'scale(1.05) rotate(0deg)' },
        '100%': { opacity: 1, transform: 'scale(1) rotate(0deg)' },
      },
      {
        '0%': { boxShadow: '0px 0px 0px 0px rgba(193, 0, 31, 0)' },
        '50%': { boxShadow: '0px 0px 14px 3px rgba(193, 0, 31, 0.45)' },
        '100%': { boxShadow: '0px 0px 0px 0px rgba(193, 0, 31, 0)' },
      },
    ],
    animationDuration: '520ms, 2400ms',
    animationDelay: '1900ms, 2500ms',
    animationTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1.2), ease-in-out',
    animationIterationCount: '1, infinite',
    animationFillMode: 'both, none',
  } as unknown as ViewStyle,
});

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
  stampSlot: { alignSelf: 'flex-start' },
  stamp: { borderWidth: 2.5, paddingHorizontal: 10, paddingVertical: 5, opacity: 0.92 },
  tape: { backgroundColor: color.tape, alignSelf: 'flex-start', maxWidth: '100%' },
  sticker: { backgroundColor: color.hi, alignSelf: 'flex-start' },
});
