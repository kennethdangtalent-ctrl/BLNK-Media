import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';

import { BlinkIntro } from '@/components/BlinkIntro';
import { CookieNotice } from '@/components/CookieNotice';
import { LayoutProvider, useLayout } from '@/theme/layout';
import { color, fontSources } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fontSources);

  useEffect(() => {
    if (error) console.warn('[BLNK] fonts failed to load; falling back to platform fonts', error);
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  useEffect(() => {
    // Routes swap in place on web, so browser scroll restoration would restore a stale offset.
    if (Platform.OS === 'web' && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  if (!loaded && !error) return null;

  return (
    <LayoutProvider>
      <Shell>
        {Platform.OS === 'web' ? (
          <Slot />
        ) : (
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.paper } }} />
        )}
        <CookieNotice />
        <BlinkIntro />
      </Shell>
      <StatusBar style="dark" />
    </LayoutProvider>
  );
}

const fadeIn = webStyle<ViewStyle>({ transitionProperty: 'opacity', transitionDuration: '240ms', transitionTimingFunction: 'ease-out' });

/**
 * The static HTML is laid out for the 1440 px board. It stays invisible until the client has
 * hydrated and re-laid out for the real width, so phones never flash the desktop composition.
 */
function Shell({ children }: { children: ReactNode }) {
  const { hydrated } = useLayout();
  return <View style={[styles.shell, Platform.OS === 'web' && { opacity: hydrated ? 1 : 0 }, fadeIn]}>{children}</View>;
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: color.paper },
});
