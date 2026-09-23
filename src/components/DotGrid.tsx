import { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';

import { webProps } from '@/theme/web';

/**
 * The board's halftone: `radial-gradient(circle, c 1px, transparent 1.7px)` tiled at 8 px.
 * Fills its positioned parent. Pattern ids are global in the DOM, so each instance gets its own.
 */
export function DotGrid({ color, cell = 8, radius = 1.35 }: { color: string; cell?: number; radius?: number }) {
  const id = `dots-${useId().replace(/[^A-Za-z0-9_-]/g, '')}`;
  return (
    <Svg style={styles.fill} width="100%" height="100%" {...webProps({ 'aria-hidden': true })}>
      <Defs>
        <Pattern id={id} patternUnits="userSpaceOnUse" x="0" y="0" width={cell} height={cell}>
          <Circle cx={cell / 2} cy={cell / 2} r={radius} fill={color} />
        </Pattern>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none' },
});
