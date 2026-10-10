import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Copy, Deck, Display } from '@/components/Type';
import { thesis, type ThesisLine } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/** Widest the essay column gets, so lines stay a comfortable read. */
export const READING_W = 720;

/**
 * The page's opening, set like a magazine essay: one centred reading column with the title, the
 * lead as a calm statement, then the argument at a comfortable size. The two pull lines are the
 * only large type inside it, in sentence case under a short crimson rule.
 */
export function Thesis() {
  const L = useLayout();
  const colW = Math.min(L.inner, READING_W);
  const lead = thesis.lines.find((line) => line.kind === 'lead');
  const rest = thesis.lines.filter((line) => line.kind !== 'lead');

  return (
    <Band tone="light" label="Thesis">
      <View style={[styles.column, { width: colW, gap: L.fl(40, 28) }]}>
        <Display level={1} size={fitWords(thesis.title, colW, L.fl(112, 56), -0.03)} lh={0.9} upper={false}>
          {thesis.title}
        </Display>
        {lead ? (
          <Deck size={L.fl(32, 24)} lh={1.3}>
            {lead.text}
          </Deck>
        ) : null}
        {rest.map((line) => (
          <Line key={line.text} line={line} />
        ))}
      </View>
    </Band>
  );
}

function Line({ line }: { line: ThesisLine }) {
  const L = useLayout();
  const tone = useTone();
  if (line.kind === 'pull') {
    return (
      <View style={[styles.pull, { paddingTop: L.fl(24, 16) }]}>
        <View aria-hidden style={styles.rule} />
        <Display size={L.fl(44, 30)} lh={1.05} upper={false}>
          {line.text}
        </Display>
      </View>
    );
  }
  return (
    <Copy size={L.fl(20, 17)} lh={1.65} color={tone.fg}>
      {line.text}
    </Copy>
  );
}

const styles = StyleSheet.create({
  column: { alignSelf: 'center' },
  pull: { gap: 16 },
  rule: { width: 48, height: 4, backgroundColor: color.crimson },
});
