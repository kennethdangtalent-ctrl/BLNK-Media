import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { SectionHead } from '@/components/SectionHead';
import { Display, Mono, Serif } from '@/components/Type';
import { mission } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

export function Mission() {
  const L = useLayout();
  const cols = L.isDesktop ? 4 : L.isTablet ? 2 : 1;
  const gap = L.isDesktop ? Math.round(40 * L.s) : 32;
  const colW = (L.inner - (cols - 1) * gap) / cols;
  const titleSize = Math.min(...mission.values.map((value) => fitWords(value.title, colW, L.fl(44, 34))));

  return (
    <Band tone="light" id="mission" label="Mission" ruleBottom>
      <View style={{ gap: L.fl(72, 48) }}>
        <SectionHead eyebrow={mission.head.eyebrow} title={mission.head.title} dek={mission.head.dek} />
        <Grid cols={cols} gap={gap} rowGap={L.fl(48, 36)}>
          {mission.values.map((value) => (
            <Value key={value.label} label={value.label} title={value.title} body={value.body} size={titleSize} />
          ))}
        </Grid>
        <Quote />
      </View>
    </Band>
  );
}

function Value({ label, title, body, size }: { label: string; title: string; body: string; size: number }) {
  const tone = useTone();
  return (
    <View style={styles.value}>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
        {label}
      </Mono>
      <Display level={3} size={size} lh={0.95}>
        {title}
      </Display>
      <Mono size={14} lh={1.65} color={tone.mute}>
        {body}
      </Mono>
    </View>
  );
}

function Quote() {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={[styles.quote, { paddingTop: L.fl(56, 40) }]}>
      <Serif italic size={L.fl(72, 40)} lh={1.02} ls={-0.01} maxCh={22}>
        {mission.quote}
      </Serif>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
        {mission.cite}
      </Mono>
    </View>
  );
}

const styles = StyleSheet.create({
  value: { gap: 14, borderTopWidth: 3, borderColor: color.ink, paddingTop: 20 },
  quote: { gap: 20, borderTopWidth: 1, borderColor: color.hairOnPaper },
});
