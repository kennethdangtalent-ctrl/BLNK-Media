import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Band } from '@/components/Band';
import { CaseCover } from '@/components/CaseCover';
import { Grid } from '@/components/Grid';
import { A } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { cases, type CaseStudy } from '@/content/business';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

const CARD_BORDER = 2;

/** Hand-set angles, one per cover, so the rack reads as magazines pinned to a board. */
const TILTS = [-2, 1.5, -1.25];

/**
 * Case studies as a rack of BLNK magazine covers. Each cover links to its own story page
 * (/cases/<slug>). Three across from tablet up, one per row on phone.
 */
export function Cases() {
  const L = useLayout();
  const cols = L.isPhone ? 1 : 3;
  const gap = L.isDesktop ? Math.round(32 * L.s) : L.isTablet ? 20 : 28;
  const pad = L.isTablet ? 16 : L.fl(28, 20);
  const coverW = (L.inner - (cols - 1) * gap) / cols;
  // One brand size across the rack, so the covers read as a set.
  const brandSize = Math.min(...cases.items.map((item) => fitWords(item.brand, coverW - 2 * (pad + CARD_BORDER), L.fl(96, 64), -0.01)));
  // Portrait, like a real cover: roughly 3:4 once the picture panel fills the middle.
  const minHeight = Math.round(coverW * 1.38);

  return (
    <Band tone="dark" id="cases" label="Case studies">
      <View style={{ gap: L.fl(64, 40) }}>
        <View style={{ gap: 12 }}>
          <Display level={2} size={fitWords(cases.head.title, L.inner, L.fl(80, 44), -0.03)} lh={0.92} upper={false}>
            {cases.head.title}
          </Display>
          <Deck size={L.fl(22, 18)} lh={1.3} color={color.greyOnBrand}>
            {cases.head.dek}
          </Deck>
        </View>
        <Grid cols={cols} gap={gap} rowGap={40}>
          {cases.items.map((item, i) => (
            <CoverLink key={item.slug} item={item} index={i} brandSize={brandSize} pad={pad} minHeight={minHeight} />
          ))}
        </Grid>
      </View>
    </Band>
  );
}

const lift = webStyle<ViewStyle>({ transitionProperty: 'transform, box-shadow', transitionDuration: '150ms', transitionTimingFunction: 'ease' });

function CoverLink({
  item,
  index,
  brandSize,
  pad,
  minHeight,
}: {
  item: CaseStudy;
  index: number;
  brandSize: number;
  pad: number;
  minHeight: number;
}) {
  return (
    <A href={`/cases/${item.slug}`} accessibilityLabel={`Read the case study: ${item.brand} × ${item.creator}`} style={styles.link}>
      {({ hovered, pressed }) => {
        const active = hovered || pressed;
        return (
          <>
            <View
              style={[
                styles.frame,
                // Pinned up at an angle; hover squares it up and lifts it off the board on a soft shadow.
                active
                  ? { transform: [{ translateY: -6 }, { rotate: '0deg' }], boxShadow: '0px 18px 32px rgba(0, 0, 0, 0.45)' }
                  : { transform: [{ translateY: 0 }, { rotate: `${TILTS[index % TILTS.length]}deg` }], boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.3)' },
                lift,
              ]}>
              <CaseCover item={item} index={index} brandSize={brandSize} pad={pad} minHeight={minHeight} />
            </View>
            <Copy size={14} weight={600} color={color.paper} style={active ? styles.underline : null}>
              READ THE STORY →
            </Copy>
          </>
        );
      }}
    </A>
  );
}

const styles = StyleSheet.create({
  link: { gap: 16 },
  frame: { borderWidth: CARD_BORDER, borderColor: color.paper },
  underline: { textDecorationLine: 'underline' },
});
