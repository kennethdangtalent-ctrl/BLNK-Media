import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { clients, proof, sponsors } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Tile = { name: string; tag: string; logo?: ImageSourcePropType; aspect: number; ink?: boolean; link?: { label: string; href?: string } };

/** Height every logo is fitted into, so a wall of different marks reads as one row. */
const LOGO_H = 72;

/**
 * Who we work with: the clients and the brands already on a BLNK stream, as one logo wall on white.
 * Each logo gets a name and one small tag under it; clients link out to their sites.
 */
export function Proof() {
  const L = useLayout();
  const tone = useTone();
  const tiles: Tile[] = [
    ...clients.items.map((c) => ({ name: c.name, tag: proof.clientTag, logo: c.logo, aspect: c.logoAspect ?? 1, ink: c.logoInk, link: c.link })),
    ...sponsors.items.map((s) => ({ name: s.name, tag: proof.sponsorTag, logo: s.logo, aspect: 1 })),
  ];
  const cols = L.isPhone ? 2 : 3;
  return (
    <Band tone="paper" id="clients" label="Who we work with">
      <View style={{ gap: L.fl(48, 32) }}>
        <View style={{ gap: 12 }}>
          <Display level={2} size={fitWords(proof.title, L.inner, L.fl(80, 44), -0.03)} lh={0.92} upper={false}>
            {proof.title}
          </Display>
          <Deck size={L.fl(22, 18)} lh={1.3} color={tone.mute}>
            {proof.dek}
          </Deck>
        </View>
        <Grid cols={cols} gap={L.fl(24, 12)} rowGap={L.fl(24, 12)}>
          {tiles.map((tile) => (
            <LogoTile key={tile.name} tile={tile} />
          ))}
        </Grid>
      </View>
    </Band>
  );
}

function LogoTile({ tile }: { tile: Tile }) {
  const L = useLayout();
  const tone = useTone();
  const maxW = L.isPhone ? 120 : 200;
  const logoW = Math.min(maxW, LOGO_H * tile.aspect);
  const logoH = logoW / tile.aspect;
  return (
    <View style={[styles.tile, { padding: L.fl(24, 16) }]}>
      <View style={styles.logoBox}>
        {tile.logo ? (
          <Image
            source={tile.logo}
            style={{ width: logoW, height: logoH }}
            resizeMode="contain"
            tintColor={tile.ink ? color.ink : undefined}
            accessibilityLabel={`${tile.name} logo`}
          />
        ) : (
          <Copy size={14} weight={600} upper color={tone.mute}>
            {tile.name}
          </Copy>
        )}
      </View>
      <View style={{ gap: 4 }}>
        <Copy size={16} weight={600}>
          {tile.name}
        </Copy>
        <Copy size={13} color={tone.mute}>
          {tile.tag}
        </Copy>
        {tile.link?.href ? (
          <View style={{ paddingTop: 6 }}>
            <ULink href={tile.link.href} size={13}>
              {tile.link.label}
            </ULink>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { gap: 18, borderWidth: 1, borderColor: color.blankOnPaper, flexGrow: 1 },
  logoBox: { height: LOGO_H, justifyContent: 'center', alignItems: 'flex-start' },
});
