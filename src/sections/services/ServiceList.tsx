import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Btn } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { bizHero, services } from '@/content/business';
import { cover } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/** "FOR BRANDS" from the content file, set in sentence case. */
function sentence(text: string) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Everything BLNK does, in two columns side by side (stacked on a phone): for brands, and for the
 * creators on the roster. Each column ends with its own next step: brands start a brief, creators apply.
 */
export function ServiceList() {
  const L = useLayout();
  const tone = useTone();
  const [forBrands, forCreators] = services.groups;
  const stacked = !L.isDesktop;
  return (
    <Band tone="stock" label="Services" padTop={L.fl(96, 56)}>
      <View style={{ gap: L.fl(64, 40) }}>
        <View style={{ gap: 14 }}>
          <Display level={1} size={fitWords(services.head.title, L.inner, L.fl(120, 56), -0.03)} lh={0.9} upper={false}>
            {services.head.title}
          </Display>
          <Deck size={L.fl(24, 19)} lh={1.3} color={tone.mute}>
            {services.head.dek}
          </Deck>
        </View>
        <View style={[styles.columns, { flexDirection: stacked ? 'column' : 'row', gap: L.fl(64, 48) }]}>
          <Column title={sentence(forBrands.label)} rows={forBrands.rows} cta={{ label: bizHero.cta.label, href: bizHero.cta.href }} />
          <Column title={sentence(forCreators.label)} rows={forCreators.rows} cta={{ label: cover.cta.label, href: cover.cta.href }} />
        </View>
        <Copy size={L.fl(17, 15)} color={tone.mute}>
          {services.note}
        </Copy>
      </View>
    </Band>
  );
}

function Column({ title, rows, cta }: { title: string; rows: readonly { name: string; desc: string }[]; cta: { label: string; href: string } }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={[styles.column, { gap: L.fl(28, 20) }]}>
      <Display level={2} size={L.fl(48, 32)} lh={0.95} upper={false}>
        <Accented text={title} word={title.split(' ').slice(-1)[0]} />
      </Display>
      <View role="list">
        {rows.map((row) => (
          <View role="listitem" key={row.name} style={[styles.row, { borderColor: tone.fg }]}>
            <Copy size={L.fl(19, 17)} weight={600}>
              {row.name}
            </Copy>
            <Copy size={L.fl(16, 15)} lh={1.55} color={tone.mute}>
              {row.desc}
            </Copy>
          </View>
        ))}
      </View>
      <Btn href={cta.href} label={cta.label} />
    </View>
  );
}

const styles = StyleSheet.create({
  columns: { alignItems: 'flex-start' },
  column: { flex: 1, flexBasis: 0, minWidth: 0, alignSelf: 'stretch' },
  row: { gap: 6, borderTopWidth: 1, paddingVertical: 16 },
});
