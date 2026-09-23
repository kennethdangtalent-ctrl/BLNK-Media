import { View } from 'react-native';

import { color as tokens } from '@/theme/tokens';

/** One 18 px cycle of the board's `repeating-linear-gradient` barcode: [start, end] of each bar. */
const CYCLE = 18;
const BARS: readonly (readonly [number, number])[] = [
  [0, 2],
  [4, 5],
  [9, 12],
  [14, 15],
];

export function Barcode({ width = 180, height = 56, color = tokens.ink }: { width?: number; height?: number; color?: string }) {
  const bars: { left: number; width: number }[] = [];
  for (let start = 0; start < width; start += CYCLE) {
    for (const [from, to] of BARS) {
      const left = start + from;
      if (left < width) bars.push({ left, width: Math.min(to - from, width - left) });
    }
  }
  return (
    <View aria-hidden style={{ width, height }}>
      {bars.map((bar) => (
        <View key={bar.left} style={{ position: 'absolute', top: 0, bottom: 0, left: bar.left, width: bar.width, backgroundColor: color }} />
      ))}
    </View>
  );
}
