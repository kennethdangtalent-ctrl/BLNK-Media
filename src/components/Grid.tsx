import { Children, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

/**
 * Equal-column grid (`repeat(n, minmax(0, 1fr))`). React Native has no CSS grid, so children
 * are chunked into rows and short rows are padded, which keeps every column the same width.
 * Cells stretch to the row height; a child that should fill its cell sets `flexGrow: 1`.
 */
export function Grid({
  cols,
  gap,
  rowGap = gap,
  children,
  style,
}: {
  cols: number;
  gap: number;
  rowGap?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const items = Children.toArray(children);
  const rows: ReactNode[][] = [];
  for (let i = 0; i < items.length; i += cols) rows.push(items.slice(i, i + cols));
  return (
    <View style={[{ gap: rowGap }, style]}>
      {rows.map((row, r) => (
        <View key={r} style={[styles.row, { gap }]}>
          {row.map((item, c) => (
            <View key={c} style={styles.cell}>
              {item}
            </View>
          ))}
          {Array.from({ length: cols - row.length }, (_, k) => (
            <View key={`pad-${k}`} style={styles.cell} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'stretch' },
  cell: { flex: 1, flexBasis: 0, minWidth: 0 },
});
