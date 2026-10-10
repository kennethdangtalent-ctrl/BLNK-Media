import { View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Clipping } from '@/components/Clipping';
import { Btn } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { bizHero, services } from '@/content/business';
import { cover } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone, type ToneName } from '@/theme/tone';

type Row = { name: string; desc: string };

/** Hand-set angles and drop offsets, so each spread reads as clippings pasted up by hand. */
const TILTS = [-1.4, 1, -0.6, 1.3, -1, 0.7];
/** How far each column starts below the first, in px at desktop: the stagger of a pasted-up page. */
const COLUMN_DROP = [0, 56, 24];

/**
 * Everything BLNK does, as two magazine spreads: for brands on the paper, for creators on an
 * oxblood spread. Each service is its own taped clipping, set in staggered columns; each spread
 * ends with its next step (brands start a brief, creators apply).
 */
export function ServiceList() {
  const L = useLayout();
  const tone = useTone();
  const [forBrands, forCreators] = services.groups;
  return (
    <>
      <Band tone="stock" label="Services" padTop={L.fl(96, 56)} padBottom={L.fl(40, 24)}>
        <View style={{ gap: 14 }}>
          <Display level={1} size={fitWords(services.head.title, L.inner, L.fl(120, 56), -0.03)} lh={1} upper={false}>
            <Accented text={services.head.title} word="Services" />
          </Display>
          <Deck size={L.fl(24, 19)} lh={1.3} color={tone.mute}>
            {services.head.dek}
          </Deck>
        </View>
      </Band>
      <Spread tone="stock" title={sentence(forBrands.label)} rows={forBrands.rows} cta={bizHero.cta} padTop={L.fl(48, 32)} />
      <Spread tone="dark" title={sentence(forCreators.label)} rows={forCreators.rows} cta={cover.cta} note={services.note} />
    </>
  );
}

/** "FOR BRANDS" from the content file, set in sentence case. */
function sentence(text: string) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function Spread({
  tone,
  title,
  rows,
  cta,
  note,
  padTop,
}: {
  tone: ToneName;
  title: string;
  rows: readonly Row[];
  cta: { label: string; href: string };
  note?: string;
  padTop?: number;
}) {
  return (
    <Band tone={tone} label={title} padTop={padTop}>
      <SpreadBody title={title} rows={rows} cta={cta} note={note} />
    </Band>
  );
}

/** Inside the band, so the heading and note read the spread's tone. */
function SpreadBody({ title, rows, cta, note }: { title: string; rows: readonly Row[]; cta: { label: string; href: string }; note?: string }) {
  const L = useLayout();
  const tone = useTone();
  const cols = L.isPhone ? 1 : L.isTablet ? 2 : 3;
  const columns: Row[][] = Array.from({ length: cols }, () => []);
  rows.forEach((row, i) => columns[i % cols].push(row));
  const gap = L.fl(36, 24);
  return (
    <View style={{ gap: L.fl(48, 32) }}>
      <Display level={2} size={L.fl(72, 44)} lh={1.05} upper={false}>
        <Accented text={title} word={title.split(' ').slice(-1)[0]} />
      </Display>
      <View style={{ flexDirection: 'row', gap, alignItems: 'flex-start' }}>
        {columns.map((column, c) => (
          <View key={c} style={{ flex: 1, minWidth: 0, gap: L.fl(40, 28), paddingTop: L.isPhone ? 0 : Math.round(COLUMN_DROP[c % COLUMN_DROP.length] * L.s) }}>
            {column.map((row) => {
              const i = rows.indexOf(row);
              return (
                <Clipping key={row.name} tilt={TILTS[i % TILTS.length]} tape={i % 2 === 0 ? 'left' : 'right'} pad={L.fl(28, 20)}>
                  <ServiceText row={row} />
                </Clipping>
              );
            })}
          </View>
        ))}
      </View>
      <View style={{ gap: 16, alignItems: 'flex-start' }}>
        <Btn href={cta.href} label={cta.label} />
        {note ? (
          <Copy size={L.fl(16, 15)} color={tone.mute}>
            {note}
          </Copy>
        ) : null}
      </View>
    </View>
  );
}

/** Inside a clipping, so the tone is the white sheet's. */
function ServiceText({ row }: { row: Row }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={{ gap: 10 }}>
      <Display level={3} size={L.fl(32, 26)} lh={1.02} upper={false}>
        {row.name}
      </Display>
      <Deck size={L.fl(19, 17)} lh={1.4} color={tone.mute}>
        {row.desc}
      </Deck>
    </View>
  );
}
