import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { AccessibilityInfo, Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOARD_W } from './tokens';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

export type Insets = { top: number; right: number; bottom: number; left: number };

export type Layout = {
  width: number;
  bp: Breakpoint;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** Horizontal page padding: 20 / 40 / 64, plus the larger side safe-area inset on native. */
  gutter: number;
  /** Content width inside the frame: min(width, 1440) minus both gutters. */
  inner: number;
  /** Scale for the board's fixed desktop measurements (480 px photo column and so on). 1 below desktop. */
  s: number;
  /** Size that runs linearly from `phone` at 375 px wide to `desktop` at 1440 px, clamped at both ends. */
  fl: (desktop: number, phone: number) => number;
  /** False on web until the first client render has committed; true on native. */
  hydrated: boolean;
  reduceMotion: boolean;
  insets: Insets;
};

const PHONE_MAX = 767;
const TABLET_MAX = 1099;
const FLUID_FROM = 375;

export function computeLayout(rawWidth: number, hydrated: boolean, insets: Insets): Omit<Layout, 'reduceMotion'> {
  const width = Math.max(320, Math.round(rawWidth));
  const bp: Breakpoint = width <= PHONE_MAX ? 'phone' : width <= TABLET_MAX ? 'tablet' : 'desktop';
  const side = Math.max(insets.left, insets.right);
  const gutter = (bp === 'phone' ? 20 : bp === 'tablet' ? 40 : 64) + side;
  const inner = Math.min(width, BOARD_W) - 2 * gutter;
  const s = bp === 'desktop' ? Math.min(1, width / BOARD_W) : 1;
  const t = Math.min(1, Math.max(0, (width - FLUID_FROM) / (BOARD_W - FLUID_FROM)));
  const fl = (desktop: number, phone: number) => Math.round(phone + (desktop - phone) * t);
  return {
    width,
    bp,
    isPhone: bp === 'phone',
    isTablet: bp === 'tablet',
    isDesktop: bp === 'desktop',
    gutter,
    inner,
    s,
    fl,
    hydrated,
    insets,
  };
}

const noSubscription = () => () => {};

/**
 * Static web HTML is rendered in Node at width 0. React hydrates with the server snapshot
 * (false), so the first client render uses the board width and matches the server markup,
 * then re-renders once with the client snapshot (true). Native has no server render.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function useReduceMotionWeb(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

function useReduceMotionNative(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active) setReduceMotion(enabled);
      })
      .catch((error: unknown) => {
        console.warn('[BLNK] could not read the Reduce Motion setting; motion stays on', error);
      });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return reduceMotion;
}

/** Platform is fixed at build time, so each build calls exactly one of these hooks. */
const useReduceMotion = Platform.OS === 'web' ? useReduceMotionWeb : useReduceMotionNative;

const LayoutContext = createContext<Layout | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const screen = useWindowDimensions();
  const safe = useSafeAreaInsets();
  const hydrated = useHydrated();
  const reduceMotion = useReduceMotion();
  const width = hydrated && screen.width > 0 ? screen.width : BOARD_W;
  const onWeb = Platform.OS === 'web';
  const top = onWeb ? 0 : safe.top;
  const right = onWeb ? 0 : safe.right;
  const bottom = onWeb ? 0 : safe.bottom;
  const left = onWeb ? 0 : safe.left;

  const value = useMemo<Layout>(
    () => ({ ...computeLayout(width, hydrated, { top, right, bottom, left }), reduceMotion }),
    [width, hydrated, top, right, bottom, left, reduceMotion],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout(): Layout {
  const layout = useContext(LayoutContext);
  if (!layout) throw new Error('useLayout() must be called inside <LayoutProvider>.');
  return layout;
}
