import { useFocusEffect, useRouter } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { useLayout } from '@/theme/layout';
import { color } from '@/theme/tokens';

export type SectionsApi = {
  /** Native: a band reports its y inside <Main>. Web reads positions from the DOM instead. */
  register(id: string, y: number): void;
  /** Native: <Main> reports its own y inside the scroll content. */
  setBase(y: number): void;
  scrollTo(id: string, animated?: boolean): void;
  scrollToTop(animated?: boolean): void;
  /** Re-applies a pending jump after the layout moved (hydration, resize, late layout). */
  settle(): void;
  /** Scrolls to `id` now and keeps it there while the layout settles. */
  jump(id: string): void;
};

const SectionsContext = createContext<SectionsApi | null>(null);

export function useSections(): SectionsApi | null {
  return useContext(SectionsContext);
}

/** How long a jump keeps re-aligning while fonts, hydration and late layout move content. */
const SETTLE_MS = 1500;

/**
 * Page shell. On web the document scrolls (no inner scroller), which keeps browser toolbar
 * collapse, `#anchor` jumps and normal scrolling. On native a ScrollView sits under a
 * paper-colored status bar spacer. Handles `?s=<section>` and `#section` targets on focus.
 */
export function Page({ children, section }: { children: ReactNode; section?: string }) {
  const L = useLayout();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef(new Map<string, number>());
  const base = useRef(0);
  const pending = useRef<{ id: string; until: number } | null>(null);
  const reduceMotion = useRef(L.reduceMotion);

  useEffect(() => {
    reduceMotion.current = L.reduceMotion;
  }, [L.reduceMotion]);

  const api = useMemo<SectionsApi>(() => {
    const scrollToY = (y: number, animated: boolean) => {
      const top = Math.max(0, Math.round(y));
      if (Platform.OS === 'web') window.scrollTo({ top, behavior: animated ? 'smooth' : 'auto' });
      else scrollRef.current?.scrollTo({ y: top, animated });
    };

    const targetY = (id: string): number | null => {
      if (Platform.OS === 'web') {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top + window.scrollY : null;
      }
      const y = offsets.current.get(id);
      return y == null ? null : base.current + y;
    };

    const settle = () => {
      const target = pending.current;
      if (!target) return;
      if (Date.now() > target.until) {
        pending.current = null;
        return;
      }
      const y = targetY(target.id);
      if (y != null) scrollToY(y, false);
    };

    return {
      register(id, y) {
        offsets.current.set(id, y);
        if (pending.current?.id === id) settle();
      },
      setBase(y) {
        base.current = y;
        settle();
      },
      scrollTo(id, animated = !reduceMotion.current) {
        pending.current = null;
        const y = targetY(id);
        if (y == null) {
          pending.current = { id, until: Date.now() + SETTLE_MS };
          return;
        }
        scrollToY(y, animated);
      },
      scrollToTop(animated = !reduceMotion.current) {
        pending.current = null;
        scrollToY(0, animated);
      },
      settle,
      jump(id) {
        pending.current = { id, until: Date.now() + SETTLE_MS };
        settle();
      },
    };
  }, []);

  // Hydration swaps the 1440 px server layout for the real width, which moves every section.
  useEffect(() => {
    api.settle();
  }, [api, L.width, L.hydrated]);

  useFocusEffect(
    useCallback(() => {
      const hash = Platform.OS === 'web' ? window.location.hash.replace(/^#/, '') : '';
      const target = section || hash;
      if (target) {
        api.jump(target);
        // Native keeps this screen mounted under the stack; clear the one-shot target so going
        // back to it later does not jump again.
        if (Platform.OS !== 'web' && section) router.setParams({ s: undefined });
      } else if (Platform.OS === 'web') {
        window.scrollTo(0, 0);
      }
    }, [api, router, section]),
  );

  const content = <SectionsContext.Provider value={api}>{children}</SectionsContext.Provider>;

  if (Platform.OS === 'web') return <View style={styles.web}>{content}</View>;

  return (
    <View style={styles.native}>
      <View style={{ height: L.insets.top, backgroundColor: color.paper }} />
      <ScrollView ref={scrollRef} style={styles.native} contentContainerStyle={{ paddingBottom: L.insets.bottom }}>
        {content}
      </ScrollView>
    </View>
  );
}

/** The page's main landmark. Its offset is the origin for native section targets. */
export function Main({ children }: { children: ReactNode }) {
  const sections = useSections();
  return (
    <View role="main" onLayout={(event) => sections?.setBase(event.nativeEvent.layout.y)}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  web: { flexGrow: 1, backgroundColor: color.paper },
  native: { flex: 1, backgroundColor: color.paper },
});
