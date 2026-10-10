import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Eyebrow } from '@/components/Marks';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Display, Mono } from '@/components/Type';
import { founder } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/** The founder, laid out like a roster card: a 4:5 portrait beside the name, title and bio. Stacked on phone. */
export function Founder() {
  const L = useLayout();
  return (
    <Band tone="dark" label="Founder">
      <View style={{ gap: L.fl(56, 36) }}>
        <Eyebrow>{founder.eyebrow}</Eyebrow>
        <FounderCard />
      </View>
    </Band>
  );
}

/** Inside the band, so `useTone()` reads the dark tone. */
function FounderCard() {
  const L = useLayout();
  const tone = useTone();
  const stacked = L.isPhone;
  const gap = L.isDesktop ? Math.round(64 * L.s) : 40;
  const photoW = L.isDesktop ? Math.round(480 * L.s) : L.isTablet ? Math.round(L.inner * 0.42) : L.inner;
  const photoH = Math.round(photoW * 1.25);
  const textW = stacked ? L.inner : L.inner - photoW - gap;

  return (
    <View role="article" aria-label={founder.name} style={[styles.card, { flexDirection: stacked ? 'column' : 'row', gap }]}>
      <View style={{ width: photoW }}>
        <PhotoSlot subject={founder} height={photoH} tilt={0} />
      </View>
      <View style={[styles.body, stacked ? styles.bodyStacked : styles.bodyBeside]}>
        <View style={styles.titles}>
          <Mono size={13} weight={600} ls={0.16} upper color={color.accent}>
            {founder.role}
          </Mono>
          <Mono size={12} weight={600} ls={0.16} upper color={tone.mute}>
            {founder.school}
          </Mono>
        </View>
        <Display level={2} size={fitWords(founder.name, textW, L.fl(120, 64), -0.005)} lh={0.88} ls={-0.005}>
          {founder.name}
        </Display>
        <Mono size={L.fl(16, 14)} lh={1.7} color={tone.mute} maxCh={60} style={[styles.bio, { borderColor: tone.hair }]}>
          {founder.bio}
        </Mono>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'flex-start' },
  body: { gap: 20 },
  bodyBeside: { flex: 1, minWidth: 0, alignSelf: 'flex-end' },
  bodyStacked: { alignSelf: 'stretch' },
  titles: { gap: 8 },
  bio: { borderTopWidth: 1, paddingTop: 20 },
});
