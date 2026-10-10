import { useSyncExternalStore } from 'react';
import { Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Frame } from './Band';
import { ULink } from './Link';
import { Mono } from './Type';
import { cookieNotice } from '@/content/legal';
import { useLayout } from '@/theme/layout';
import { ToneProvider } from '@/theme/tone';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

const CHANGE = 'blnk:cookie-notice';

/** Storage can be blocked (private windows, strict settings); treat that as "not dismissed" and never throw. */
function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(cookieNotice.storageKey) === '1';
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function dismiss() {
  try {
    window.localStorage.setItem(cookieNotice.storageKey, '1');
  } catch {
    // Storage blocked: the notice closes for this visit only.
    (window as unknown as Record<string, boolean>).__blnkCookieNoticeClosed = true;
  }
  window.dispatchEvent(new Event(CHANGE));
}

function useDismissed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => readDismissed() || Boolean((window as unknown as Record<string, boolean>).__blnkCookieNoticeClosed),
    // The static HTML never includes the notice, so hydration matches; it appears on the client if needed.
    () => true,
  );
}

const fixedBottom = webStyle<ViewStyle>({ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 50 });

/**
 * A slim bar at the bottom of the web page. The site sets no cookies, so this is a notice
 * rather than a consent prompt: it says so, links to the policy, and stays closed once dismissed.
 * Native apps have no cookies, so nothing renders there.
 */
export function CookieNotice() {
  if (Platform.OS !== 'web') return null;
  return <WebCookieNotice />;
}

function WebCookieNotice() {
  const L = useLayout();
  const dismissed = useDismissed();
  if (!L.hydrated || dismissed) return null;
  return (
    <ToneProvider tone="dark">
      <View role="region" aria-label="Cookie notice" style={[styles.bar, fixedBottom]}>
        <Frame>
          <View style={[styles.row, L.isPhone && styles.rowStacked]}>
            <View style={styles.copy}>
              <Mono size={13} lh={1.5} color={color.paper} style={styles.shrink}>
                {cookieNotice.text}
              </Mono>
              <ULink href={cookieNotice.link.href} size={11} ls={0.14} newTab={false}>
                {cookieNotice.link.label}
              </ULink>
            </View>
            <Pressable
              role="button"
              accessibilityLabel="Dismiss cookie notice"
              onPress={dismiss}
              style={({ pressed }) => [styles.button, pressed && styles.buttonActive]}>
              <Mono size={12} weight={600} ls={0.16} color={color.ink}>
                {cookieNotice.dismiss}
              </Mono>
            </Pressable>
          </View>
        </Frame>
      </View>
    </ToneProvider>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: color.ink, borderTopWidth: 3, borderColor: color.accent, paddingVertical: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 },
  rowStacked: { flexDirection: 'column', alignItems: 'flex-start', gap: 14 },
  copy: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 16, rowGap: 6, flexShrink: 1 },
  shrink: { flexShrink: 1 },
  button: { minHeight: 44, paddingHorizontal: 22, justifyContent: 'center', backgroundColor: color.paper, cursor: 'pointer' },
  buttonActive: { backgroundColor: color.accent },
});
