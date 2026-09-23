import { StyleSheet, View } from 'react-native';

import { Band } from '@/components/Band';
import { Btn } from '@/components/Link';
import { Eyebrow } from '@/components/Marks';
import { Display, Serif } from '@/components/Type';
import { brief } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitLines } from '@/theme/metrics';
import { color } from '@/theme/tokens';

export function Brief() {
  const L = useLayout();
  return (
    <Band tone="accent" id="brief" label="Start a brief">
      <View style={{ gap: L.fl(40, 28) }}>
        <Eyebrow square={color.ink}>{brief.eyebrow}</Eyebrow>
        <Display level={2} size={fitLines(brief.title, L.inner, L.fl(160, 72), -0.01)} lh={0.86} ls={-0.01}>
          {brief.title}
        </Display>
        <Serif size={L.fl(30, 21)} lh={1.2} maxCh={40}>
          {brief.body}
        </Serif>
        <View style={styles.ctas}>
          <Btn href={brief.primary.href} label={brief.primary.label} shadow="ink" />
          <Btn href={brief.secondary.href} label={brief.secondary.label} variant="outline" shadow="ink" dismissTo />
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 },
});
