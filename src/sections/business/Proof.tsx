import { Image, StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Clipping, Sticker } from '@/components/Clipping';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { clients, proof, sponsors, type Client } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/** Hand-set angles, so the clippings and stickers read as pasted down by hand. */
const CLIP_TILTS = [-1.2, 1];
const STICKER_TILTS = [-6, 4, -3, 7];

/**
 * Who we work with, pasted up like a magazine page: each partner (the companies BLNK works with
 * directly) on a taped paper clipping, then the brands BLNK's creators have been sponsored by as
 * die-cut stickers slapped on at angles.
 */
export function Proof() {
  const L = useLayout();
  const tone = useTone();
  const sticker = L.isPhone ? 112 : 136;
  return (
    <Band tone="stock" id="clients" label="Who we work with">
      <View style={{ gap: L.fl(72, 48) }}>
        <Display level={2} size={fitWords(proof.title, L.inner, L.fl(80, 44), -0.03)} lh={1.05} upper={false}>
          <Accented text={proof.title} word={proof.accent} />
        </Display>

        <View style={{ gap: L.fl(36, 24) }}>
          <View style={{ gap: 8 }}>
            <Display level={3} size={L.fl(34, 26)} lh={1} upper={false}>
              {proof.partners.title}
            </Display>
            <Copy size={L.fl(17, 15)} color={tone.mute}>
              {proof.partners.dek}
            </Copy>
          </View>
          <Grid cols={L.isPhone ? 1 : 2} gap={L.fl(48, 24)} rowGap={36}>
            {clients.items.map((client, i) => (
              <Clipping key={client.name} tilt={CLIP_TILTS[i % CLIP_TILTS.length]} pad={L.fl(28, 20)}>
                <Partner client={client} />
              </Clipping>
            ))}
          </Grid>
        </View>

        <View style={{ gap: L.fl(36, 24) }}>
          <Display level={3} size={L.fl(34, 26)} lh={1} upper={false}>
            {proof.brands.title}
          </Display>
          <View style={[styles.stickers, { gap: L.fl(40, 20) }]}>
            {sponsors.items.map((brand, i) => (
              <View key={brand.name} style={styles.stickerCell}>
                <Sticker size={sticker} tilt={STICKER_TILTS[i % STICKER_TILTS.length]}>
                  {brand.logo ? <Image source={brand.logo} style={styles.fill} resizeMode="contain" accessibilityLabel={`${brand.name} logo`} /> : null}
                </Sticker>
                <Copy size={14} weight={600} align="center">
                  {brand.name}
                </Copy>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Band>
  );
}

/** A partner's clipping: logo, what it is, name, its line, a sentence, and a link out. */
function Partner({ client }: { client: Client }) {
  const L = useLayout();
  const tone = useTone();
  const aspect = client.logoAspect ?? 1;
  const logoH = 56;
  const logoW = Math.min(L.isPhone ? 200 : 240, logoH * aspect);
  return (
    <View style={{ gap: 10 }}>
      <View style={{ height: logoH, justifyContent: 'center' }}>
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
      <Display level={4} size={L.fl(32, 26)} lh={1.05} upper={false}>
        {client.name}
      </Display>
      <Deck italic size={L.fl(20, 18)} lh={1.3}>
        {client.line}
      </Deck>
      <Copy size={L.fl(16, 15)} lh={1.55} color={tone.mute}>
        {client.body}
      </Copy>
      {client.link.href ? (
        <View style={{ paddingTop: 4 }}>
          <ULink href={client.link.href} size={14}>
            {client.link.label}
          </ULink>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stickers: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' },
  stickerCell: { alignItems: 'center', gap: 14 },
  fill: { width: '100%', height: '100%' },
});
