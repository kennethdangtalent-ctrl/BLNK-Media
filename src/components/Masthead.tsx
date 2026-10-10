import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { Frame } from './Band';
import { A, NavLink } from './Link';
import { Badge } from './Marks';
import { useSections } from './Page';
import { Mono } from './Type';
import { Wordmark } from './Wordmark';
import { masthead } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { ToneProvider } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Current = 'home' | 'business' | 'mission' | 'other';

/** Nav items in order. `section` items are bands on Issue 001; `route` items are pages of their own. */
const NAV = [
  { kind: 'section', id: 'roster', label: 'ROSTER' },
  { kind: 'route', id: 'mission', label: 'MISSION', href: '/mission' },
  { kind: 'section', id: 'apply', label: 'APPLY' },
  { kind: 'route', id: 'business', label: 'BUSINESS', href: '/business' },
] as const;

/**
 * 72 px masthead on desktop: logo, section nav, issue line and badge in one row. Below
 * desktop the nav drops to its own row under a hairline.
 */
export function Masthead({ current }: { current: Current }) {
  const L = useLayout();
  const sections = useSections();
  const onHome = current === 'home';
  const copy = current === 'business' || current === 'mission' ? masthead[current] : masthead.home;

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
      {({ hovered, pressed }) => {
        const tint = hovered || pressed ? color.accent : color.ink;
        return (
          <>
            {/* On hover the letters take the accent and the blink flips to ink, so the mark stays visible. */}
            <Wordmark size={40} color={tint} markColor={hovered || pressed ? color.ink : color.accent} open={hovered || pressed} />
            <Mono size={11} weight={600} ls={0.2} color={tint}>
              MEDIA
            </Mono>
          </>
        );
      }}
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
            key={item.id}
            label={item.label}
            href={`/?s=${item.id}`}
            dismissTo={!onHome}
            onPress={onHome ? stay(() => sections?.scrollTo(item.id)) : undefined}
          />
        ) : (
          <NavLink
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
        <Mono size={12} ls={0.08}>
          {copy.issue}
        </Mono>
      )}
      <Badge label={copy.badge} />
    </View>
  );

  return (
    <ToneProvider tone="light">
      <View role="banner" style={styles.bar}>
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
  bar: { backgroundColor: color.paper, borderBottomWidth: 3, borderColor: color.ink },
  rowDesktop: { height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 },
  rowTop: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  rowNav: { height: 48, justifyContent: 'center', borderTopWidth: 1, borderColor: color.ink },
  logo: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  nav: { flexDirection: 'row', alignItems: 'center' },
  navSpread: { justifyContent: 'space-between' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 20 },
});
