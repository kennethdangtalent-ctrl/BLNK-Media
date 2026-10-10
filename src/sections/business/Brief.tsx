import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Btn, ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { brief, deckLinks, decks } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

/** The closing ask: start a brief by email. The three decks sit under the buttons as request links. */
export function Brief() {
  const L = useLayout();
  const tone = useTone();
  return (
    <Band tone="accent" id="brief" label="Start a brief">
      <View style={{ gap: L.fl(32, 24) }}>
        <Display level={2} size={fitLines(brief.title, L.inner, L.fl(120, 64), -0.03)} lh={0.88}>
          {brief.title}
        </Display>
        <Deck size={L.fl(24, 19)} lh={1.3} maxCh={44}>
          {brief.body}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={brief.primary.href} label={brief.primary.label} />
          <Btn href={brief.secondary.href} label={brief.secondary.label} variant="outline" dismissTo />
        </View>
        <View style={[styles.decks, { borderColor: tone.fg }]}>
          <Copy size={15} color={tone.mute}>
            {deckLinks.label}
          </Copy>
          {decks.items.map((deck) => (
            <ULink key={deck.title} href={deck.cta.href} size={15}>
              {deck.title}
            </ULink>
          ))}
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 },
  decks: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 24, rowGap: 10, borderTopWidth: 1, paddingTop: 20 },
});
