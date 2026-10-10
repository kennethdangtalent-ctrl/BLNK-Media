import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Btn } from '@/components/Link';
import { Deck, Display } from '@/components/Type';
import { brief } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';

/** The closing ask: start a brief by email. The decks have their own section just above. */
export function Brief() {
  const L = useLayout();
  return (
    <Band tone="accent" id="brief" label="Start a brief">
      <View style={{ gap: L.fl(32, 24) }}>
        <Display level={2} size={fitLines(brief.title, L.inner, L.fl(120, 64), -0.03)} lh={0.88}>
          <Accented text={brief.title} word="brief" />
        </Display>
        <Deck size={L.fl(24, 19)} lh={1.3} maxCh={44}>
          {brief.body}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={brief.primary.href} label={brief.primary.label} />
          <Btn href={brief.secondary.href} label={brief.secondary.label} variant="outline" dismissTo />
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 },
});
