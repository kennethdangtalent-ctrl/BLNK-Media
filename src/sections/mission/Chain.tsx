import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Eyebrow } from '@/components/Marks';
import { Display, Mono, Serif } from '@/components/Type';
import { chain } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

const index = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Creator talent → Media → Brand partnerships → Technology → Capital. Desktop reads it as
 * one row of five steps under accent rules; tablet and phone as a numbered list.
 */
export function Chain() {
  const L = useLayout();
  return (
    <Band tone="dark" label="The long game">
      <View style={{ gap: L.fl(56, 36) }}>
        <View style={styles.head}>
          <Eyebrow>{chain.eyebrow}</Eyebrow>
          <Serif italic size={L.fl(56, 34)} lh={1.05}>
            {chain.intro}
          </Serif>
        </View>
        <Steps />
      </View>
    </Band>
  );
}

/** Inside the band, so `useTone()` reads the dark tone. */
function Steps() {
  const L = useLayout();
  const tone = useTone();
  const gap = Math.round(24 * L.s);
  const colW = (L.inner - (chain.steps.length - 1) * gap) / chain.steps.length;
  const rowSize = Math.min(...chain.steps.map((step) => fitWords(step, colW, L.fl(56, 40))));
  const listSize = Math.min(...chain.steps.map((step) => fitWords(step, L.inner - 64, L.fl(96, 44))));

  if (L.isDesktop) {
    return (
      <View role="list" style={[styles.row, { gap }]}>
        {chain.steps.map((step, i) => (
          <View role="listitem" key={step} style={styles.cell}>
            <View style={styles.cellTop}>
              <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
                {index(i)}
              </Mono>
              {i < chain.steps.length - 1 ? (
                <Mono aria-hidden size={18} weight={600} color={color.accent}>
                  →
                </Mono>
              ) : null}
            </View>
            <Display size={rowSize} lh={0.9}>
              {step}
            </Display>
          </View>
        ))}
      </View>
    );
  }
  return (
    <View role="list">
      {chain.steps.map((step, i) => (
        <View role="listitem" key={step} style={[styles.item, { borderColor: tone.hair }]}>
          <Mono size={12} weight={600} ls={0.16} color={color.accent} style={styles.itemIndex}>
            {index(i)}
          </Mono>
          <Display size={listSize} lh={0.9} style={styles.shrink}>
            {step}
          </Display>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  head: { gap: 20 },
  row: { flexDirection: 'row', alignItems: 'stretch' },
  cell: { flex: 1, flexBasis: 0, minWidth: 0, gap: 16, borderTopWidth: 3, borderColor: color.accent, paddingTop: 16 },
  cellTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  item: { flexDirection: 'row', alignItems: 'baseline', gap: 20, borderTopWidth: 1, paddingVertical: 18 },
  itemIndex: { width: 24 },
  shrink: { flexShrink: 1 },
});
