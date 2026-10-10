import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Band } from '@/components/Band';
import { CaseCover } from '@/components/CaseCover';
import { Grid } from '@/components/Grid';
import { A } from '@/components/Link';
import { SectionHead } from '@/components/SectionHead';
import { Copy } from '@/components/Type';
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
        <SectionHead eyebrow={cases.head.eyebrow} title={cases.head.title} dek={cases.head.dek} />
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
                // Pinned up at an angle on a hard shadow; hover squares it up and lifts it onto the accent.
                active
                  ? { transform: [{ translateX: -4 }, { translateY: -4 }, { rotate: '0deg' }], boxShadow: `10px 10px 0px ${color.accent}` }
                  : { transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: `${TILTS[index % TILTS.length]}deg` }], boxShadow: `8px 8px 0px ${color.ruleOnInk}` },
                lift,
              ]}>
              <CaseCover item={item} index={index} brandSize={brandSize} pad={pad} minHeight={minHeight} />
            </View>
            <Copy size={12} weight={600} ls={0.16} color={active ? color.accent : color.paper}>
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
});
