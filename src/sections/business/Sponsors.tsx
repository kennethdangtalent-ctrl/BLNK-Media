import { Image, StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { Tag } from '@/components/Marks';
import { SectionHead } from '@/components/SectionHead';
import { Display, Copy } from '@/components/Type';
import { sponsors } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

const TILE_BORDER = 2;

export function Sponsors() {
  const L = useLayout();
  const cols = L.isDesktop ? 4 : 2;
  const gap = L.isDesktop ? Math.round(24 * L.s) : L.isPhone ? 12 : 24;
  const pad = L.fl(24, 14);
  const tileInner = (L.inner - (cols - 1) * gap) / cols - 2 * (pad + TILE_BORDER);
  // One name size across the wall, fitted so "UNIVERSITY" never breaks mid-word.
  const nameSize = Math.min(...sponsors.items.map((item) => fitWords(item.name, tileInner, L.fl(56, 34))));

  return (
    <Band tone="light" id="sponsors" label="Sponsors" ruleBottom>
      <View style={{ gap: L.fl(64, 40) }}>
        <SectionHead eyebrow={sponsors.head.eyebrow} title={sponsors.head.title} dek={sponsors.head.dek} />
        <Grid cols={cols} gap={gap}>
          {sponsors.items.map((item, i) => (
            <Tile key={item.name} index={i} name={item.name} logo={item.logo} size={nameSize} pad={pad} />
          ))}
        </Grid>
      </View>
    </Band>
  );
}

/** A wall tile: the number in the corner, the brand's logo centered in the open space, and the name set along the foot. */
function Tile({
  index,
  name,
  logo,
  size,
  pad,
}: {
  index: number;
  name: string;
  logo?: (typeof sponsors.items)[number]['logo'];
  size: number;
  pad: number;
}) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View role="article" aria-label={name} style={[styles.tile, { height: L.fl(320, 230), padding: pad, gap: L.fl(16, 10) }]}>
      <View style={styles.top}>
        {logo ? null : <Tag label={sponsors.logoLabel} tint={tone.fg} border={tone.fg} size={11} padX={10} padY={6} />}
        <Copy size={12} weight={600} ls={0.16} style={styles.index}>
          {String(index + 1).padStart(2, '0')}
        </Copy>
      </View>
      {logo ? (
        <View style={styles.logoArea}>
          <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel={`${name} logo`} />
        </View>
      ) : (
        <View style={styles.logoArea} />
      )}
      <Display size={size} lh={0.85}>
        {name}
      </Display>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { borderWidth: TILE_BORDER, borderColor: color.ink },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  index: { marginLeft: 'auto' },
  logoArea: { flex: 1, minHeight: 0, alignItems: 'center', justifyContent: 'center' },
  logo: { width: '82%', height: '100%', maxHeight: 120 },
});
