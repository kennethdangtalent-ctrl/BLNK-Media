import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Copy, Display } from '@/components/Type';
import { founder } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/**
 * The founder: a 4:5 portrait beside the name, one line for role and school, and the bio. The
 * name is the heading; the band's label names the section for screen readers. Stacked on phone.
 */
export function Founder() {
  return (
    <Band tone="dark" label="Founder">
      <FounderCard />
    </Band>
  );
}

/** Inside the band, so `useTone()` reads the dark tone. */
function FounderCard() {
  const L = useLayout();
  const tone = useTone();
  const stacked = L.isPhone;
  const colW = Math.min(L.inner, 1080);
  const gap = stacked ? 32 : L.fl(64, 40);
  const photoW = stacked ? colW : Math.round(colW * 0.4);
  const photoH = Math.round(photoW * 1.25);
  const textW = stacked ? colW : colW - photoW - gap;
  const credit = `${founder.role} · ${founder.school.replace(/\s+—\s+/, ', ')}`;

  return (
    <View role="article" aria-label={founder.name} style={[styles.card, { width: colW, flexDirection: stacked ? 'column' : 'row', gap }]}>
      <View style={{ width: photoW }}>
        <PhotoSlot subject={founder} height={photoH} tilt={0} />
      </View>
      <View style={[styles.body, stacked ? null : { width: textW }]}>
        <View style={{ gap: 10 }}>
          <Display level={2} size={fitWords(founder.name, textW, L.fl(88, 48), -0.03)} lh={0.92} upper={false}>
            {founder.name}
          </Display>
          <Copy size={15} weight={600} color={tone.mute}>
            {credit}
          </Copy>
        </View>
        <Copy size={L.fl(18, 16)} lh={1.65} color={tone.fg}>
          {founder.bio}
        </Copy>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignSelf: 'center', alignItems: 'center' },
  body: { gap: 24 },
});
