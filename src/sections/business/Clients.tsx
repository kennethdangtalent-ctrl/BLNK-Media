import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { SectionHead } from '@/components/SectionHead';
import { Display, Copy, Deck } from '@/components/Type';
import { clients, type Client } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

export function Clients() {
  const L = useLayout();
  const cols = L.isPhone ? 1 : 2;
  const gap = L.isDesktop ? Math.round(48 * L.s) : 32;
  const colW = (L.inner - (cols - 1) * gap) / cols;
  // One size for every name, fitted so each sits on a single line and the cards stay level.
  const nameSize = Math.min(...clients.items.map((client) => fitLines(client.name, colW, L.fl(88, 52), -0.005)));

  return (
    <Band tone="paper" id="clients" label="Clients and partners">
      <View style={{ gap: L.fl(64, 40) }}>
        <SectionHead eyebrow={clients.head.eyebrow} title={clients.head.title} dek={clients.head.dek} />
        <Grid cols={cols} gap={gap} rowGap={L.fl(56, 40)}>
          {clients.items.map((client) => (
            <ClientCard key={client.n} client={client} nameSize={nameSize} />
          ))}
        </Grid>
      </View>
    </Band>
  );
}

function ClientCard({ client, nameSize }: { client: Client; nameSize: number }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View role="article" aria-label={client.name} style={styles.card}>
      <View style={styles.top}>
        <LogoSlot label={client.logoLabel} logo={client.logo} aspect={client.logoAspect ?? 1} ink={client.logoInk} name={client.name} />
        <Display aria-hidden size={L.fl(56, 44)} lh={0.85} upper={false} color={color.accent}>
          {client.n}
        </Display>
      </View>
      <Copy size={12} weight={600} ls={0.16} color={tone.mute}>
        {client.kicker}
      </Copy>
      <Display level={3} size={nameSize} lh={0.88} ls={-0.005}>
        {client.name}
      </Display>
      <Deck italic size={L.fl(30, 22)} lh={1.15}>
        {client.line}
      </Deck>
      <Copy size={L.fl(15, 14)} lh={1.65} color={tone.mute} maxCh={52}>
        {client.body}
      </Copy>
      <View style={styles.foot}>
        {client.link.href ? (
          <ULink href={client.link.href}>{client.link.label}</ULink>
        ) : (
          <Copy size={12} weight={600} ls={0.14} color={tone.mute}>
            {client.link.label}
          </Copy>
        )}
      </View>
    </View>
  );
}

/** Logos share one 96 px row. A square mark fills it; a wide wordmark keeps its shape, capped at LOGO_MAX_W. */
const LOGO_H = 96;
const LOGO_MAX_W = 260;

function LogoSlot({ label, logo, aspect, ink, name }: { label: string; logo?: ImageSourcePropType; aspect: number; ink?: boolean; name: string }) {
  if (logo) {
    const width = Math.min(LOGO_MAX_W, LOGO_H * aspect);
    return (
      <View style={[styles.logoRow, { width }]}>
        <Image
          source={logo}
          style={{ width, height: width / aspect }}
          resizeMode="contain"
          tintColor={ink ? color.ink : undefined}
          accessibilityLabel={`${name} logo`}
        />
      </View>
    );
  }
  return (
    <View style={[styles.logo, styles.logoSlot]}>
      <Copy size={11} ls={0.14} align="center">
        {label}
      </Copy>
    </View>
  );
}

const styles = StyleSheet.create({
  // Fills its grid cell so the links pin to a shared baseline across the row.
  card: { flexGrow: 1, gap: 20, borderTopWidth: 3, borderColor: color.ink, paddingTop: 24 },
  foot: { marginTop: 'auto' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logo: { width: LOGO_H, height: LOGO_H },
  logoRow: { height: LOGO_H, justifyContent: 'center', flexShrink: 1 },
  logoSlot: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.blankOnPaper,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
});
