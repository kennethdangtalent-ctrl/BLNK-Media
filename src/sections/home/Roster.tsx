import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { FillPhoto } from '@/components/FillPhoto';
import { Chip, ULink } from '@/components/Link';
import { PhotoSlot } from '@/components/PhotoSlot';
import { SectionHead } from '@/components/SectionHead';
import { TiltCard } from '@/components/TiltCard';
import { Copy, Deck, Display } from '@/components/Type';
import { cover, roster, rosterHead, type Creator, type Social, type Stat } from '@/content/home';
import { ISSUE } from '@/content/site';
import { useLayout, type Layout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/** Serial letters for the five roster spots in this issue: 001-A to 001-E. */
const SERIAL = ['A', 'B', 'C', 'D', 'E'] as const;
const issueNo = ISSUE.no.replace(/\D/g, '');

type Spread = { stacked: boolean; photoW: number; gap: number; textW: number };

/** Desktop and tablet set each creator as a two-page spread, photo about 45 % wide; phone stacks. */
function spreadFor(L: Layout): Spread {
  if (L.isPhone) return { stacked: true, photoW: L.inner, gap: 28, textW: L.inner };
  const gap = L.isDesktop ? Math.round(72 * L.s) : 40;
  const photoW = Math.round(L.inner * (L.isDesktop ? 0.45 : 0.42));
  return { stacked: false, photoW, gap, textW: L.inner - photoW - gap };
}

/** The full-size portrait shot for the cover, when there is one; the roster's own picture otherwise. */
function portraitFor(creator: Creator): { photo: number; focus?: number } | null {
  const shot = cover.card.slides.find((s) => s.name.toLowerCase() === creator.name.toLowerCase());
  if (shot) return { photo: shot.photo, focus: shot.photoFocus };
  if (creator.photo && creator.photoStyle !== 'print') return { photo: creator.photo, focus: creator.photoFocus };
  return null;
}

export function Roster() {
  const L = useLayout();
  const spread = spreadFor(L);
  return (
    <Band tone="dark" id="roster" label="Roster">
      <View style={{ gap: L.fl(72, 40) }}>
        <SectionHead eyebrow={rosterHead.eyebrow} title={rosterHead.title} dek={rosterHead.dek}>
          <ULink href="/business?s=clients">{rosterHead.link}</ULink>
        </SectionHead>
        <View style={{ gap: L.fl(120, 64) }}>
          {roster.map((creator, i) => (
            <Feature key={creator.n} creator={creator} serial={`${issueNo}-${SERIAL[i]}`} spread={spread} flip={i % 2 === 1} tilt={TILTS[i % TILTS.length]} />
          ))}
        </View>
      </View>
    </Band>
  );
}

/** Hand-placed angles, one per feature in order, so the pasted-up portraits read as a collage. */
const TILTS = [-1.5, 2, -2, 1.5, -1];

/** One creator set as a magazine feature: portrait on one page, the profile on the facing page. */
function Feature({ creator, serial, spread, flip, tilt }: { creator: Creator; serial: string; spread: Spread; flip: boolean; tilt: number }) {
  const L = useLayout();
  const tone = useTone();
  const portrait = portraitFor(creator);
  const photoH = spread.stacked ? Math.round(Math.min(spread.photoW * 1.2, 520)) : Math.round(spread.photoW * 1.25);
  const nameSize = fitWords(creator.name, spread.textW, L.fl(132, 60), -0.03);
  // The lede is the bio's first sentence, set bold; the rest runs on as feature copy.
  const split = creator.body.search(/[.!?](\s|$)/);
  const lede = split > 0 ? creator.body.slice(0, split + 1) : creator.body;
  const rest = split > 0 ? creator.body.slice(split + 1).trim() : '';

  return (
    <View
      role="article"
      aria-label={creator.name}
      style={[
        styles.feature,
        {
          flexDirection: spread.stacked ? 'column' : flip ? 'row-reverse' : 'row',
          gap: spread.gap,
        },
      ]}>
      {/* Rests at its pasted-up angle; hover or press picks it up off the page. */}
      <TiltCard rotate={tilt}>
        <View style={{ width: spread.photoW }}>
          <View style={[styles.portrait, { height: photoH }]}>
            {portrait ? (
              <FillPhoto source={portrait.photo} label={`Portrait of ${creator.name}`} focus={portrait.focus ?? 30} />
            ) : (
              <PhotoSlot subject={creator} height={photoH} tilt={0} />
            )}
            <View style={[styles.serial, flip ? styles.serialRight : styles.serialLeft]}>
              <Display size={L.fl(44, 32)} lh={0.95} upper={false} color={color.onHi}>
                {serial}
              </Display>
            </View>
          </View>
        </View>
      </TiltCard>

      <View style={[styles.profile, spread.stacked ? styles.profileStacked : { width: spread.textW }]}>
        <View style={[styles.runningHead, { borderColor: tone.mute }]}>
          <Copy size={13} weight={600} upper color={tone.fg}>
            {`Profile ${serial}`}
          </Copy>
          <Copy size={13} weight={600} upper color={tone.mute} style={styles.shrink}>
            {creator.kicker}
          </Copy>
        </View>

        <Display level={3} size={nameSize} lh={0.86}>
          {creator.name}
        </Display>

        <View style={styles.pull}>
          <Display aria-hidden size={L.fl(96, 64)} lh={0.7} upper={false} color={color.hi} style={styles.quoteMark}>
            “
          </Display>
          <Deck italic size={L.fl(34, 24)} lh={1.15} style={styles.shrink}>
            {creator.hook}
          </Deck>
        </View>

        <Copy size={L.fl(17, 16)} lh={1.6} maxCh={62}>
          <Copy size={L.fl(17, 16)} weight={600} lh={1.6}>
            {lede}
          </Copy>
          {rest ? ` ${rest}` : ''}
        </Copy>

        <FactBox stats={creator.stats} />

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

/** The magazine's fact box: "By the numbers", one stat per row, label and figure joined by a dotted leader. */
function FactBox({ stats }: { stats: readonly Stat[] }) {
  const tone = useTone();
  return (
    <View style={[styles.box, { borderColor: tone.fg }]}>
      <View style={[styles.boxHead, { backgroundColor: tone.fg }]}>
        <Copy size={13} weight={600} upper color={tone.bg}>
          By the numbers
        </Copy>
      </View>
      {stats.map((stat, i) => (
        <View key={stat.label} style={[styles.fact, i > 0 && { borderTopWidth: 1, borderColor: color.ruleOnInk }]}>
          <Copy size={13} weight={600} upper color={tone.mute} style={styles.shrink}>
            {stat.label}
          </Copy>
          <View aria-hidden style={[styles.leader, { borderColor: tone.mute }]} />
          <Display size={28} lh={1} upper={false}>
            {stat.value}
          </Display>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  feature: { alignItems: 'flex-start' },
  portrait: {
    overflow: 'hidden',
    backgroundColor: color.ink,
    boxShadow: '0px 14px 30px rgba(0, 0, 0, 0.45)',
  } as object,
  serial: {
    position: 'absolute',
    top: 16,
    backgroundColor: color.hi,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  serialLeft: { left: 16, transform: [{ rotate: '-3deg' }] },
  serialRight: { right: 16, transform: [{ rotate: '3deg' }] },
  profile: { gap: 22 },
  profileStacked: { alignSelf: 'stretch' },
  runningHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 4,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  pull: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  quoteMark: { marginTop: 4 },
  box: { borderWidth: 2, alignSelf: 'stretch', maxWidth: 560 },
  boxHead: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  fact: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  leader: {
    flex: 1,
    minWidth: 16,
    borderBottomWidth: 2,
    borderStyle: 'dotted',
    marginBottom: 6,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, flexShrink: 1 },
  shrink: { flexShrink: 1 },
});
