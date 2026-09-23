import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { SectionHead } from '@/components/SectionHead';
import { Display, Mono, Serif } from '@/components/Type';
import { cases, type CaseStudy } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

const CARD_BORDER = 2;

export function Cases() {
  const L = useLayout();
  const cols = L.isDesktop ? 3 : 1;
  const gap = L.isDesktop ? Math.round(32 * L.s) : 24;
  const pad = L.fl(28, 20);
  const cardInner = (L.inner - (cols - 1) * gap) / cols - 2 * (pad + CARD_BORDER);
  const titleSize = Math.min(...cases.items.map((item) => fitWords(item.title, cardInner, L.fl(48, 36))));

  return (
    <Band tone="dark" id="cases" label="Case studies">
      <View style={{ gap: L.fl(64, 40) }}>
        <SectionHead eyebrow={cases.head.eyebrow} title={cases.head.title} dek={cases.head.dek} />
        <Grid cols={cols} gap={gap}>
          {cases.items.map((item) => (
            <CaseCard key={item.label} item={item} titleSize={titleSize} pad={pad} />
          ))}
        </Grid>
      </View>
    </Band>
  );
}

function CaseCard({ item, titleSize, pad }: { item: CaseStudy; titleSize: number; pad: number }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View role="article" aria-label={item.label} style={[styles.card, { padding: pad }]}>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
        {item.label}
      </Mono>
      <Display level={3} size={titleSize} lh={0.9}>
        {item.title}
      </Display>
      <Serif italic size={L.fl(24, 20)} lh={1.2}>
        {item.objective}
      </Serif>
      <View>
        {item.rows.map(([term, value], i) => (
          <View key={term} style={[styles.row, i === item.rows.length - 1 && styles.rowLast]}>
            <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
              {term}
            </Mono>
            <Mono size={12} ls={0.08} align="right" style={styles.shrink}>
              {value}
            </Mono>
          </View>
        ))}
      </View>
      <ULink href={item.cta.href}>{item.cta.label}</ULink>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexGrow: 1, gap: 20, borderWidth: CARD_BORDER, borderColor: color.paper },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: color.hairOnInk,
  },
  rowLast: { borderBottomWidth: 1 },
  shrink: { flexShrink: 1 },
});
