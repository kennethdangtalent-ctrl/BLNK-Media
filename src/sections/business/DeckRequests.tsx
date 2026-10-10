import { Image } from 'expo-image';
import { View } from 'react-native';

import { Band } from '@/components/Band';
import { Clipping } from '@/components/Clipping';
import { Grid } from '@/components/Grid';
import { Btn } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { decks, type Deck as DeckItem } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';

const TILTS = [-1.2, 0.9, -0.7];

/** Width over height of the deck preview images. */
const PREVIEW_RATIO = 960 / 680;

/**
 * The decks a brand team can ask for, set on black so they can't be missed: each one a taped
 * clipping with its preview, what's in it, and a request button that opens an email.
 */
export function DeckRequests() {
  const L = useLayout();
  const tone = useTone();
  return (
    <Band tone="ink" id="decks" label="Request a deck">
      <View style={{ gap: L.fl(48, 32) }}>
        <View style={{ gap: 12 }}>
          <Display level={2} size={fitWords(decks.head.title, L.inner, L.fl(80, 44), -0.03)} lh={1} upper={false}>
            {decks.head.title}
          </Display>
          <Deck size={L.fl(22, 18)} lh={1.3} color={tone.mute}>
            {decks.head.dek}
          </Deck>
        </View>
        <Grid cols={L.isPhone ? 1 : 3} gap={L.fl(36, 20)} rowGap={L.fl(36, 28)}>
          {decks.items.map((deck, i) => (
            <Clipping key={deck.title} tilt={TILTS[i % TILTS.length]} tape={i % 2 === 0 ? 'left' : 'right'} pad={L.fl(22, 18)}>
              <DeckCard deck={deck} />
            </Clipping>
          ))}
        </Grid>
      </View>
    </Band>
  );
}

/** Inside a clipping, so the tone is the white sheet's. */
function DeckCard({ deck }: { deck: DeckItem }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={{ gap: 14 }}>
      {deck.cover ? (
        <View style={{ aspectRatio: PREVIEW_RATIO, width: '100%', overflow: 'hidden' }}>
          <Image source={deck.cover} style={{ width: '100%', height: '100%' }} contentFit="cover" accessibilityLabel={`Preview of ${deck.title}`} />
        </View>
      ) : null}
      <Display level={3} size={L.fl(26, 22)} lh={1.05} upper={false}>
        {deck.title}
      </Display>
      <Copy size={L.fl(15, 15)} lh={1.5} color={tone.mute}>
        {deck.body}
      </Copy>
      <Btn href={deck.cta.href} label={deck.cta.label} />
    </View>
  );
}
