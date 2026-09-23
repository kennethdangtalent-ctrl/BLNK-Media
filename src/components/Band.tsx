import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useSections } from './Page';
import { useLayout } from '@/theme/layout';
import { TONES, ToneProvider, type ToneName } from '@/theme/tone';
import { BOARD_W, color } from '@/theme/tokens';

/** Centers content in the 1440 px board frame with the current gutter. */
export function Frame({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { gutter } = useLayout();
  return <View style={[styles.frame, { paddingHorizontal: gutter }, style]}>{children}</View>;
}

/**
 * A full-bleed section band. The background and 3 px rules span the viewport; the content sits
 * in the board frame. With `id`, the band is an in-page scroll target (`#id` on web).
 */
export function Band({
  tone,
  id,
  children,
  ruleTop = false,
  ruleBottom = false,
  padTop,
  padBottom,
  role,
  label,
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
}) {
  const L = useLayout();
  const sections = useSections();
  const top = padTop ?? L.fl(112, 72);
  const bottom = padBottom ?? top;
  return (
    <ToneProvider tone={tone}>
      <View
        nativeID={id}
        role={role ?? (label ? 'region' : undefined)}
        aria-label={label}
        onLayout={id ? (event) => sections?.register(id, event.nativeEvent.layout.y) : undefined}
        style={[
          { backgroundColor: TONES[tone].bg, borderColor: color.ink },
          ruleTop && styles.ruleTop,
          ruleBottom && styles.ruleBottom,
        ]}>
        <Frame style={{ paddingTop: top, paddingBottom: bottom }}>{children}</Frame>
      </View>
    </ToneProvider>
  );
}

const styles = StyleSheet.create({
  frame: { width: '100%', maxWidth: BOARD_W, alignSelf: 'center' },
  ruleTop: { borderTopWidth: 3 },
  ruleBottom: { borderBottomWidth: 3 },
});
