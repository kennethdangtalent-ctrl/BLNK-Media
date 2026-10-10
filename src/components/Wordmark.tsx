import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Display } from './Type';
import { displayWidth } from '@/theme/metrics';
import { color as tokens } from '@/theme/tokens';
import { webProps } from '@/theme/web';

/**
 * The blink, drawn in a 64 × 22 box. Closed (the default): the lid and three lashes. Open: the
 * same lid and lashes lifted, over a big round iris with a star sparkle (doe eyes), in the same box
 * and line style so the two swap in place.
 * Decorative; the wordmark carries the name.
 */
export function BlinkMark({ width, color = tokens.accent, open = false }: { width: number; color?: string; open?: boolean }) {
  return (
    <Svg
      width={width}
      height={(width * 22) / 64}
      viewBox="0 0 64 22"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...webProps({ 'aria-hidden': true })}>
      {open ? (
        <>
          {/* Same lid and lashes as the closed eye, flipped up; a big round iris with a star sparkle. */}
          <Path d="M3 17 Q32 1 61 17" strokeWidth={5} />
          <Path d="M14 12 L10 5 M32 9 L32 3 M50 12 L54 5" strokeWidth={4} />
          <Circle cx={32} cy={15.5} r={6.5} fill={color} stroke="none" />
          <Path d="M34.6 10.4 L35.3 12.2 L37.1 12.9 L35.3 13.6 L34.6 15.4 L33.9 13.6 L32.1 12.9 L33.9 12.2 Z" fill={tokens.paper} stroke="none" />
          <Circle cx={29.6} cy={18} r={1} fill={tokens.paper} stroke="none" />
        </>
      ) : (
        <>
          <Path d="M3 4 Q32 26 61 4" strokeWidth={5} />
          <Path d="M14 13 L9 20 M32 17 L32 21 M50 13 L55 20" strokeWidth={4} />
        </>
      )}
    </Svg>
  );
}

/**
 * The BLNK logo: the wordmark with the blink mark centred over it. The logo reserves room for
 * the mark at its top, so it never spills out of its container (the masthead sits at the very
 * top of the page), and the letters keep their own baseline for anything aligned beside them.
 */
export function Wordmark({
  size,
  color,
  markColor,
  open = false,
}: {
  size: number;
  color: string;
  markColor?: string;
  /** Open the eye, e.g. while the logo is hovered or pressed. On web it opens with a quick lift of the lid. */
  open?: boolean;
}) {
  const wordW = displayWidth('BLNK', size, 0.01);
  const markW = Math.round(wordW * 0.6);
  const markH = (markW * 22) / 64;
  const gap = Math.round(size * 0.06);
  return (
    <View style={{ paddingTop: Math.ceil(markH + gap) }}>
      <View
        style={[
          { position: 'absolute', left: (wordW - markW) / 2, top: 0, pointerEvents: 'none' },
          open && Platform.OS === 'web' ? motionStyles.opening : null,
        ]}>
        <BlinkMark width={markW} color={markColor} open={open} />
      </View>
      <Display size={size} lh={size >= 80 ? 0.8 : 1} ls={0.01} upper={false} color={color}>
        BLNK
      </Display>
    </View>
  );
}

/** The lid lifting open. Registered with StyleSheet.create so react-native-web injects the @keyframes. */
const motionStyles = StyleSheet.create({
  opening: {
    transformOrigin: '50% 50%',
    animationKeyframes: [{ '0%': { transform: 'scaleY(0.1)' }, '70%': { transform: 'scaleY(1.08)' }, '100%': { transform: 'scaleY(1)' } }],
    animationDuration: '220ms',
    animationTimingFunction: 'ease-out',
  } as unknown as ViewStyle,
});
