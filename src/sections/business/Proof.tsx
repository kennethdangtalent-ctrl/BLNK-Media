import { Image, StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { clients, proof, sponsors, type Client } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/** Height the logos are fitted into, so different marks read as one row. */
const LOGO_H = 64;

/**
 * Who we work with, printed straight onto the paper: partners first (the companies BLNK works with
 * directly, each with its line and a link), then the brands BLNK's creators have been sponsored by,
 * as a row of logos. No boxes; the logos are transparent and sit on the page itself.
 */
export function Proof() {
  const L = useLayout();
  const tone = useTone();
  return (
    <Band tone="stock" id="clients" label="Who we work with">
      <View style={{ gap: L.fl(64, 40) }}>
        <Display level={2} size={fitWords(proof.title, L.inner, L.fl(80, 44), -0.03)} lh={0.92} upper={false}>
          <Accented text={proof.title} word={proof.accent} />
        </Display>

        <View style={{ gap: L.fl(28, 20) }}>
          <View style={{ gap: 8 }}>
            <Display level={3} size={L.fl(34, 26)} lh={1} upper={false}>
              {proof.partners.title}
            </Display>
            <Copy size={L.fl(17, 15)} color={tone.mute}>
              {proof.partners.dek}
            </Copy>
          </View>
          <Grid cols={L.isPhone ? 1 : 2} gap={L.fl(48, 24)} rowGap={32}>
            {clients.items.map((client) => (
              <Partner key={client.name} client={client} />
            ))}
          </Grid>
        </View>

        <View style={{ gap: L.fl(28, 20) }}>
          <Display level={3} size={L.fl(34, 26)} lh={1} upper={false}>
            {proof.brands.title}
          </Display>
          <Grid cols={L.isPhone ? 2 : 4} gap={L.fl(40, 20)} rowGap={28}>
            {sponsors.items.map((brand) => (
              <View key={brand.name} style={[styles.brand, { borderColor: tone.fg }]}>
                <View style={styles.logoBox}>
                  {brand.logo ? (
                    <Image source={brand.logo} style={styles.brandLogo} resizeMode="contain" accessibilityLabel={`${brand.name} logo`} />
                  ) : null}
                </View>
                <Copy size={14} weight={600}>
                  {brand.name}
                </Copy>
              </View>
            ))}
          </Grid>
        </View>
      </View>
    </Band>
  );
}

/** A partner: logo, name, its one line and what it is, and a link out. */
function Partner({ client }: { client: Client }) {
  const L = useLayout();
  const tone = useTone();
  const aspect = client.logoAspect ?? 1;
  const logoW = Math.min(L.isPhone ? 200 : 260, LOGO_H * aspect);
  return (
    <View style={[styles.partner, { borderColor: tone.fg }]}>
      <View style={styles.logoBox}>
        {client.logo ? (
          <Image
            source={client.logo}
            style={{ width: logoW, height: logoW / aspect }}
            resizeMode="contain"
            tintColor={client.logoInk ? color.ink : undefined}
            accessibilityLabel={`${client.name} logo`}
          />
        ) : null}
      </View>
      <Copy size={13} weight={600} upper color={tone.mute}>
        {client.kicker}
      </Copy>
      <Display level={4} size={L.fl(30, 24)} lh={1.05} upper={false}>
        {client.name}
      </Display>
      <Deck italic size={L.fl(20, 18)} lh={1.3}>
        {client.line}
      </Deck>
      <Copy size={L.fl(16, 15)} lh={1.55} color={tone.mute}>
        {client.body}
      </Copy>
      {client.link.href ? (
        <ULink href={client.link.href} size={14}>
          {client.link.label}
        </ULink>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  partner: { gap: 10, borderTopWidth: 2, paddingTop: 20 },
  brand: { gap: 12, borderTopWidth: 1, paddingTop: 18 },
  logoBox: { height: LOGO_H, justifyContent: 'center', alignItems: 'flex-start' },
  brandLogo: { width: '100%', maxWidth: 140, height: LOGO_H },
});
