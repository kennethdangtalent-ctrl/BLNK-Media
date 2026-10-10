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
  /** Letter-spacing in em, like CSS `letter-spacing: -0.02em`. */
  ls?: number;
  align?: TextStyle['textAlign'];
  /** Maximum width in CSS `ch` units of this face. */
  maxCh?: number;
  style?: StyleProp<TextStyle>;
};

/**
 * Native text views clip glyphs that rise above the first line box. Franklin Black caps need a
 * line box of about 0.9 em; web does not clip and keeps tighter values.
 */
const NATIVE_MIN_DISPLAY_LH = 0.92;

/**
 * Letraset sheets were never tracked out. Small text stays close-set so it reads as type pasted
 * onto the page, not as a tracked label; anything asked for wider is held to this.
 */
const MAX_TEXT_TRACKING = 0.04;

/** Smallest size any copy is set at; a photocopy eats anything finer. */
const MIN_COPY = 12;

const androidMetrics: TextStyle | null = Platform.OS === 'android' ? { includeFontPadding: false } : null;

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Franklin Black display caps, set tight like rub-down lettering. */
export function Display({
  size,
  color,
  lh = 0.9,
  ls = -0.035,
  align,
  level,
  upper = true,
  style,
  ...rest
}: Omit<TypeProps, 'maxCh'> & { level?: 1 | 2 | 3 | 4; upper?: boolean }) {
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
          // Big caps close up to rub-down tightness; small display caps keep a hair of air.
          letterSpacing: round2(size * Math.max(-0.04, Math.min(ls, size >= 40 ? -0.03 : -0.01))),
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

/** Running text, labels, nav and figures: Franklin Regular, or Bold at `weight={600}`. */
export function Copy({
  size = 16,
  weight = 400,
  color,
  lh = 1.5,
  ls = 0,
  align,
  maxCh,
  upper = false,
  style,
  ...rest
}: Omit<TypeProps, 'size'> & { size?: number; weight?: 400 | 600; upper?: boolean }) {
  const tone = useTone();
  const px = Math.max(MIN_COPY, size);
  return (
    <Text
      maxFontSizeMultiplier={1.25}
      {...rest}
      style={[
        {
          fontFamily: weight === 600 ? font.bold : font.text,
          fontSize: px,
          lineHeight: round2(px * lh),
          letterSpacing: round2(px * Math.min(ls, MAX_TEXT_TRACKING)),
          color: color ?? tone.fg,
          textAlign: align,
          textTransform: upper ? 'uppercase' : 'none',
          fontVariant: ['tabular-nums'],
          maxWidth: maxCh ? Math.round(maxCh * CH.copy * px) : undefined,
        },
        androidMetrics,
        style,
      ]}
    />
  );
}

/** Ledes, decks and pull lines: Franklin Regular, or its italic. Set larger than `Copy`, never tracked. */
export function Deck({ size, italic = false, color, lh = 1.25, ls = 0, align, maxCh, style, ...rest }: TypeProps & { italic?: boolean }) {
  const tone = useTone();
  return (
    <Text
      maxFontSizeMultiplier={1.25}
      {...rest}
      style={[
        {
          fontFamily: italic ? font.italic : font.text,
          fontSize: size,
          lineHeight: round2(size * lh),
          letterSpacing: round2(size * Math.min(ls, 0)),
          color: color ?? tone.fg,
          textAlign: align,
          maxWidth: maxCh ? Math.round(maxCh * CH.deck * size) : undefined,
        },
        androidMetrics,
        style,
      ]}
    />
  );
}
