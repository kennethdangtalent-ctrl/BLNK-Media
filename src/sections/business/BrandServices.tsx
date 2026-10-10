import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Copy, Display } from '@/components/Type';
import { brandServices, services } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/**
 * How we work with brands: the brand half of the services as a tidy grid, one line each, with a
 * link to the full Services page (which also covers what BLNK does for creators).
 */
export function BrandServices() {
  const L = useLayout();
  const tone = useTone();
  const rows = services.groups[0].rows;
  const cols = L.isPhone ? 1 : L.isTablet ? 2 : 3;
  return (
    <Band tone="stock" id="services" label="How we work with brands">
      <View style={{ gap: L.fl(48, 32) }}>
        <Display level={2} size={fitWords(brandServices.title, L.inner, L.fl(80, 44), -0.03)} lh={0.92} upper={false}>
          <Accented text={brandServices.title} word="brands" />
        </Display>
        <Grid cols={cols} gap={L.fl(40, 24)} rowGap={L.fl(36, 24)}>
          {rows.map((row) => (
            <View key={row.name} style={[styles.item, { borderColor: tone.fg }]}>
              <Display level={3} size={L.fl(28, 22)} lh={1.05} upper={false}>
                {row.name}
              </Display>
              <Copy size={L.fl(17, 16)} lh={1.55} color={tone.mute}>
                {row.desc}
              </Copy>
            </View>
          ))}
        </Grid>
        <ULink href={brandServices.link.href} size={14}>
          {brandServices.link.label}
        </ULink>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  item: { gap: 10, borderTopWidth: 2, paddingTop: 18 },
});
