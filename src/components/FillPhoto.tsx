import { Image as Photo, type ImageContentPosition } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

/**
 * A full-color photo filling its slot, cropped toward `focus` so faces stay in frame. Creators
 * are shown as shot; the magazine feel comes from the layout around the photo, not a filter on it.
 */
export function FillPhoto({
  source,
  label,
  focus = 30,
  style,
}: {
  source: number;
  label: string;
  /** Vertical crop point in percent from the top. */
  focus?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const position: ImageContentPosition = { top: `${focus}%`, left: '50%' };
  return (
    <View style={[styles.fill, style]}>
      <Photo source={source} style={StyleSheet.absoluteFill} contentFit="cover" contentPosition={position} accessibilityLabel={label} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden' },
});
