import { useRouter, type Href } from 'expo-router';
import { useState, type ReactNode } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Icon, type IconName } from './Icons';
import { Copy } from './Type';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';
import { webProps, webStyle } from '@/theme/web';

export type PressState = { hovered: boolean; pressed: boolean };

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/i.test(href);

/** Opens one of the constant URLs from src/content in the system handler. Logs instead of throwing. */
export function openExternal(href: string) {
  Linking.openURL(href).catch((error: unknown) => {
    console.warn(`[BLNK] could not open ${href}`, error);
  });
}

function isModifiedClick(event: GestureResponderEvent) {
  const e = event.nativeEvent as unknown as {
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    button?: number;
  };
  return Boolean(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (typeof e.button === 'number' && e.button !== 0));
}

type AProps = Omit<PressableProps, 'onPress' | 'style' | 'children'> & {
  href: string;
  /** Internal links: go back to the route when it is already in the stack instead of pushing a copy. */
  dismissTo?: boolean;
  /** http(s) links open a new browser tab on web unless this is false. */
  newTab?: boolean;
  /** Runs first. Return true when it handled the press; it must then call preventDefault itself. */
  onPress?: (event: GestureResponderEvent) => boolean | void;
  style?: StyleProp<ViewStyle> | ((state: PressState) => StyleProp<ViewStyle>);
  children: ReactNode | ((state: PressState) => ReactNode);
};

/**
 * One link primitive for every platform. On web it renders a real anchor, so middle-click,
 * copy-link and crawlers work; internal targets are intercepted for in-app navigation.
 * On native, external targets go to the OS and internal ones to the router.
 */
export function A({ href, dismissTo = false, newTab = true, onPress, style, children, ...rest }: AProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const state: PressState = { hovered, pressed };
  const external = isExternal(href);
  const opensTab = newTab && /^https?:/i.test(href);

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress?.(event) === true) return;
    if (external) {
      if (Platform.OS !== 'web') openExternal(href);
      return;
    }
    if (Platform.OS === 'web') {
      if (isModifiedClick(event)) return;
      event.preventDefault();
    }
    if (dismissTo) router.dismissTo(href as Href);
    else router.push(href as Href);
  };

  return (
    <Pressable
      role="link"
      {...rest}
      {...webProps({ href, hrefAttrs: opensTab ? { target: '_blank', rel: 'noopener noreferrer' } : undefined })}
      onPress={handlePress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[styles.pointer, typeof style === 'function' ? style(state) : style]}>
      {typeof children === 'function' ? children(state) : children}
    </Pressable>
  );
}

const scrapMotion = webStyle<ViewStyle>({
  transitionProperty: 'transform, box-shadow',
  transitionDuration: '180ms',
  transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
});

/**
 * A call to action cut from a strip of paper and pasted down a degree off square. Hover or press
 * peels it up: it squares off, rises 3 px and casts a soft shadow onto the page.
 * `solid` is crimson (white on dark or red sections); `outline` is white with a black edge.
 */
export function Btn({
  href,
  label,
  variant = 'solid',
  dismissTo,
  tilt = -1.5,
}: {
  href: string;
  label: string;
  variant?: 'solid' | 'outline';
  /** Accepted for older call sites; scraps lift with a soft shadow, never a hard block. */
  shadow?: 'accent' | 'ink';
  dismissTo?: boolean;
  tilt?: number;
}) {
  const tone = useTone();
  const solid = variant === 'solid';
  // A crimson scrap on the white pages; on any dark or red section the scrap is white with black type.
  const onDark = tone.bg === color.ink || tone.bg === color.brand || tone.bg === color.crimson;
  const scrap = onDark ? color.paper : color.crimson;
  const ink = onDark ? color.ink : color.paper;
  return (
    <A
      href={href}
      dismissTo={dismissTo}
      style={({ hovered, pressed }) => [
        styles.btn,
        solid ? { backgroundColor: scrap } : styles.btnOutline,
        { transform: [{ rotate: `${tilt}deg` }] },
        (hovered || pressed) && { transform: [{ rotate: '0deg' }, { translateY: -3 }], boxShadow: '0px 10px 18px rgba(13, 13, 13, 0.35)' },
        scrapMotion,
      ]}>
      <Copy size={15} weight={600} upper color={solid ? ink : color.ink} style={styles.shrink}>
        {label}
      </Copy>
    </A>
  );
}

