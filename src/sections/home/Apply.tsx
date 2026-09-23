import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { Btn } from '@/components/Link';
import { Eyebrow } from '@/components/Marks';
import { Display, Mono, Serif } from '@/components/Type';
import { apply } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';

export function Apply() {
  const L = useLayout();
  return (
    <Band tone="accent" id="apply" label="Apply">
      <View style={{ gap: L.fl(40, 28) }}>
        <Eyebrow square={color.ink}>{apply.eyebrow}</Eyebrow>
        <Display level={2} size={fitLines(apply.title, L.inner, L.fl(160, 72), -0.01)} lh={0.86} ls={-0.01}>
          {apply.title}
        </Display>
        <Serif size={L.fl(30, 21)} lh={1.2} maxCh={40}>
          {apply.body}
        </Serif>
        <View style={styles.ctas}>
          <Btn href={apply.primary.href} label={apply.primary.label} shadow="ink" />
          <Btn href={apply.secondary.href} label={apply.secondary.label} variant="outline" shadow="ink" />
        </View>
        <View style={styles.send}>
          <Mono size={12} weight={600} ls={0.16}>
            {apply.sendLabel}
          </Mono>
          <Grid cols={L.isPhone ? 2 : 4} gap={L.fl(32, 16)} rowGap={24}>
            {apply.send.map((item, i) => (
              <View key={item} style={styles.item}>
                <Mono size={12} weight={600} ls={0.16}>
                  {String(i + 1).padStart(2, '0')}
                </Mono>
                <Serif size={L.fl(26, 21)} lh={1.15}>
                  {item}
                </Serif>
              </View>
            ))}
          </Grid>
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 },
  send: { gap: 20, paddingTop: 40, borderTopWidth: 2, borderColor: color.ink },
  item: { gap: 8 },
});
