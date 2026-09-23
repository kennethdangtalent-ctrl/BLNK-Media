import { StyleSheet, View } from 'react-native';

import { Band } from './Band';
import { Barcode } from './Barcode';
import { ULink } from './Link';
import { Display, Mono } from './Type';
import { DOMAIN_URL, ISSUE, footer, mailto } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';

export function Footer({ variant }: { variant: 'home' | 'business' }) {
  const L = useLayout();
  const stacked = L.isPhone;
  return (
    <Band tone="light" role="contentinfo" ruleTop padTop={L.fl(64, 48)} padBottom={40}>
      <View style={styles.wrap}>
        <View style={[styles.top, stacked && styles.topStacked]}>
          <View style={styles.brand}>
            <Display size={L.fl(128, 88)} lh={0.8} ls={0.01} upper={false}>
              BLNK
            </Display>
            <View style={styles.links}>
              <ULink href={DOMAIN_URL} newTab={false} size={13} ls={0.12}>
                BLNK.NAME
              </ULink>
              <ULink href={mailto()} size={13} ls={0.12}>
                BUSINESS@BLNK.NAME
              </ULink>
              {variant === 'home' ? (
                <ULink href="/business" size={13} ls={0.12}>
                  BUSINESS
                </ULink>
              ) : (
                <ULink href="/" dismissTo size={13} ls={0.12}>
                  ISSUE 001
                </ULink>
              )}
            </View>
          </View>
          <View style={[styles.colophon, stacked && styles.colophonStacked]}>
            <Barcode />
            <Mono size={11} weight={600} ls={0.16}>
              {`${ISSUE.no} · ${ISSUE.date} · ${ISSUE.domain}`}
            </Mono>
          </View>
        </View>
        <View style={[styles.bottom, stacked && styles.bottomStacked]}>
          <Mono size={11} ls={0.06} color={color.muteOnPaper}>
            {footer.copyright}
          </Mono>
          <Mono size={11} ls={0.06} color={color.muteOnPaper} align={stacked ? 'left' : 'right'} style={styles.shrink}>
            {footer.notes[variant]}
          </Mono>
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 32 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 48 },
  topStacked: { flexDirection: 'column', alignItems: 'flex-start', gap: 32 },
  brand: { gap: 16, flexShrink: 1 },
  links: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 32, rowGap: 12 },
  colophon: { alignItems: 'flex-end', gap: 10 },
  colophonStacked: { alignItems: 'flex-start' },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: color.hairOnPaper,
  },
  bottomStacked: { flexDirection: 'column', gap: 8 },
  shrink: { flexShrink: 1 },
});
