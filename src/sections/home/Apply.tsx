import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { Btn, ULink } from '@/components/Link';
import { Display, Copy, Deck } from '@/components/Type';
import { apply } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';

export function Apply() {
  const L = useLayout();
  return (
    <Band tone="accent" id="apply" label="Apply">
      <View style={{ gap: L.fl(40, 28) }}>
        <Display level={2} size={fitLines(apply.title, L.inner, L.fl(160, 72), -0.01)} lh={0.86} ls={-0.01}>
          {apply.title}
        </Display>
        <Deck size={L.fl(30, 21)} lh={1.2} maxCh={40}>
          {apply.body}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={apply.primary.href} label={apply.primary.label} shadow="ink" />
          <Btn href={apply.secondary.href} label={apply.secondary.label} variant="outline" shadow="ink" />
        </View>
        <ULink href={apply.services.href} size={15}>
          {apply.services.label}
        </ULink>
        <View style={styles.send}>
          <Copy size={12} weight={600} ls={0.16}>
            {apply.sendLabel}
          </Copy>
          <Grid cols={L.isPhone ? 2 : 4} gap={L.fl(32, 16)} rowGap={24}>
            {apply.send.map((item, i) => (
              <View key={item} style={styles.item}>
                <Copy size={12} weight={600} ls={0.16} color={color.crimson}>
                  {String(i + 1).padStart(2, '0')}
                </Copy>
                <Copy size={L.fl(24, 19)} weight={600} lh={1.2}>
                  {item}
                </Copy>
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
