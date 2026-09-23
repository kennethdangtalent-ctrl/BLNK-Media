import { Platform, Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { CH } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { font } from '@/theme/tokens';
import { webProps } from '@/theme/web';

type TypeProps = Omit<TextProps, 'style'> & {
  size: number;
  color?: string;
  /** Line height as a ratio of `size`, like CSS `line-height: 0.88`. */
  lh?: number;
  /** Letter-spacing in em, like CSS `letter-spacing: 0.16em`. */
  ls?: number;
  align?: TextStyle['textAlign'];
  /** Maximum width in CSS `ch` units of this face. */
  maxCh?: number;
  style?: StyleProp<TextStyle>;
};

/**
 * Native text views clip glyphs that rise above the first line box. Big Shoulders caps sit
 * 0.184 em below the top of a 1.197 em content box, so they clip once the line box drops
 * under 0.829 em. Web does not clip and keeps the board's exact values.
 */
const NATIVE_MIN_DISPLAY_LH = 0.84;

const androidMetrics: TextStyle | null = Platform.OS === 'android' ? { includeFontPadding: false } : null;

const round2 = (n: number) => Math.round(n * 100) / 100;

export function Display({
  size,
  color,
  lh = 0.88,
  ls = 0,
  align,
  level,
  upper = true,
  style,
  ...rest
}: Omit<TypeProps, 'maxCh'> & { level?: 1 | 2 | 3; upper?: boolean }) {
  const tone = useTone();
  const ratio = Platform.OS === 'web' ? lh : Math.max(lh, NATIVE_MIN_DISPLAY_LH);
  return (
    <Text
      role={level ? 'heading' : undefined}
      {...webProps(level ? { 'aria-level': level } : {})}
      maxFontSizeMultiplier={1}
      {...rest}
      style={[
        {
          fontFamily: font.display,
          fontSize: size,
          lineHeight: round2(size * ratio),
          letterSpacing: round2(size * ls),
          color: color ?? tone.fg,
          textTransform: upper ? 'uppercase' : 'none',
          textAlign: align,
        },
        androidMetrics,
        style,
      ]}
    />
  );
}

export function Mono({
  size = 15,
  weight = 400,
  color,
  lh = 1.6,
  ls = 0,
  align,
  maxCh,
  upper = false,
  style,
  ...rest
}: Omit<TypeProps, 'size'> & { size?: number; weight?: 400 | 600; upper?: boolean }) {
  const tone = useTone();
  return (
    <Text
      maxFontSizeMultiplier={1.25}
      {...rest}
      style={[
        {
          fontFamily: weight === 600 ? font.monoSemi : font.mono,
          fontSize: size,
          lineHeight: round2(size * lh),
          letterSpacing: round2(size * ls),
          color: color ?? tone.fg,
          textAlign: align,
          textTransform: upper ? 'uppercase' : 'none',
          maxWidth: maxCh ? Math.round(maxCh * CH.mono * size) : undefined,
        },
        androidMetrics,
        style,
      ]}
    />
  );
}

export function Serif({ size, italic = false, color, lh = 1.2, ls = 0, align, maxCh, style, ...rest }: TypeProps & { italic?: boolean }) {
  const tone = useTone();
  return (
    <Text
      maxFontSizeMultiplier={1.25}
      {...rest}
      style={[
        {
          fontFamily: italic ? font.serifItalic : font.serif,
          fontSize: size,
          lineHeight: round2(size * lh),
          letterSpacing: round2(size * ls),
          color: color ?? tone.fg,
          textAlign: align,
          maxWidth: maxCh ? Math.round(maxCh * CH.serif * size) : undefined,
        },
        androidMetrics,
        style,
      ]}
    />
  );
}
