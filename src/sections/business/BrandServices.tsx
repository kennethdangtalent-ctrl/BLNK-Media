import { View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Clipping } from '@/components/Clipping';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Copy, Display } from '@/components/Type';
import { brandServices, services } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

const TILTS = [-1, 0.8, -0.6, 1.1, -0.9, 0.7];

/**
 * How we work with brands: the six brand services as small paper clippings pasted in a grid, each
 * a name and one line, with a link to the full Services page.
 */
export function BrandServices() {
  const L = useLayout();
  const rows = services.groups[0].rows;
  const cols = L.isPhone ? 1 : L.isTablet ? 2 : 3;
  return (
    <Band tone="stock" id="services" label="How we work with brands">
      <View style={{ gap: L.fl(56, 36) }}>
        <Display level={2} size={fitWords(brandServices.title, L.inner, L.fl(80, 44), -0.03)} lh={1.05} upper={false}>
          <Accented text={brandServices.title} word="brands" />
        </Display>
        <Grid cols={cols} gap={L.fl(32, 20)} rowGap={L.fl(32, 24)}>
          {rows.map((row, i) => (
            <Clipping key={row.name} tilt={TILTS[i % TILTS.length]} tape={i % 2 === 0 ? 'left' : 'right'}>
              <ServiceText name={row.name} desc={row.desc} />
            </Clipping>
          ))}
        </Grid>
        <ULink href={brandServices.link.href} size={14}>
          {brandServices.link.label}
        </ULink>
      </View>
    </Band>
  );
}

/** Inside a clipping, so the tone is the white sheet's. */
function ServiceText({ name, desc }: { name: string; desc: string }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={{ gap: 8 }}>
      <Display level={3} size={L.fl(26, 22)} lh={1.05} upper={false}>
        {name}
      </Display>
      <Copy size={L.fl(16, 15)} lh={1.5} color={tone.mute}>
        {desc}
      </Copy>
    </View>
  );
}
