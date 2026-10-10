import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Eyebrow } from './Marks';
import { Display, Serif } from './Type';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/** Eyebrow, 200 px title and italic dek, as at the top of every board section. `level={1}` when it heads the page. */
export function SectionHead({
  eyebrow,
  title,
  dek,
  level = 2,
  children,
}: {
  eyebrow: string;
  title: string;
  dek?: string;
  level?: 1 | 2;
  children?: ReactNode;
}) {
  const L = useLayout();
  const tone = useTone();
  const size = fitWords(title, L.inner, L.fl(200, 84), -0.01);
  return (
    <View style={styles.head}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <View style={[styles.titleRow, { rowGap: L.fl(20, 12) }]}>
        <Display level={level} size={size} lh={0.85} ls={-0.01} style={styles.shrink}>
          {title}
        </Display>
        {dek ? (
          <Serif italic size={L.fl(32, 22)} lh={1.15} maxCh={34} color={tone.mute} style={styles.shrink}>
            {dek}
          </Serif>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  head: { gap: 20 },
  titleRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 48 },
  shrink: { flexShrink: 1 },
});
