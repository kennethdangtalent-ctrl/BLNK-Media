import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { Frame } from './Band';
import { Crumple } from './Crumple';
import { A, NavLink } from './Link';
import { Stamp } from './Marks';
import { useSections } from './Page';
import { Copy } from './Type';
import { Wordmark } from './Wordmark';
import { masthead } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { ToneProvider } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Current = 'home' | 'business' | 'mission' | 'services' | 'apply' | 'other';

/** Nav items in order. `section` items are bands on Issue 001; `route` items are pages of their own. */
const NAV = [
  { kind: 'section', id: 'roster', label: 'ROSTER' },
  { kind: 'route', id: 'mission', label: 'MISSION', href: '/mission' },
  { kind: 'route', id: 'business', label: 'BUSINESS', href: '/business' },
  { kind: 'route', id: 'services', label: 'SERVICES', href: '/services' },
  { kind: 'route', id: 'apply', label: 'APPLY', href: '/apply' },
] as const;

/**
 * 72 px masthead on desktop: logo, section nav, issue line and badge in one row. Below
 * desktop the nav drops to its own row under a hairline.
 */
export function Masthead({ current }: { current: Current }) {
  const L = useLayout();
  const sections = useSections();
  const onHome = current === 'home';
  const copy = current === 'business' || current === 'mission' || current === 'services' || current === 'apply' ? masthead[current] : masthead.home;

  const stay = (action: () => void) => (event: GestureResponderEvent) => {
    event.preventDefault();
    action();
    return true;
  };

  const logo = (
    <A
      href="/"
      dismissTo={!onHome}
      accessibilityLabel={onHome ? 'BLNK Media, back to top' : 'BLNK Media, back to Issue 001'}
      onPress={onHome ? stay(() => sections?.scrollToTop()) : undefined}
      style={styles.logo}>
      {({ hovered, pressed }) => (
        <>
          <Wordmark size={L.isPhone ? 30 : 36} open={hovered || pressed} />
          <Copy size={13} weight={600} upper color={color.ink}>
            Media
          </Copy>
        </>
      )}
    </A>
  );

  const nav = (
    <View
      role="navigation"
      aria-label="Sections"
      style={[styles.nav, L.isPhone ? styles.navSpread : { columnGap: L.isDesktop ? 40 : 32 }]}>
      {NAV.map((item) =>
        item.kind === 'section' ? (
          <NavLink
            size={L.isPhone ? 12 : 14}
            key={item.id}
            label={item.label}
            href={`/?s=${item.id}`}
            dismissTo={!onHome}
            onPress={onHome ? stay(() => sections?.scrollTo(item.id)) : undefined}
          />
        ) : (
          <NavLink
            size={L.isPhone ? 12 : 14}
            key={item.id}
            label={item.label}
            href={item.href}
            current={current === item.id}
            onPress={current === item.id ? stay(() => sections?.scrollToTop()) : undefined}
          />
        ),
      )}
    </View>
  );

  const meta = (
    <View style={styles.meta}>
      {L.isPhone ? null : (
        <Copy size={13} weight={600} upper>
          {copy.issue}
        </Copy>
      )}
      <Stamp label={copy.badge} tilt={-2} tint={color.crimson} pop />
    </View>
  );

  return (
    <ToneProvider tone="stock">
      <View role="banner" style={styles.bar}>
        <Crumple />
        <Frame>
          {L.isDesktop ? (
            <View style={styles.rowDesktop}>
              {logo}
              {nav}
              {meta}
            </View>
          ) : (
            <>
              <View style={styles.rowTop}>
                {logo}
                {meta}
              </View>
              <View style={styles.rowNav}>{nav}</View>
            </>
          )}
        </Frame>
      </View>
    </ToneProvider>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: color.stock },
  rowDesktop: { height: 84, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 },
  rowTop: { height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  rowNav: { height: 48, justifyContent: 'center', borderTopWidth: 2, borderColor: color.ink, borderStyle: 'dashed' },
  logo: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  nav: { flexDirection: 'row', alignItems: 'center' },
  navSpread: { justifyContent: 'space-between' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 20 },
});
