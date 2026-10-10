import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { Crumple } from './Crumple';
import { useSections } from './Page';
import { Tear } from './Tear';
import { useLayout } from '@/theme/layout';
import { TONES, ToneProvider, type ToneName } from '@/theme/tone';
import { BOARD_W, color } from '@/theme/tokens';

/** Centers content in the 1440 px board frame with the current gutter. */
export function Frame({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { gutter } = useLayout();
  return <View style={[styles.frame, { paddingHorizontal: gutter }, style]}>{children}</View>;
}

/**
 * A full-bleed sheet. Its ground spans the viewport, its top edge is torn (the tear is the only
 * divider; `ruleTop` and `ruleBottom` are accepted from older call sites and ignored), and the
 * content sits in the board frame. With `id`, the band is an in-page scroll target.
 * `seed` varies the tear so stacked sheets never repeat the same rip. Light sheets (the paper tone and
 * white) are crumpled; the black and oxblood ones print flat.
 */
export function Band({
  tone,
  id,
  children,
  padTop,
  padBottom,
  role,
  label,
  seed,
}: {
  tone: ToneName;
  id?: string;
  children: ReactNode;
  ruleTop?: boolean;
  ruleBottom?: boolean;
  padTop?: number;
  padBottom?: number;
  role?: ViewProps['role'];
  label?: string;
  seed?: number;
}) {
  const L = useLayout();
  const sections = useSections();
  const top = padTop ?? L.fl(112, 72);
  const bottom = padBottom ?? top;
  const bg = TONES[tone].bg;
  const light = bg === color.stock || bg === color.paper;
  return (
    <ToneProvider tone={tone}>
      <View
        nativeID={id}
        role={role ?? (label ? 'region' : undefined)}
        aria-label={label}
        onLayout={id ? (event) => sections?.register(id, event.nativeEvent.layout.y) : undefined}
        style={[
          { backgroundColor: TONES[tone].bg },
        ]}>
        {light ? <Crumple /> : null}
        <Tear fill={TONES[tone].bg} seed={seed ?? (id ? id.length * 31 + id.charCodeAt(0) : label ? label.length * 17 + 3 : 7)} />
        <Frame style={{ paddingTop: top, paddingBottom: bottom }}>{children}</Frame>
      </View>
    </ToneProvider>
  );
}

const styles = StyleSheet.create({
  frame: { width: '100%', maxWidth: BOARD_W, alignSelf: 'center' },
});
