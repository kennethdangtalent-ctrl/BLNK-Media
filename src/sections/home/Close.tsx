import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Btn } from '@/components/Link';
import { Deck, Display } from '@/components/Type';
import { close } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';

/** The closing ask on the front page, for brands: start a request, or see the work first. */
export function Close() {
  const L = useLayout();
  return (
    <Band tone="accent" id="work" label="Work with us">
      <View style={{ gap: L.fl(36, 24) }}>
        <Display level={2} size={fitLines(close.title, L.inner, L.fl(150, 64), -0.02)} lh={0.88}>
          <Accented text={close.title} word={close.accent} />
        </Display>
        <Deck size={L.fl(28, 20)} lh={1.25} maxCh={42}>
          {close.body}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={close.primary.href} label={close.primary.label} />
          <Btn href={close.secondary.href} label={close.secondary.label} variant="outline" />
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 },
});
