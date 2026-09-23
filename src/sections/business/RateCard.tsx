import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { SectionHead } from '@/components/SectionHead';
import { Display, Mono, Serif } from '@/components/Type';
import { rates, type Rate } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Columns = { phone: boolean; numW: number; rateW: number; gap: number; nameSize: number };

export function RateCard() {
  const L = useLayout();
  const numW = L.isDesktop ? Math.round(80 * L.s) : 48;
  const rateW = L.isDesktop ? Math.round(200 * L.s) : 120;
  const gap = L.isDesktop ? Math.round(32 * L.s) : 24;
  // Board grid: 80px | 3fr | 5fr | 200px, so the name column gets 3/8 of what is left.
  const nameColW = L.isPhone ? L.inner : ((L.inner - numW - rateW - 3 * gap) * 3) / 8;
  const rows = rates.groups.flatMap((group) => group.rows);
  const nameSize = Math.min(...rows.map((row) => fitWords(row.name, nameColW, L.fl(40, 30))));
  const columns: Columns = { phone: L.isPhone, numW, rateW, gap, nameSize };

  return (
    <Band tone="dark" id="rates" label="Rate card">
      <View style={{ gap: L.fl(48, 36) }}>
        <SectionHead eyebrow={rates.head.eyebrow} title={rates.head.title} dek={rates.head.dek} />
        <View style={styles.groups}>
          {rates.groups.map((group) => (
            <RateGroup key={group.label} label={group.label} rows={group.rows} columns={columns} />
          ))}
        </View>
      </View>
    </Band>
  );
}

function RateGroup({ label, rows, columns }: { label: string; rows: readonly Rate[]; columns: Columns }) {
  const tone = useTone();
  return (
    <View>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute} style={styles.groupLabel}>
        {label}
      </Mono>
      <View role="list" style={styles.list}>
        {rows.map((row) => (columns.phone ? <PhoneRow key={row.n} row={row} columns={columns} /> : <WideRow key={row.n} row={row} columns={columns} />))}
      </View>
    </View>
  );
}

function WideRow({ row, columns }: { row: Rate; columns: Columns }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View role="listitem" style={[styles.wide, { gap: columns.gap }]}>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute} style={{ width: columns.numW }}>
        {row.n}
      </Mono>
      <View style={styles.nameCol}>
        <Display size={columns.nameSize} lh={0.9}>
          {row.name}
        </Display>
      </View>
      <View style={styles.descCol}>
        <Mono size={L.fl(15, 14)} lh={1.6} color={tone.mute}>
          {row.desc}
        </Mono>
      </View>
      <Serif size={L.fl(28, 22)} lh={1} align="right" style={{ width: columns.rateW }}>
        {row.rate}
      </Serif>
    </View>
  );
}

function PhoneRow({ row, columns }: { row: Rate; columns: Columns }) {
  const tone = useTone();
  return (
    <View role="listitem" style={styles.phone}>
      <View style={styles.phoneTop}>
        <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
          {row.n}
        </Mono>
        <Serif size={22} lh={1}>
          {row.rate}
        </Serif>
      </View>
      <Display size={columns.nameSize} lh={0.9}>
        {row.name}
      </Display>
      <Mono size={14} lh={1.6} color={tone.mute}>
        {row.desc}
      </Mono>
    </View>
  );
}

const styles = StyleSheet.create({
  groups: { gap: 40 },
  groupLabel: { paddingBottom: 16 },
  list: { borderTopWidth: 1, borderColor: color.hairOnInk },
  wide: { flexDirection: 'row', alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1, borderColor: color.hairOnInk },
  nameCol: { flex: 3, flexBasis: 0, minWidth: 0 },
  descCol: { flex: 5, flexBasis: 0, minWidth: 0 },
  phone: { gap: 10, paddingVertical: 20, borderBottomWidth: 1, borderColor: color.hairOnInk },
  phoneTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
});
