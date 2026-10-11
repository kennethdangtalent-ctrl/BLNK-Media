import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type TextStyle, type ViewStyle } from 'react-native';

import { A } from './Link';
import { Copy } from './Type';
import { contactHref } from '@/content/contact';
import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/** The two ways to apply: creators to the roster, brands to a brief. */
const ITEMS = [
  { label: 'For creators', line: 'Join the roster', href: '/apply' },
  { label: 'For brands', line: 'Start a brief', href: contactHref('brief') },
] as const;

/**
 * APPLY in the masthead, as a small dropdown: hover opens it on desktop, a tap opens it anywhere,
 * and a tap outside, Escape or picking an item closes it. `align` pins the menu to the trigger's
 * left or right edge so it never runs off the screen.
 */
export function ApplyMenu({ size, current, align = 'left' }: { size: number; current: boolean; align?: 'left' | 'right' }) {
  // How the menu was opened. A hover that opened it shouldn't let the click that follows close it again.
  const [openedBy, setOpenedBy] = useState<'hover' | 'tap' | null>(null);
  const open = openedBy !== null;

  useEffect(() => {
    if (!open || Platform.OS !== 'web') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedBy(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpenedBy(null);

  const hoverProps = webHover({
    onMouseEnter: () => setOpenedBy((by) => by ?? 'hover'),
    onMouseLeave: close,
  });

  return (
    <View style={styles.wrap} {...hoverProps}>
      <Pressable
        accessibilityRole="button"
        aria-haspopup="menu"
        aria-expanded={open}
        accessibilityLabel="Apply: choose creators or brands"
        onPress={() => setOpenedBy((by) => (by === 'hover' ? 'tap' : by ? null : 'tap'))}
        style={styles.trigger}>
        {({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => {
          const on = current || open || hovered || pressed;
          return (
            <Copy size={size} weight={600} upper color={color.ink} style={[underline, { textDecorationColor: on ? color.ink : 'transparent' }]}>
              Apply
              <Text style={[styles.caret, open && styles.caretOpen]}> ▾</Text>
            </Copy>
          );
        }}
      </Pressable>

      {open ? (
        <>
          {/* Tapping anywhere else closes the menu. */}
          <Pressable accessibilityLabel="Close menu" onPress={close} style={[styles.backdrop, fixed]} />
          <View style={[styles.menuSlot, align === 'right' ? { right: 0 } : { left: -14 }]}>
            <View role="menu" style={styles.menu}>
              {ITEMS.map((item, i) => (
                <A
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onPress={() => close()}
                  style={({ hovered, pressed }) => [styles.item, i > 0 && styles.itemRule, (hovered || pressed) && styles.itemOn]}>
                  {({ hovered, pressed }) => (
                    <View style={styles.itemRow}>
                      <View style={{ gap: 2 }}>
                        <Copy size={14} weight={600} upper color={hovered || pressed ? color.crimson : color.ink}>
                          {item.label}
                        </Copy>
                        <Copy size={13} color={color.greyOnPaper}>
                          {item.line}
                        </Copy>
                      </View>
                      <Copy size={16} weight={600} color={hovered || pressed ? color.crimson : color.ink}>
                        →
                      </Copy>
                    </View>
                  )}
                </A>
              ))}
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}

/** Mouse enter/leave on the wrapper (react-native-web passes them through to the DOM); nothing on native. */
function webHover(handlers: { onMouseEnter: () => void; onMouseLeave: () => void }): object {
  return Platform.OS === 'web' ? handlers : {};
}

const underline = webStyle<TextStyle>({
  textDecorationLine: 'underline',
  textDecorationThickness: '2px',
  textUnderlineOffset: '0.3em',
  transitionProperty: 'text-decoration-color',
  transitionDuration: '160ms',
});
const fixed = webStyle<ViewStyle>({ position: 'fixed' });

const styles = StyleSheet.create({
  wrap: { position: 'relative', zIndex: 30 },
  trigger: { cursor: 'pointer' } as ViewStyle,
  caret: { fontSize: 11 },
  caretOpen: { color: color.crimson },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 },
  // The slot starts right under the trigger and its top padding bridges the gap, so moving the
  // mouse down onto the menu never leaves the hover area.
  menuSlot: { position: 'absolute', top: '100%', paddingTop: 10, zIndex: 40 },
  menu: {
    width: 230,
    backgroundColor: color.paper,
    borderWidth: 2,
    borderColor: color.ink,
    boxShadow: '0px 12px 26px rgba(13, 13, 13, 0.22)',
    transform: [{ rotate: '-0.6deg' }],
  } as ViewStyle,
  item: { paddingVertical: 12, paddingHorizontal: 14 },
  itemRule: { borderTopWidth: 1, borderColor: 'rgba(13, 13, 13, 0.18)' },
  itemOn: { backgroundColor: color.stock },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
});
