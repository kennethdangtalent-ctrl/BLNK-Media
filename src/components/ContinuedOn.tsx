import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Band } from './Band';
import { Grid } from './Grid';
import { A } from './Link';
import { Copy, Display } from './Type';
import { continueTo, pages } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

const TILTS = [-0.8, 0.6, -0.5];

/**
 * The magazine's "continued on" line, set big: three pages to turn to next, each a white card
 * with its page number. Sits at the end of every page, just above the footer, so a reader who
 * reaches the bottom always has somewhere to go.
 */
export function ContinuedOn({ from }: { from: keyof typeof continueTo }) {
  const L = useLayout();
  return (
    <Band tone="stock" label="Continued on" padTop={L.fl(72, 48)} padBottom={L.fl(80, 56)}>
      <View style={{ gap: L.fl(28, 20) }}>
        <View style={styles.head}>
          <Copy size={13} weight={600} upper>
            Continued on
          </Copy>
          <View style={styles.rule} />
        </View>
        <Grid cols={L.isPhone ? 1 : 3} gap={L.fl(28, 16)} rowGap={16}>
          {continueTo[from].map((id, i) => {
            const page = pages[id];
            return (
              <A
                key={id}
                href={page.href}
                accessibilityLabel={`${page.title}: ${page.line}`}
                style={({ hovered, pressed }) => [
                  styles.card,
                  { transform: [{ rotate: hovered || pressed ? '0deg' : `${TILTS[i % TILTS.length]}deg` }, { translateY: hovered || pressed ? -4 : 0 }] },
                  (hovered || pressed) && styles.cardLift,
                  cardMotion,
                ]}>
                {({ hovered, pressed }) => (
                  <>
                    <View style={styles.cardTop}>
                      <Copy size={12} weight={600} upper color={color.crimson}>
                        {`p. ${page.no}`}
                      </Copy>
                      <Copy size={18} weight={600} color={hovered || pressed ? color.crimson : color.ink}>
                        →
                      </Copy>
                    </View>
                    <Display size={L.fl(32, 26)} lh={1} upper={false} color={color.ink}>
                      {page.title}
                    </Display>
                    <Copy size={15} lh={1.45} color={color.greyOnPaper}>
                      {page.line}
                    </Copy>
                  </>
                )}
              </A>
            );
          })}
        </Grid>
      </View>
    </Band>
  );
}

const cardMotion = webStyle<ViewStyle>({ transitionProperty: 'transform, box-shadow', transitionDuration: '180ms' });

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  rule: { flex: 1, height: 2, backgroundColor: color.ink },
  card: {
    backgroundColor: color.paper,
    height: '100%',
    padding: 22,
    gap: 10,
    boxShadow: '0px 1px 2px rgba(13, 13, 13, 0.08), 0px 8px 18px rgba(13, 13, 13, 0.12)',
  } as ViewStyle,
  cardLift: { boxShadow: '0px 14px 26px rgba(13, 13, 13, 0.22)' } as ViewStyle,
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
