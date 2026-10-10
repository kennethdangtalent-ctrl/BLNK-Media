import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ToneProvider } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * A white paper clipping taped onto the page at a slight angle, on a soft shadow: the site's way of
 * pasting a block of content down, as with the pitch note on the cover. `tape` puts masking tape
 * over both top corners (default) or one. Content inside reads as black on white whatever the
 * section's ground.
 */
export function Clipping({
  children,
  tilt = 0,
  tape = 'both',
  pad = 22,
  style,
}: {
  children: ReactNode;
  tilt?: number;
  tape?: 'both' | 'left' | 'right' | 'none';
  pad?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <ToneProvider tone="paper">
      <View style={[styles.sheet, { padding: pad, transform: [{ rotate: `${tilt}deg` }] }, style]}>
        {children}
        {tape === 'both' || tape === 'left' ? <View aria-hidden style={[styles.tape, styles.tapeLeft]} /> : null}
        {tape === 'both' || tape === 'right' ? <View aria-hidden style={[styles.tape, styles.tapeRight]} /> : null}
      </View>
    </ToneProvider>
  );
}

/**
 * A die-cut sticker: a white rounded backing with the logo on it, slapped on at an angle with a
 * soft shadow. Sized by the caller.
 */
export function Sticker({ children, tilt = 0, size }: { children: ReactNode; tilt?: number; size: number }) {
  return (
    <View style={[styles.sticker, { width: size, height: size, borderRadius: Math.round(size * 0.18), transform: [{ rotate: `${tilt}deg` }] }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: color.paper,
    boxShadow: '0px 1px 2px rgba(13, 13, 13, 0.08), 0px 10px 22px rgba(13, 13, 13, 0.14)',
  } as ViewStyle,
  tape: {
    position: 'absolute',
    top: -9,
    width: 64,
    height: 18,
    backgroundColor: color.tape,
    boxShadow: '0px 1px 2px rgba(13, 13, 13, 0.12)',
  } as ViewStyle,
  tapeLeft: { left: -16, transform: [{ rotate: '-35deg' }] },
  tapeRight: { right: -16, transform: [{ rotate: '35deg' }] },
  sticker: {
    backgroundColor: color.paper,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 3,
    borderColor: color.paper,
    boxShadow: '0px 2px 3px rgba(13, 13, 13, 0.12), 0px 10px 20px rgba(13, 13, 13, 0.16)',
  } as ViewStyle,
});
