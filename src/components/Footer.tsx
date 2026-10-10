import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { Band } from './Band';
import { Barcode } from './Barcode';
import { A, ULink } from './Link';
import { useSections } from './Page';
import { Mono } from './Type';
import { Wordmark } from './Wordmark';
import { DOMAIN_URL, ISSUE, footer, mailto } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';

export function Footer({ variant }: { variant: 'home' | 'business' | 'mission' | 'legal' | 'case' }) {
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
    <Band tone="light" role="contentinfo" ruleTop padTop={L.fl(64, 48)} padBottom={40}>
      <View style={styles.wrap}>
        <View style={[styles.top, stacked && styles.topStacked]}>
          <View style={styles.brand}>
            {/* Same behaviour as the masthead logo: shut at rest, open on hover or press. */}
            <A
              href="/"
              dismissTo={!onHome}
              accessibilityLabel={onHome ? 'BLNK Media, back to top' : 'BLNK Media, back to Issue 001'}
              onPress={onHome ? toTop : undefined}
              style={styles.logo}>
              {({ hovered, pressed }) => {
                const active = hovered || pressed;
                return (
                  <Wordmark
                    size={L.fl(128, 88)}
                    color={active ? color.accent : color.ink}
                    markColor={active ? color.ink : color.accent}
                    open={active}
                  />
                );
              }}
            </A>
            <View style={styles.links}>
              <ULink href={DOMAIN_URL} newTab={false} size={13} ls={0.12}>
                BLNK.NAME
              </ULink>
              <ULink href={mailto()} size={13} ls={0.12}>
                BUSINESS@BLNK.NAME
              </ULink>
              {variant === 'home' ? null : (
                <ULink href="/" dismissTo size={13} ls={0.12}>
                  ISSUE 001
                </ULink>
              )}
              {variant === 'business' ? null : (
                <ULink href="/business" size={13} ls={0.12}>
                  BUSINESS
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
          <View style={styles.legal}>
            <Mono size={11} ls={0.06} color={color.muteOnPaper}>
              {footer.copyright}
            </Mono>
            {footer.legal.map((link) => (
              <ULink key={link.label} href={link.href} size={11} ls={0.12} newTab={false}>
                {link.label}
              </ULink>
            ))}
          </View>
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
  logo: { alignSelf: 'flex-start' },
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
  legal: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 20, rowGap: 8 },
  shrink: { flexShrink: 1 },
});
