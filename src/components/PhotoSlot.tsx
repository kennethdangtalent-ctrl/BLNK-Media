import { Image as Photo } from 'expo-image';
import { Image, StyleSheet, View } from 'react-native';

import { DotGrid } from './DotGrid';
import { Tag } from './Marks';
import { TiltCard } from './TiltCard';
import { Mono } from './Type';
import { color } from '@/theme/tokens';

/** Anyone pictured in a photo slot: a roster creator or the founder. */
export type PhotoSubject = {
  name: string;
  photoLabel: string;
  /** `photo: require('../../assets/creators/novapovie.jpg')`. */
  photo?: number;
  /**
   * `'fill'` (default) fills the slot and needs a full-size original.
   * `'print'` mounts the photo as a small square instant print, which suits small or square images.
   */
  photoStyle?: 'fill' | 'print';
  /** Vertical crop point for a filled `photo`, in percent from the top. Selfies read best around 25. Default 30. */
  photoFocus?: number;
  /** A die-cut logo or avatar (transparent PNG) shown on the halftone plate when there is no photo. */
  logo?: number;
};

/** Hard accent shadow under a tilted print or sticker: 7 px down and right, at the same angle. */
const shadowAt = (tilt: number) => ({ transform: [{ translateX: 7 }, { translateY: 7 }, { rotate: `${tilt}deg` }] });

/**
 * A picture slot. A full-size photo fills the slot, cropped toward `photoFocus` so selfies
 * keep their faces. A small photo is mounted as a print, and a logo as a die-cut sticker,
 * on the halftone plate. Otherwise the board's dashed placeholder stays.
 */
export function PhotoSlot({ subject, height, tilt }: { subject: PhotoSubject; height: number; tilt: number }) {
  if (subject.photo && subject.photoStyle !== 'print') {
    return (
      <View style={[styles.photo, { height }]}>
        <Photo
          source={subject.photo}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition={{ top: `${subject.photoFocus ?? 30}%`, left: '50%' }}
          accessibilityLabel={`Photo of ${subject.name}`}
        />
      </View>
    );
  }
  return (
    <View style={[styles.photo, { height }]}>
      <DotGrid color={color.dotOnPlate} />
      {subject.photo ? (
        <Print source={subject.photo} width={Math.round(height * 0.66)} tilt={tilt} name={subject.name} />
      ) : subject.logo ? (
        <Sticker source={subject.logo} size={Math.round(height * 0.74)} tilt={tilt} label={`${subject.name} logo`} />
      ) : (
        <Tag label={subject.photoLabel} tint={color.paper} border={color.dashOnInk} fill={color.tagOnPlate} style={styles.tagBottom} />
      )}
    </View>
  );
}

/** A square photo mounted like an instant print: paper border, a deeper foot with the handle, and an accent block shadow. */
export function Print({ source, width, tilt, name }: { source: number; width: number; tilt: number; name: string }) {
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

const styles = StyleSheet.create({
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
});
