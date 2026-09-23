import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { Band } from '@/components/Band';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { SectionHead } from '@/components/SectionHead';
import { Display, Mono, Serif } from '@/components/Type';
import { clients, type Client } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

export function Clients() {
  const L = useLayout();
  const cols = L.isPhone ? 1 : 2;
  const gap = L.isDesktop ? Math.round(48 * L.s) : 32;
  const colW = (L.inner - (cols - 1) * gap) / cols;
  const nameSize = Math.min(...clients.items.map((client) => fitWords(client.name, colW, L.fl(88, 52), -0.005)));

  return (
    <Band tone="dark" id="clients" label="Clients and partners">
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
        <LogoSlot label={client.logoLabel} logo={client.logo} name={client.name} />
        <Display aria-hidden size={L.fl(56, 44)} lh={0.85} upper={false} color={color.accent}>
          {client.n}
        </Display>
      </View>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
        {client.kicker}
      </Mono>
      <Display level={3} size={nameSize} lh={0.88} ls={-0.005}>
        {client.name}
      </Display>
      <Serif italic size={L.fl(30, 22)} lh={1.15}>
        {client.line}
      </Serif>
      <Mono size={L.fl(15, 14)} lh={1.65} color={tone.mute} maxCh={52}>
        {client.body}
      </Mono>
      {client.link.href ? (
        <ULink href={client.link.href}>{client.link.label}</ULink>
      ) : (
        <Mono size={12} weight={600} ls={0.14} color={tone.mute}>
          {client.link.label}
        </Mono>
      )}
    </View>
  );
}

function LogoSlot({ label, logo, name }: { label: string; logo?: ImageSourcePropType; name: string }) {
  if (logo) {
    return <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel={`${name} logo`} />;
  }
  return (
    <View style={[styles.logo, styles.logoSlot]}>
      <Mono size={11} ls={0.14} align="center">
        {label}
      </Mono>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 20, borderTopWidth: 3, borderColor: color.paper, paddingTop: 24 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logo: { width: 96, height: 96 },
  logoSlot: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.dashOnInk,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
});
