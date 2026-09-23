import { Image, StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { DotGrid } from '@/components/DotGrid';
import { Grid } from '@/components/Grid';
import { ULink } from '@/components/Link';
import { Tag } from '@/components/Marks';
import { SectionHead } from '@/components/SectionHead';
import { Display, Mono } from '@/components/Type';
import { decks, type Deck } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

export function Decks() {
  const L = useLayout();
  const cols = L.isPhone ? 1 : 3;
  const gap = L.isDesktop ? Math.round(32 * L.s) : 24;
  const colW = (L.inner - (cols - 1) * gap) / cols;
  const titleSize = Math.min(...decks.items.map((deck) => fitWords(deck.title, colW, L.fl(44, 32))));

  return (
    <Band tone="light" id="decks" label="Media decks" ruleBottom>
      <View style={{ gap: L.fl(64, 40) }}>
        <SectionHead eyebrow={decks.head.eyebrow} title={decks.head.title} dek={decks.head.dek} />
        <Grid cols={cols} gap={gap} rowGap={40}>
          {decks.items.map((deck) => (
            <DeckCard key={deck.label} deck={deck} titleSize={titleSize} />
          ))}
        </Grid>
      </View>
    </Band>
  );
}

function DeckCard({ deck, titleSize }: { deck: Deck; titleSize: number }) {
  const tone = useTone();
  return (
    <View role="article" aria-label={deck.title} style={styles.card}>
      <View style={styles.cover}>
        {deck.cover ? (
          <Image source={deck.cover} style={StyleSheet.absoluteFill} resizeMode="cover" accessibilityLabel={`${deck.title} cover`} />
        ) : (
          <>
            <DotGrid color={color.dotOnDeck} />
            <Tag label={deck.coverLabel} tint={color.ink} border={color.ink} fill={color.tagOnDeck} style={styles.bottom} />
          </>
        )}
        <Mono size={11} weight={600} ls={0.16}>
          PDF
        </Mono>
      </View>
      <Mono size={12} weight={600} ls={0.16} color={tone.mute}>
        {deck.label}
      </Mono>
      <Display level={3} size={titleSize} lh={0.9}>
        {deck.title}
      </Display>
      <Mono size={14} lh={1.6} color={tone.mute}>
        {deck.body}
      </Mono>
      <ULink href={deck.cta.href}>{deck.cta.label}</ULink>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 16 },
  cover: {
    height: 224,
    borderWidth: 2,
    borderColor: color.ink,
    backgroundColor: color.deck,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 16,
    overflow: 'hidden',
  },
  bottom: { alignSelf: 'flex-end' },
});
