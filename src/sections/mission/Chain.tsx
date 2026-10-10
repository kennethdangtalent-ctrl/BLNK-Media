import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Copy, Deck, Display } from '@/components/Type';
import { chain } from '@/content/mission';
import { useLayout } from '@/theme/layout';
import { useTone } from '@/theme/tone';

import { READING_W } from './Thesis';

/**
 * The long game, read as one sentence: Creator talent → Media → Brand partnerships → Technology →
 * Capital. The steps wrap as a single flowing line on wide screens and stack with downward arrows
 * on a phone. Same centred column as the essay above it.
 */
export function Chain() {
  const L = useLayout();
  const colW = Math.min(L.inner, Math.max(READING_W, 960));
  const title = chain.eyebrow.replace(/^\d+\s+—\s+/, '');
  return (
    <Band tone="dark" label="The long game">
      <View style={[styles.column, { width: colW, gap: L.fl(32, 24) }]}>
        <Display level={2} size={L.fl(72, 40)} lh={0.9} upper={false}>
          {sentence(title)}
        </Display>
        <Steps />
      </View>
    </Band>
  );
}

/** "THE LONG GAME" from the content file, set in sentence case to match the rest of the page. */
function sentence(text: string) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Inside the band, so `useTone()` reads the dark tone. */
function Steps() {
  const L = useLayout();
  const tone = useTone();
  const size = L.fl(40, 26);
  return (
    <View style={{ gap: 12 }}>
      <Deck italic size={L.fl(24, 19)} color={tone.mute}>
        {chain.intro}
      </Deck>
      <View role="list" style={L.isPhone ? styles.stack : styles.flow}>
        {chain.steps.map((step, i) => (
          <View role="listitem" key={step} style={L.isPhone ? styles.stackItem : styles.flowItem}>
            <Display size={size} lh={1.1} upper={false}>
              {step}
            </Display>
            {i < chain.steps.length - 1 ? (
              <Copy aria-hidden size={Math.round(size * 0.7)} weight={600} color={tone.mute} lh={1}>
                {L.isPhone ? '↓' : '→'}
              </Copy>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { alignSelf: 'center' },
  flow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 18, rowGap: 6 },
  flowItem: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  stack: { gap: 4 },
  stackItem: { gap: 4 },
});
