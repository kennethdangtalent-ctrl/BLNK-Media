import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { Copy, Deck, Display } from '@/components/Type';
import { mission } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/**
 * The mission: its title and deck, the four values in a roomy two-by-two grid (one column on a
 * phone), and the pull quote to close. Each value's name ("Belief") sits beside its line in
 * crimson, not stacked above it, so every value reads as one statement.
 */
export function Values() {
  const L = useLayout();
  const tone = useTone();
  const cols = L.isPhone ? 1 : 2;
  const gap = L.fl(64, 32);
  const colW = Math.min(L.inner, 1080);

  return (
    <Band tone="light" label="Mission">
      <View style={[styles.column, { width: colW, gap: L.fl(64, 40) }]}>
        <View style={{ gap: 14 }}>
          <Display level={2} size={fitWords(mission.head.title, colW, L.fl(112, 56), -0.03)} lh={0.9} upper={false}>
            {mission.head.title}
          </Display>
          <Deck size={L.fl(26, 20)} lh={1.3} color={tone.mute}>
            {mission.head.dek}
          </Deck>
        </View>
        <Grid cols={cols} gap={gap} rowGap={L.fl(48, 32)}>
          {mission.values.map((value) => (
            <Value key={value.label} name={value.label.replace(/^\d+\s+—\s+/, '')} title={value.title} body={value.body} />
          ))}
        </Grid>
        <Quote />
      </View>
    </Band>
  );
}

function Value({ name, title, body }: { name: string; title: string; body: string }) {
  const L = useLayout();
  const tone = useTone();
  const word = `${name.charAt(0)}${name.slice(1).toLowerCase()}`;
  return (
    <View style={[styles.value, { borderColor: tone.fg }]}>
      <Display level={3} size={L.fl(34, 26)} lh={1.15} upper={false}>
        <Accented text={`${word}. ${title}`} word={word} />
      </Display>
      <Copy size={L.fl(18, 16)} lh={1.6} color={tone.mute}>
        {body}
      </Copy>
    </View>
  );
}

function Quote() {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={[styles.quote, { paddingTop: L.fl(48, 32) }]}>
      <Deck italic size={L.fl(56, 32)} lh={1.1} align="center">
        {mission.quote}
      </Deck>
      <Copy size={14} weight={600} upper color={tone.mute} align="center">
        {mission.cite}
      </Copy>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { alignSelf: 'center' },
  value: { gap: 12, borderTopWidth: 2, paddingTop: 20 },
  quote: { gap: 14, alignItems: 'center' },
});
