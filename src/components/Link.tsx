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
import { Mono } from './Type';
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

const btnMotion = webStyle<ViewStyle>({
  transitionProperty: 'transform, box-shadow',
  transitionDuration: '120ms, 150ms',
  transitionTimingFunction: 'ease',
});

/** 56 px block button. Hover and press lift it 3 px onto a hard 5 px shadow, as on the board. */
export function Btn({
  href,
  label,
  variant = 'solid',
  shadow = 'accent',
  dismissTo,
}: {
  href: string;
  label: string;
  variant?: 'solid' | 'outline';
  shadow?: 'accent' | 'ink';
  dismissTo?: boolean;
}) {
  const lift = shadow === 'accent' ? color.accent : color.ink;
  return (
    <A
      href={href}
      dismissTo={dismissTo}
      style={({ hovered, pressed }) => [
        styles.btn,
        variant === 'solid' ? styles.btnSolid : styles.btnOutline,
        (hovered || pressed) && { transform: [{ translateX: -3 }, { translateY: -3 }], boxShadow: `5px 5px 0px ${lift}` },
        btnMotion,
      ]}>
      <Mono size={13} weight={600} ls={0.16} color={variant === 'solid' ? color.paper : color.ink} style={styles.shrink}>
        {label}
      </Mono>
    </A>
  );
}

const underlineWeb = webStyle<TextStyle>({
  textUnderlineOffset: '5px',
  textDecorationThickness: '2px',
  transitionProperty: 'color, text-decoration-color',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease',
});

/** Underlined text link; text and underline turn accent on hover or press. */
export function ULink({
  href,
  children,
  size = 12,
  weight = 600,
  ls = 0.14,
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
      {({ hovered, pressed }) => {
        const tint = hovered || pressed ? color.accent : tone.fg;
        return (
          <Mono
            size={size}
            weight={weight}
            ls={ls}
            color={tint}
            style={[styles.underline, { textDecorationColor: tint }, underlineWeb]}>
            {children}
          </Mono>
        );
      }}
    </A>
  );
}

/** Masthead navigation item. `current` draws the board's 3 px accent underline. */
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
      {({ hovered, pressed }) => (
        <View>
          <Mono size={13} weight={600} ls={0.16} color={hovered || pressed ? color.accent : color.ink}>
            {label}
          </Mono>
          {current ? <View style={styles.current} /> : null}
        </View>
      )}
    </A>
  );
}

const chipMotion = webStyle<ViewStyle>({ transitionProperty: 'border-color', transitionDuration: '150ms' });

/** 32 px social chip. Without `href` it renders as a muted placeholder, e.g. "YOUTUBE [LINK]". */
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
      <Mono size={11} weight={600} ls={0.14} color={tint}>
        {label}
      </Mono>
    </>
  );
  if (!href) {
    return <View style={[styles.chip, { borderColor: tone.hair, borderStyle: dashed ? 'dashed' : 'solid' }]}>{content}</View>;
  }
  return (
    <A
      href={href}
      accessibilityLabel={a11yLabel}
      style={({ hovered, pressed }) => [styles.chip, { borderColor: hovered || pressed ? color.accent : tone.hair }, chipMotion]}>
      {content}
    </A>
  );
}

const styles = StyleSheet.create({
  pointer: { cursor: 'pointer' },
  btn: {
    minHeight: 56,
    paddingHorizontal: 28,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  btnSolid: { backgroundColor: color.ink },
  btnOutline: { borderWidth: 3, borderColor: color.ink },
  shrink: { flexShrink: 1 },
  inline: { alignSelf: 'flex-start', maxWidth: '100%' },
  underline: { textDecorationLine: 'underline' },
  current: { position: 'absolute', left: 0, right: 0, bottom: -4, height: 3, backgroundColor: color.accent },
  chip: {
    height: 32,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
