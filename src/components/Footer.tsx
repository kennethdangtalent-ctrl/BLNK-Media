import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { Band } from './Band';
import { Barcode } from './Barcode';
import { A, ULink } from './Link';
import { useSections } from './Page';
import { Copy } from './Type';
import { Wordmark } from './Wordmark';
import { DOMAIN_URL, ISSUE, footer, mailto } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';

export function Footer({ variant }: { variant: 'home' | 'business' | 'mission' | 'services' | 'apply' | 'contact' | 'legal' | 'case' }) {
  const L = useLayout();
  const sections = useSections();
  const stacked = L.isPhone;
  const onHome = variant === 'home';
  // On Issue 001 the logo scrolls back up instead of reloading the page it is already on.
  const toTop = (event: GestureResponderEvent) => {
    event.preventDefault();
    sections?.scrollToTop();
    return true;
  };
  return (
    <Band tone="ink" role="contentinfo" ruleTop padTop={L.fl(64, 48)} padBottom={40}>
      <View style={styles.wrap}>
        <View style={[styles.top, stacked && styles.topStacked]}>
          <View style={styles.brand}>
            {/* Same behaviour as the masthead logo: the eye opens on hover or press. */}
            <A
              href="/"
              dismissTo={!onHome}
              accessibilityLabel={onHome ? 'BLNK Media, back to top' : 'BLNK Media, back to Issue 001'}
              onPress={onHome ? toTop : undefined}
              style={styles.logo}>
              {({ hovered, pressed }) => <Wordmark size={L.fl(120, 72)} color={color.paper} open={hovered || pressed} />}
            </A>
            <View style={styles.links}>
              <ULink href={DOMAIN_URL} newTab={false} size={14}>
                BLNK.NAME
              </ULink>
              <ULink href={mailto()} size={14}>
                BUSINESS@BLNK.NAME
              </ULink>
              {variant === 'home' ? null : (
                <ULink href="/" dismissTo size={14}>
                  ISSUE 001
                </ULink>
              )}
              {variant === 'business' ? null : (
                <ULink href="/business" size={14}>
                  BUSINESS
                </ULink>
              )}
            </View>
          </View>
          <View style={[styles.colophon, stacked && styles.colophonStacked]}>
            <Barcode color={color.paper} />
            <Copy size={13} weight={600}>
              {`${ISSUE.no} · ${ISSUE.date} · ${ISSUE.domain}`}
            </Copy>
          </View>
        </View>
        <View style={[styles.bottom, stacked && styles.bottomStacked]}>
          <View style={styles.legal}>
            <Copy size={13} color={color.greyOnInk}>
              {footer.copyright}
            </Copy>
            {footer.legal.map((link) => (
              <ULink key={link.label} href={link.href} size={13} newTab={false}>
                {link.label}
              </ULink>
            ))}
          </View>
          <Copy size={13} color={color.greyOnInk} align={stacked ? 'left' : 'right'} style={styles.shrink}>
            {footer.notes[variant]}
          </Copy>
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
  logo: { alignSelf: 'flex-start' },
  links: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 32, rowGap: 12 },
  colophon: { alignItems: 'flex-end', gap: 10 },
  colophonStacked: { alignItems: 'flex-start' },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
    paddingTop: 20,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.ruleOnInk,
  },
  bottomStacked: { flexDirection: 'column', gap: 8 },
  legal: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 20, rowGap: 8 },
  shrink: { flexShrink: 1 },
});
