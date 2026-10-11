import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Btn, ULink } from '@/components/Link';
import { Deck, Display } from '@/components/Type';
import { workClose } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';

/** The end of Our Work: one line, one button, and a link to the For Brands pitch. */
export function WorkClose() {
  const L = useLayout();
  return (
    <Band tone="accent" id="brief" label="Work with us" padTop={L.fl(88, 56)}>
      <View style={{ gap: L.fl(24, 18) }}>
        <Display level={2} size={fitWords(workClose.title, L.inner, L.fl(88, 44), -0.03)} lh={1} upper={false}>
          <Accented text={workClose.title} word={workClose.accent} />
        </Display>
        <Deck size={L.fl(24, 19)} lh={1.3} maxCh={44}>
          {workClose.body}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={workClose.primary.href} label={workClose.primary.label} />
          <ULink href={workClose.secondary.href} size={14}>
            {workClose.secondary.label}
          </ULink>
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 28, rowGap: 16 },
});
