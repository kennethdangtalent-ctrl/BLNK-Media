import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Btn, ULink } from '@/components/Link';
import { Reveal } from '@/components/Reveal';
import { Display, Deck } from '@/components/Type';
import { bizHero } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';

/** The Our Work opener: the headline set big across the page, one line on what's here, and the ask. */
export function BizHero() {
  const L = useLayout();
  const titleSize = fitWords(bizHero.title, L.inner, L.fl(170, 64), -0.01);

  return (
    <Band tone="light" label="Our work" ruleBottom padTop={L.fl(80, 40)} padBottom={L.fl(72, 56)}>
      <View style={{ gap: L.fl(36, 24) }}>
        <Reveal index={1}>
          <Display level={1} size={titleSize} lh={0.88} ls={-0.01}>
            <Accented text={bizHero.title} word={bizHero.accent} />
          </Display>
        </Reveal>
        <Reveal index={2}>
          <Deck size={L.fl(28, 20)} lh={1.25} maxCh={44}>
            {bizHero.lede}
          </Deck>
        </Reveal>
        <Reveal index={3} style={styles.ctas}>
          <Btn href={bizHero.cta.href} label={bizHero.cta.label} />
          <ULink href={bizHero.back.href} dismissTo size={13} weight={400} ls={0.04}>
            {bizHero.back.label}
          </ULink>
        </Reveal>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 28, rowGap: 16 },
});
