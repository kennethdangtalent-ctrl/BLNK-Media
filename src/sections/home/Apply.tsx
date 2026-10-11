import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { Btn, ULink } from '@/components/Link';
import { Display, Copy, Deck } from '@/components/Type';
import { apply } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/** The creators' corner, after the brand close: the casting call, what to send and the apply button. */
export function Apply() {
  const L = useLayout();
  const tone = useTone();
  return (
    <Band tone="stock" id="apply" label="For creators">
      <View style={{ gap: L.fl(28, 20) }}>
        <Copy size={13} weight={600} upper>
          {apply.eyebrow}
        </Copy>
        <Display level={2} size={fitWords(apply.title, L.inner, L.fl(72, 40), -0.03)} lh={1} upper={false}>
          {apply.title}
        </Display>
        <Deck size={L.fl(22, 18)} lh={1.3} color={tone.mute}>
          {apply.body}
        </Deck>
        <View style={[styles.send, { borderColor: tone.fg }]}>
          <Copy size={12} weight={600} upper>
            {apply.sendLabel}
          </Copy>
          <Grid cols={L.isPhone ? 2 : 4} gap={L.fl(32, 16)} rowGap={20}>
            {apply.send.map((item, i) => (
              <View key={item} style={styles.item}>
                <Copy size={12} weight={600}>
                  {String(i + 1).padStart(2, '0')}
                </Copy>
                <Deck size={L.fl(20, 18)} lh={1.2}>
                  {item}
                </Deck>
              </View>
            ))}
          </Grid>
        </View>
        <View style={styles.ctas}>
          <Btn href={apply.primary.href} label={apply.primary.label} />
          <ULink href={apply.services.href} size={14}>
            {apply.services.label}
          </ULink>
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 24, rowGap: 14 },
  send: { gap: 16, paddingTop: 20, borderTopWidth: 2 },
  item: { gap: 6 },
});
