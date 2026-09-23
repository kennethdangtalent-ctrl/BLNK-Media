import { Image as Photo } from 'expo-image';
import { Image, StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { DotGrid } from '@/components/DotGrid';
import { Chip, ULink } from '@/components/Link';
import { Tag } from '@/components/Marks';
import { SectionHead } from '@/components/SectionHead';
import { TiltCard } from '@/components/TiltCard';
import { Display, Mono, Serif } from '@/components/Type';
import { roster, rosterHead, type Creator, type Social, type Stat } from '@/content/home';
import { useLayout, type Layout } from '@/theme/layout';
import { fitLines, fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Columns = { stacked: boolean; photoW: number; gap: number; textW: number };

/** Desktop keeps the board's 480 | 1fr split; tablet gives the photo 38%; phone stacks. */
function columnsFor(L: Layout): Columns {
  if (L.isDesktop) {
    const photoW = Math.round(480 * L.s);
    const gap = Math.round(64 * L.s);
    return { stacked: false, photoW, gap, textW: L.inner - photoW - gap };
  }
  if (L.isTablet) {
    const photoW = Math.round(L.inner * 0.38);
    return { stacked: false, photoW, gap: 40, textW: L.inner - photoW - 40 };
  }
  return { stacked: true, photoW: L.inner, gap: 32, textW: L.inner };
}

export function Roster() {
  const L = useLayout();
  const columns = columnsFor(L);
  const statGap = L.fl(24, 12);
  const statColW = (columns.textW - 2 * statGap) / 3;
  // One figure size across every card, so the stat rows line up down the page.
  const statSize = Math.min(L.fl(48, 30), ...roster.flatMap((c) => c.stats.map((stat) => fitLines(stat.value, statColW, 48))));

  return (
    <Band tone="dark" id="roster" label="Roster">
      <View style={{ gap: L.fl(64, 40) }}>
        <SectionHead eyebrow={rosterHead.eyebrow} title={rosterHead.title} dek={rosterHead.dek}>
          <ULink href="/business">{rosterHead.link}</ULink>
        </SectionHead>
        <View style={{ gap: L.fl(48, 40) }}>
          {roster.map((creator, i) => (
            <RosterCard
              key={creator.n}
              creator={creator}
              columns={columns}
              statSize={statSize}
              statGap={statGap}
              tilt={TILTS[i % TILTS.length]}
            />
          ))}
        </View>
      </View>
    </Band>
  );
}

function RosterCard({
  creator,
  columns,
  statSize,
  statGap,
  tilt,
}: {
  creator: Creator;
  columns: Columns;
  statSize: number;
  statGap: number;
  tilt: number;
}) {
  const L = useLayout();
  const tone = useTone();
  const numeral = L.fl(140, 88);
  const photoH = Math.round((columns.photoW * 2) / 3);

  return (
    <View
      role="article"
      aria-label={creator.name}
      style={[
        styles.card,
        { flexDirection: columns.stacked ? 'column' : 'row', gap: columns.gap, paddingTop: L.fl(40, 32) },
      ]}>
      <View style={{ width: columns.photoW, paddingTop: 24 }}>
        <Display
          aria-hidden
          size={numeral}
          lh={0.8}
          upper={false}
          color={color.accent}
          style={[styles.numeral, { top: -Math.round(numeral * 0.23) }]}>
          {creator.n}
        </Display>
        <PhotoSlot creator={creator} height={photoH} tilt={tilt} />
      </View>

      <View style={[styles.body, columns.stacked ? styles.bodyStacked : styles.bodyBeside]}>
        <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
          {creator.kicker}
        </Mono>
        <Display level={3} size={fitWords(creator.name, columns.textW, L.fl(80, 52), -0.005)} lh={0.88} ls={-0.005}>
          {creator.name}
        </Display>
        <Serif italic size={L.fl(28, 21)} lh={1.15}>
          {creator.hook}
        </Serif>
        <Mono size={L.fl(15, 14)} lh={1.65} color={tone.mute} maxCh={60}>
          {creator.body}
        </Mono>
        <Stats stats={creator.stats} size={statSize} gap={statGap} />
        <View style={styles.links}>
          <View style={styles.chips}>
            {creator.socials.map((social) => (
              <Chip
                key={social.label}
                label={social.label}
                href={social.href}
                icon={social.icon}
                placeholder={!social.href}
                dashed={social.dashed}
                a11yLabel={socialLabel(creator.name, social)}
              />
            ))}
          </View>
          <ULink href="/business">{rosterHead.partnerships}</ULink>
        </View>
      </View>
    </View>
  );
}

function socialLabel(name: string, social: Social) {
  if (!social.platform) return undefined;
  return social.followers ? `${name} on ${social.platform}, ${social.followers} followers` : `${name} on ${social.platform}`;
}

/** Hand-placed angles, one per card in order, so the pasted-up pictures read as a collage. */
const TILTS = [4, -5, 3, -4, 5];

/** Hard accent shadow under a tilted print or sticker: 7 px down and right, at the same angle. */
const shadowAt = (tilt: number) => ({ transform: [{ translateX: 7 }, { translateY: 7 }, { rotate: `${tilt}deg` }] });

/**
 * The creator's picture. A full-size photo fills the slot, cropped toward `photoFocus` so
 * selfies keep their faces. A small photo is mounted as a print, and a logo as a die-cut
 * sticker, on the halftone plate. Otherwise the board's dashed placeholder stays.
 */
function PhotoSlot({ creator, height, tilt }: { creator: Creator; height: number; tilt: number }) {
  if (creator.photo && creator.photoStyle !== 'print') {
    return (
      <View style={[styles.photo, { height }]}>
        <Photo
          source={creator.photo}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition={{ top: `${creator.photoFocus ?? 30}%`, left: '50%' }}
          accessibilityLabel={`Photo of ${creator.name}`}
        />
      </View>
    );
  }
  return (
    <View style={[styles.photo, { height }]}>
      <DotGrid color={color.dotOnPlate} />
      {creator.photo ? (
        <Print source={creator.photo} width={Math.round(height * 0.66)} tilt={tilt} name={creator.name} />
      ) : creator.logo ? (
        <Sticker source={creator.logo} size={Math.round(height * 0.74)} tilt={tilt} label={`${creator.name} logo`} />
      ) : (
        <Tag label={creator.photoLabel} tint={color.paper} border={color.dashOnInk} fill={color.tagOnPlate} style={styles.tagBottom} />
      )}
    </View>
  );
}

/** A square photo mounted like an instant print: paper border, a deeper foot with the handle, and an accent block shadow. */
function Print({ source, width, tilt, name }: { source: number; width: number; tilt: number; name: string }) {
  const edge = Math.max(5, Math.round(width * 0.035));
  const foot = Math.round(width * 0.15);
  const image = width - 2 * edge;
  const height = edge + image + foot;
  return (
    <View style={styles.stickerLayer}>
      <View style={{ width, height }}>
        <View aria-hidden style={[styles.printShadow, { width, height }, shadowAt(tilt)]} />
        <TiltCard rotate={tilt}>
          <View style={[styles.print, { width, height, paddingTop: edge, paddingHorizontal: edge }]}>
            <Photo source={source} style={{ width: image, height: image }} contentFit="cover" accessibilityLabel={`Photo of ${name}`} />
            <View style={[styles.printFoot, { height: foot }]}>
              <Mono size={Math.max(9, Math.round(width * 0.048))} weight={600} ls={0.16} upper color={color.ink} numberOfLines={1}>
                {name}
              </Mono>
            </View>
          </View>
        </TiltCard>
      </View>
    </View>
  );
}

/** A die-cut logo stuck on at an angle over a hard accent shadow cut to its outline. Hover or press lifts it. */
function Sticker({ source, size, tilt, label }: { source: number; size: number; tilt: number; label: string }) {
  return (
    <View style={styles.stickerLayer}>
      <View style={{ width: size, height: size }}>
        <Image
          aria-hidden
          source={source}
          tintColor={color.accent}
          resizeMode="contain"
          style={[styles.stickerShadow, { width: size, height: size }, shadowAt(tilt)]}
        />
        <TiltCard rotate={tilt}>
          <Image source={source} resizeMode="contain" accessibilityLabel={label} style={{ width: size, height: size }} />
        </TiltCard>
      </View>
    </View>
  );
}

function Stats({ stats, size, gap }: { stats: readonly Stat[]; size: number; gap: number }) {
  const tone = useTone();
  return (
    <View style={[styles.stats, { gap }]}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.stat}>
          <Display size={size} lh={0.9} upper={false} style={styles.tabular}>
            {stat.value}
          </Display>
          <Mono size={11} weight={600} ls={0.14} color={tone.mute}>
            {stat.label}
          </Mono>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'flex-start', borderTopWidth: 1, borderColor: color.hairOnInk },
  numeral: { position: 'absolute', left: -8, zIndex: 2 },
  photo: {
    borderWidth: 2,
    borderColor: color.paper,
    backgroundColor: color.plate,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    overflow: 'hidden',
  },
  tagBottom: { alignSelf: 'flex-end' },
  stickerLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'box-none',
  },
  stickerShadow: { position: 'absolute', top: 0, left: 0 },
  printShadow: { position: 'absolute', top: 0, left: 0, backgroundColor: color.accent },
  print: { backgroundColor: color.paper },
  printFoot: { alignItems: 'center', justifyContent: 'center' },
  body: { gap: 16 },
  bodyBeside: { flex: 1, minWidth: 0 },
  bodyStacked: { alignSelf: 'stretch' },
  stats: { flexDirection: 'row', paddingTop: 20, borderTopWidth: 1, borderColor: color.hairOnInk },
  stat: { flex: 1, flexBasis: 0, minWidth: 0, gap: 6 },
  tabular: { fontVariant: ['tabular-nums'] },
  links: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, flexShrink: 1 },
});
