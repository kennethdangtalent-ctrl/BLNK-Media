import { Image as Photo } from 'expo-image';
import { Image, StyleSheet, View } from 'react-native';

import { Barcode } from './Barcode';
import { Display, Copy, Deck } from './Type';
import type { CaseStudy } from '@/content/business';
import { ToneProvider, type ToneName } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * Cover colors in case order, from the site palette, so the rack reads as three different issues:
 * a red cover, a white one with a red masthead, and a black one with a red masthead.
 * `fg` is the type, `mast` the BLNK masthead.
 */
const COVERS: readonly { bg: string; fg: string; mast: string; tone: ToneName }[] = [
  { bg: color.crimson, fg: color.paper, mast: color.paper, tone: 'crimson' },
  { bg: color.paper, fg: color.ink, mast: color.crimson, tone: 'paper' },
  { bg: color.ink, fg: color.paper, mast: color.crimson, tone: 'ink' },
];

/** The case's brand colors when it has them, otherwise the BLNK cover for its place in the rack. */
export function coverFor(item: CaseStudy, index: number): { bg: string; fg: string; mast: string; tone: ToneName } {
  const b = item.brandColors;
  if (b) return { bg: b.bg, fg: b.fg, mast: b.accent, tone: b.dark ? 'ink' : 'paper' };
  return COVERS[index % COVERS.length];
}

/**
 * A case study as a BLNK magazine cover: masthead and issue line, the cover shot, a "cover story"
 * kicker, the brand as the headline, the creator as the cover line, and a barcode. Sized by the caller:
 * `brandSize` is shared across a row so covers read as a set.
 */
export function CaseCover({ item, index, brandSize, pad, minHeight }: { item: CaseStudy; index: number; brandSize: number; pad: number; minHeight: number }) {
  const cover = coverFor(item, index);
  const mast = Math.max(40, Math.round(brandSize * 0.8));
  return (
    <ToneProvider tone={cover.tone}>
      <View style={[styles.cover, { backgroundColor: cover.bg, padding: pad, minHeight }]}>
        <View style={[styles.masthead, { borderColor: cover.fg }]}>
          <Display size={mast} lh={0.8} ls={0.01} upper={false} color={cover.mast}>
            BLNK
          </Display>
          <View style={styles.issue}>
            {[item.label, 'RESULTS SOON', 'BLNK.NAME'].map((line) => (
              <Copy key={line} size={9} weight={600} ls={0.16} align="right" color={cover.fg}>
                {line}
              </Copy>
            ))}
          </View>
        </View>
        <CoverImage item={item} edge={cover.fg} />
        <View style={styles.story}>
          <Copy size={10} weight={600} ls={0.2} color={cover.fg}>
            COVER STORY
          </Copy>
          <Display size={brandSize} lh={0.85} ls={-0.01} color={cover.fg}>
            {item.brand}
          </Display>
          <View style={styles.foot}>
            <Deck italic size={Math.max(22, Math.round(brandSize * 0.4))} lh={1} color={cover.fg} style={styles.shrink}>
              × {item.creator}
            </Deck>
            <Barcode width={54} height={26} color={cover.fg} />
          </View>
        </View>
      </View>
    </ToneProvider>
  );
}

/**
 * The cover shot. A photo fills a framed panel; a sticker sits on the cover color, tilted,
 * over a hard accent shadow cut to its outline (the same treatment as the roster).
 */
function CoverImage({ item, edge }: { item: CaseStudy; edge: string }) {
  const image = item.coverImage;
  if (!image) return <View style={styles.imageArea} />;
  if (image.style === 'photo') {
    return (
      <View style={[styles.imageArea, styles.photoFrame, { borderColor: edge }]}>
        <Photo
          source={image.source}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition={{ top: `${image.focus ?? 30}%`, left: '50%' }}
          accessibilityLabel={`Photo of ${item.creator}`}
        />
      </View>
    );
  }
  return (
    <View style={[styles.imageArea, styles.stickerArea]}>
      <View style={styles.sticker}>
        <Image aria-hidden source={image.source} tintColor={color.ink} resizeMode="contain" style={[styles.fill, styles.stickerShadow]} />
        <Image source={image.source} resizeMode="contain" accessibilityLabel={`${item.creator} sticker`} style={[styles.fill, styles.stickerTilt]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: { justifyContent: 'space-between', gap: 18 },
  imageArea: { flexGrow: 1, minHeight: 150 },
  photoFrame: { borderWidth: 2, borderColor: color.ink, overflow: 'hidden', backgroundColor: color.plate },
  stickerArea: { alignItems: 'center', justifyContent: 'center' },
  sticker: { width: '78%', aspectRatio: 1, maxHeight: 220 },
  fill: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  stickerShadow: { transform: [{ translateX: 7 }, { translateY: 7 }, { rotate: '-6deg' }] },
  stickerTilt: { transform: [{ rotate: '-6deg' }] },
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderColor: color.ink,
  },
  issue: { gap: 2, paddingTop: 4 },
  story: { gap: 10 },
  foot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  shrink: { flexShrink: 1 },
});
