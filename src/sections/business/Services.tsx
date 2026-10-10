import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { SectionHead } from '@/components/SectionHead';
import { Display, Copy, Deck } from '@/components/Type';
import { services, type Service } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Columns = { phone: boolean; numW: number; gap: number; nameSize: number };

/** What BLNK does, for brands and for the creators on the roster. No prices: every project is quoted from a brief. */
export function Services() {
  const L = useLayout();
  const numW = L.isDesktop ? Math.round(80 * L.s) : 48;
  const gap = L.isDesktop ? Math.round(32 * L.s) : 24;
  // num | 3fr | 5fr, so the name column gets 3/8 of what is left.
  const nameColW = L.isPhone ? L.inner : ((L.inner - numW - 2 * gap) * 3) / 8;
  const rows = services.groups.flatMap((group) => group.rows);
  const nameSize = Math.min(...rows.map((row) => fitWords(row.name, nameColW, L.fl(40, 30))));
  const columns: Columns = { phone: L.isPhone, numW, gap, nameSize };

  return (
    <Band tone="ink" id="services" label="Services">
      <View style={{ gap: L.fl(48, 36) }}>
        <SectionHead eyebrow={services.head.eyebrow} title={services.head.title} dek={services.head.dek} />
        <View style={styles.groups}>
          {services.groups.map((group) => (
            <ServiceGroup key={group.label} label={group.label} rows={group.rows} columns={columns} />
          ))}
        </View>
        <Deck italic size={L.fl(28, 22)} lh={1.2} maxCh={44}>
          {services.note}
        </Deck>
      </View>
    </Band>
  );
}

function ServiceGroup({ label, rows, columns }: { label: string; rows: readonly Service[]; columns: Columns }) {
  const tone = useTone();
  return (
    <View>
      <Copy size={12} weight={600} ls={0.16} color={tone.mute} style={styles.groupLabel}>
        {label}
      </Copy>
      <View role="list" style={styles.list}>
        {rows.map((row) => (columns.phone ? <PhoneRow key={row.n} row={row} columns={columns} /> : <WideRow key={row.n} row={row} columns={columns} />))}
      </View>
    </View>
  );
}

function WideRow({ row, columns }: { row: Service; columns: Columns }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View role="listitem" style={[styles.wide, { gap: columns.gap }]}>
      <Copy size={12} weight={600} ls={0.16} color={tone.mute} style={{ width: columns.numW }}>
        {row.n}
      </Copy>
      <View style={styles.nameCol}>
        <Display size={columns.nameSize} lh={0.9}>
          {row.name}
        </Display>
      </View>
      <View style={styles.descCol}>
        <Copy size={L.fl(15, 14)} lh={1.6} color={tone.mute}>
          {row.desc}
        </Copy>
      </View>
    </View>
  );
}

function PhoneRow({ row, columns }: { row: Service; columns: Columns }) {
  const tone = useTone();
  return (
    <View role="listitem" style={styles.phone}>
      <Copy size={12} weight={600} ls={0.16} color={tone.mute}>
        {row.n}
      </Copy>
      <Display size={columns.nameSize} lh={0.9}>
        {row.name}
      </Display>
      <Copy size={14} lh={1.6} color={tone.mute}>
        {row.desc}
      </Copy>
    </View>
  );
}

const styles = StyleSheet.create({
  groups: { gap: 40 },
  groupLabel: { paddingBottom: 16 },
  list: { borderTopWidth: 1, borderColor: color.ruleOnInk },
  wide: { flexDirection: 'row', alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1, borderColor: color.ruleOnInk },
  nameCol: { flex: 3, flexBasis: 0, minWidth: 0 },
  descCol: { flex: 5, flexBasis: 0, minWidth: 0 },
  phone: { gap: 10, paddingVertical: 20, borderBottomWidth: 1, borderColor: color.ruleOnInk },
});
