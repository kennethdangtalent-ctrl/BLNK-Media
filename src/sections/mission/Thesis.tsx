import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { SectionHead } from '@/components/SectionHead';
import { Display, Mono, Serif } from '@/components/Type';
import { thesis, type ThesisLine } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * The page's opening: the thesis title, the lead sentence set as a large italic statement,
 * then the argument. Everything starts on the frame's left edge like every other band; on
 * desktop the argument is held to two-thirds of the frame so the pull lines stay a column.
 */
export function Thesis() {
  const L = useLayout();
  const colW = L.isDesktop ? Math.round((L.inner * 2) / 3) : L.inner;
  const lead = thesis.lines.find((line) => line.kind === 'lead');
  const rest = thesis.lines.filter((line) => line.kind !== 'lead');
  // One size for both pull lines, so they read as a pair.
  const pullSize = Math.min(
    ...rest.filter((line) => line.kind === 'pull').map((line) => fitWords(line.text, colW, L.fl(72, 44), -0.005)),
  );

  return (
    <Band tone="light" label="Thesis">
      <View style={{ gap: L.fl(72, 48) }}>
        <SectionHead level={1} eyebrow={thesis.eyebrow} title={thesis.title} />
        {lead ? (
          <Serif italic size={L.fl(64, 34)} lh={1.05} ls={-0.01} maxCh={30}>
            {lead.text}
          </Serif>
        ) : null}
        <View style={[styles.argument, { maxWidth: colW, gap: L.fl(40, 28) }]}>
          {rest.map((line) => (
            <Line key={line.text} line={line} pullSize={pullSize} />
          ))}
        </View>
      </View>
    </Band>
  );
}

function Line({ line, pullSize }: { line: ThesisLine; pullSize: number }) {
  const L = useLayout();
  const tone = useTone();
  if (line.kind === 'pull') {
    return (
      <View style={styles.pull}>
        <Display size={pullSize} lh={0.9} ls={-0.005}>
          {line.text}
        </Display>
      </View>
    );
  }
  return (
    <Mono size={L.fl(17, 15)} lh={1.7} color={tone.mute} maxCh={64}>
      {line.text}
    </Mono>
  );
}

const styles = StyleSheet.create({
  argument: { borderTopWidth: 3, borderColor: color.ink, paddingTop: 32 },
  pull: { borderLeftWidth: 6, borderColor: color.accent, paddingLeft: 20 },
});
