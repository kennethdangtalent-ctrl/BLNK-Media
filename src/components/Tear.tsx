import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { webProps } from '@/theme/web';

const W = 1440;
const H = 16;

/** Small deterministic PRNG so every tear is the same on server and client. */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 10_000) / 10_000;
  };
}

/** A hand-torn edge: irregular steps of 6 to 22 px, mostly shallow with the odd deep bite. */
function tornPath(seed: number): string {
  const r = rng(seed);
  let d = `M0 ${H} L0 ${(H * 0.55).toFixed(1)}`;
  for (let x = 0; x < W; ) {
    x = Math.min(W, x + 6 + r() * 16);
    const bite = r() < 0.12 ? 0.05 + r() * 0.2 : 0.35 + r() * 0.45;
    d += ` L${x.toFixed(1)} ${(H * bite).toFixed(1)}`;
  }
  return `${d} L${W} ${H} Z`;
}

const cache = new Map<number, string>();

/**
 * The ripped top edge of a sheet, drawn in the sheet's own color and laid over the bottom of
 * whatever sits above it. Where both sheets are the same color the tear disappears, so it only
 * shows where the paper changes.
 */
export function Tear({ fill, seed = 7 }: { fill: string; seed?: number }) {
  let d = cache.get(seed);
  if (!d) {
    d = tornPath(seed);
    cache.set(seed, d);
  }
  return (
    <View style={styles.edge} {...webProps({ 'aria-hidden': true })} pointerEvents="none">
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <Path d={d} fill={fill} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  edge: { position: 'absolute', left: 0, right: 0, top: -H + 1, height: H, zIndex: 2 },
});
