import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Display, Deck } from './Type';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/**
 * A section's headline, pasted up big, with its deck typed beside or under it. `eyebrow` is
 * accepted from the content files but not printed: the headline names the section on its own.
 * `level={1}` when it heads the page.
 */
export function SectionHead({
  title,
  dek,
  level = 2,
  children,
}: {
  eyebrow?: string;
  title: string;
  dek?: string;
  level?: 1 | 2;
  children?: ReactNode;
}) {
  const L = useLayout();
  const tone = useTone();
  const size = fitWords(title, L.inner, L.fl(168, 64), -0.03);
  return (
    <View style={[styles.head, { gap: L.fl(24, 16) }]}>
      <View style={[styles.titleRow, { rowGap: L.fl(16, 12) }]}>
        <Display level={level} size={size} lh={0.86} style={styles.shrink}>
          {title}
        </Display>
        {dek ? (
          <Deck italic size={L.fl(26, 20)} lh={1.25} maxCh={34} color={tone.mute} style={[styles.shrink, styles.dek]}>
            {dek}
          </Deck>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  head: {},
  titleRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', columnGap: 40 },
  shrink: { flexShrink: 1 },
  dek: { paddingBottom: 6 },
});
