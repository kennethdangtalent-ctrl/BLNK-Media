import { View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Clipping } from '@/components/Clipping';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { offer } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

const TILTS = [-1, 0.8, -0.6];

/** What BLNK sells brands, right under the cover: three taped clippings, each with a crimson numeral. */
export function Offer() {
  const L = useLayout();
  const tone = useTone();
  return (
    <Band tone="accent" id="brands" label="For brands">
      <View style={{ gap: L.fl(56, 36) }}>
        <View style={{ gap: 12 }}>
          <Display level={2} size={fitWords(offer.title, L.inner, L.fl(96, 48), -0.03)} lh={1} upper={false}>
            <Accented text={offer.title} word={offer.accent} />
          </Display>
          <Deck size={L.fl(24, 19)} lh={1.3} color={tone.mute}>
            {offer.dek}
          </Deck>
        </View>
        <Grid cols={L.isPhone ? 1 : 3} gap={L.fl(36, 20)} rowGap={L.fl(36, 28)}>
          {offer.pillars.map((pillar, i) => (
            <Clipping key={pillar.name} tilt={TILTS[i % TILTS.length]} tape={i % 2 === 0 ? 'left' : 'right'} pad={L.fl(28, 22)}>
              <View style={{ gap: 12 }}>
                <Display aria-hidden size={L.fl(56, 44)} lh={0.9} color={color.crimson} upper={false}>
                  {String(i + 1).padStart(2, '0')}
                </Display>
                <Display level={3} size={L.fl(30, 26)} lh={1.05} upper={false}>
                  {pillar.name}
                </Display>
                <Copy size={L.fl(16, 15)} lh={1.5} color={color.greyOnPaper}>
                  {pillar.body}
                </Copy>
              </View>
            </Clipping>
          ))}
        </Grid>
        <View style={{ alignItems: 'flex-start' }}>
          <ULink href={offer.link.href} size={15}>
            {offer.link.label}
          </ULink>
        </View>
      </View>
    </Band>
  );
}