/** Underlines ease in and out instead of switching; nothing changes color. */
const lineWeb = webStyle<TextStyle>({
  textDecorationLine: 'underline',
  textDecorationThickness: '2px',
  transitionProperty: 'text-underline-offset, text-decoration-color, opacity',
  transitionDuration: '220ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
});

/** Underlined text link. Hover or press draws the underline in tight under the words. */
export function ULink({
  href,
  children,
  size = 14,
  weight = 600,
  ls = 0,
  dismissTo,
  newTab,
}: {
  href: string;
  children: string;
  size?: number;
  weight?: 400 | 600;
  ls?: number;
  dismissTo?: boolean;
  newTab?: boolean;
}) {
  const tone = useTone();
  return (
    <A href={href} dismissTo={dismissTo} newTab={newTab} style={styles.inline}>
      {({ hovered, pressed }) => (
        <Copy
          size={size}
          weight={weight}
          ls={ls}
          color={tone.fg}
          style={[styles.underline, lineWeb, offset(hovered || pressed ? '0.08em' : '0.24em'), { textDecorationColor: tone.fg }]}>
          {children}
        </Copy>
      )}
    </A>
  );
}

/**
 * Masthead navigation item. An underline fades in on hover; the current page keeps it.
 * Same ink throughout, no fills.
 */
export function NavLink({
  href,
  label,
  current = false,
  dismissTo,
  onPress,
}: {
  href: string;
  label: string;
  current?: boolean;
  dismissTo?: boolean;
  onPress?: (event: GestureResponderEvent) => boolean | void;
}) {
  return (
    <A href={href} dismissTo={dismissTo} onPress={onPress} {...webProps(current ? { 'aria-current': 'page' } : {})}>
      {({ hovered, pressed }) => {
        const on = current || hovered || pressed;
        return (
          <Copy
            size={14}
            weight={600}
            upper
            color={color.ink}
            style={[styles.navItem, styles.underline, lineWeb, offset(on ? '0.3em' : '0.5em'), { textDecorationColor: on ? color.ink : 'transparent' }]}>
            {label}
          </Copy>
        );
      }}
    </A>
  );
}

const offsets = new Map<string, TextStyle | undefined>();
function offset(value: string): TextStyle | undefined {
  if (!offsets.has(value)) offsets.set(value, webStyle<TextStyle>({ textUnderlineOffset: value }));
  return offsets.get(value);
}

const chipMotion = webStyle<ViewStyle>({ transitionProperty: 'opacity', transitionDuration: '220ms' });

/** 34 px social chip. Without `href` it renders as a muted placeholder, e.g. "YOUTUBE [LINK]". Hover softens it. */
export function Chip({
  label,
  href,
  icon,
  a11yLabel,
  placeholder = false,
  dashed = false,
}: {
  label: string;
  href?: string;
  icon?: IconName;
  a11yLabel?: string;
  placeholder?: boolean;
  dashed?: boolean;
}) {
  const tone = useTone();
  const tint = placeholder ? tone.mute : tone.fg;
  const content = (
    <>
      {icon ? <Icon name={icon} size={16} color={tint} /> : null}
      <Copy size={12} weight={600} upper color={tint}>
        {label}
      </Copy>
    </>
  );
  if (!href) {
    return <View style={[styles.chip, { borderColor: tint, borderStyle: dashed ? 'dashed' : 'solid' }]}>{content}</View>;
  }
  return (
    <A
      href={href}
      accessibilityLabel={a11yLabel}
      style={({ hovered, pressed }) => [styles.chip, { borderColor: tone.fg }, (hovered || pressed) && styles.chipHot, chipMotion]}>
      {content}
    </A>
  );
}
const styles = StyleSheet.create({
  pointer: { cursor: 'pointer' },
  btn: {
    minHeight: 56,
    paddingHorizontal: 26,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  btnOutline: { backgroundColor: color.paper, borderWidth: 2.5, borderColor: color.ink },
  shrink: { flexShrink: 1 },
  inline: { alignSelf: 'flex-start', maxWidth: '100%' },
  underline: { textDecorationLine: 'underline' },
  navItem: { paddingHorizontal: 4, paddingVertical: 2 },
  chip: {
    height: 34,
    paddingHorizontal: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipHot: { opacity: 0.6 },
});