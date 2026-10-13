import { useState, type ReactNode } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View, type TextStyle, type ViewStyle } from 'react-native';

import { Accented } from './Accent';
import { Band } from './Band';
import { Clipping } from './Clipping';
import { Copy, Deck, Display } from './Type';
import { EMAIL, FORM_ENDPOINT } from '@/content/site';
import { useHydrated, useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { color, font } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

export type FormField = {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  /** `choice` picks one of `options`, `multi` any number of them; both render as paper tabs. */
  kind?: 'email' | 'url' | 'choice' | 'multi';
  options?: readonly string[];
  /** Sits two to a row on tablet and desktop. */
  half?: boolean;
};

export type FormCopy = {
  /** Names the section for screen readers and the form for assistive tech. */
  label: string;
  kicker: string;
  title: string;
  /** The word printed in crimson in the title. */
  accent: string;
  intro: string;
  form: { title: string; number: string; note: string };
  fields: readonly FormField[];
  groups: readonly { title: string; keys: readonly string[] }[];
  /** The email subject line for a submission. */
  subject: (values: Record<string, string>) => string;
  submit: string;
  sending: string;
  sent: { title: string; body: string };
  failed: string;
  mailtoNote: string;
  required: string;
  badEmail: string;
};

type Status = 'idle' | 'sending' | 'sent' | 'failed';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MULTI_SEP = ', ';

/**
 * A form page in the magazine's layout: kicker, headline and intro with `aside` beneath on one
 * side, the form on a taped sheet on the other, split into numbered sections. With `FORM_ENDPOINT`
 * set, a submission is emailed to the business inbox; without it, submitting opens the sender's
 * email app with everything filled in. `initial` prefills fields after mount (e.g. from the URL).
 */
export function FormPage({ copy, aside, initial }: { copy: FormCopy; aside?: ReactNode; initial?: Record<string, string> }) {
  const L = useLayout();
  const wide = L.isDesktop;
  const hydrated = useHydrated();
  // Only what the sender has typed or picked; untouched fields fall back to `initial`, which applies
  // after hydration so the static HTML and the first client render agree.
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<Status>('idle');
  // Spam trap: a field people never see. Bots that fill every box fill this too, and FormSubmit drops those.
  const [honey, setHoney] = useState('');
  const values: Record<string, string> = Object.fromEntries(
    copy.fields.map((f) => [f.key, f.key in edited ? edited[f.key] : hydrated ? (initial?.[f.key] ?? '') : '']),
  );

  const set = (key: string) => (text: string) => {
    setEdited((v) => ({ ...v, [key]: text }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const emailKey = copy.fields.find((f) => f.kind === 'email')?.key;

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of copy.fields) if (f.required && !values[f.key].trim()) next[f.key] = copy.required;
    if (emailKey && values[emailKey].trim() && !EMAIL_RE.test(values[emailKey].trim())) next[emailKey] = copy.badEmail;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (status === 'sending' || !validate()) return;
    const subject = copy.subject(values);
    // Labelled entries so the email reads "Twitch channel: …", not "twitch: …".
    const entries = copy.fields.map((f) => [f.label, values[f.key].trim() || '-'] as const);
    if (!FORM_ENDPOINT) {
      const body = entries.map(([k, v]) => `${k}: ${v}`).join('\n');
      Linking.openURL(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`).catch((error: unknown) =>
        console.warn('[BLNK] could not open the email app', error),
      );
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(entries),
          _subject: subject,
          ...(emailKey ? { _replyto: values[emailKey].trim() } : null),
          _template: 'table',
          _honey: honey,
        }),
      });
      // FormSubmit answers 200 with `success: "false"` when it refuses (e.g. before activation).
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      const ok = res.ok && String(json.success) !== 'false';
      setStatus(ok ? 'sent' : 'failed');
      if (!ok) console.warn('[BLNK] form returned', res.status, json.message);
    } catch (error) {
      console.warn('[BLNK] form failed to send', error);
      setStatus('failed');
    }
  };

  const byKey = Object.fromEntries(copy.fields.map((f) => [f.key, f]));
  const pairs = !L.isPhone;

  return (
    <Band tone="stock" label={copy.label} padTop={L.fl(96, 56)}>
      <View style={[styles.row, { flexDirection: wide ? 'row' : 'column', gap: L.fl(72, 40) }]}>
        <View style={[{ gap: L.fl(28, 20) }, wide ? [styles.side, stickyWeb] : null]}>
          <View style={styles.kicker}>
            <View style={styles.dot} />
            <Copy size={13} weight={600} upper>
              {copy.kicker}
            </Copy>
          </View>
          <Display level={1} size={fitWords(copy.title, wide ? L.inner * 0.38 : L.inner, L.fl(104, 52), -0.03)} lh={0.92} upper={false}>
            <Accented text={copy.title} word={copy.accent} />
          </Display>
          <Deck size={L.fl(22, 18)} lh={1.4}>
            {copy.intro}
          </Deck>
          {aside}
        </View>

        <View style={wide ? styles.formCol : null}>
          <Clipping tilt={wide ? 0.6 : 0} pad={L.fl(40, 20)}>
            {status === 'sent' ? (
              <View role="status" style={{ gap: 14, paddingVertical: L.fl(24, 12) }}>
                <Display level={2} size={L.fl(44, 32)} lh={1} upper={false}>
                  {copy.sent.title}
                </Display>
                <Deck size={L.fl(20, 18)} lh={1.4} color={color.greyOnPaper}>
                  {copy.sent.body}
                </Deck>
              </View>
            ) : (
              <View role="form" aria-label={copy.form.title} style={{ gap: L.fl(34, 26) }}>
                <View aria-hidden style={styles.trap}>
                  <TextInput value={honey} onChangeText={setHoney} tabIndex={-1} autoComplete="off" accessibilityLabel="Leave this empty" />
                </View>
                <View style={styles.formHead}>
                  <View style={styles.formHeadRow}>
                    <Display level={2} size={L.fl(30, 24)} lh={1} upper={false}>
                      {copy.form.title}
                    </Display>
                    <Copy size={12} weight={600} upper color={color.crimson}>
                      {copy.form.number}
                    </Copy>
                  </View>
                  <Copy size={13} color={color.greyOnPaper}>
                    {copy.form.note}
                  </Copy>
                </View>
                {copy.groups.map((g, gi) => (
                  <View key={g.title} style={{ gap: L.fl(20, 16) }}>
                    <View style={styles.groupHead}>
                      <Copy size={13} weight={600} color={color.crimson}>
                        {String(gi + 1).padStart(2, '0')}
                      </Copy>
                      <Copy size={13} weight={600} upper>
                        {g.title}
                      </Copy>
                      <View style={styles.groupRule} />
                    </View>
                    <View style={[styles.fieldWrap, { columnGap: 24, rowGap: L.fl(20, 16) }]}>
                      {g.keys.map((key) => {
                        const f = byKey[key];
                        return (
                          <View key={key} style={pairs && f.half ? styles.half : styles.full}>
                            {f.kind === 'choice' || f.kind === 'multi' ? (
                              <ChoiceField field={f} value={values[key]} error={errors[key]} onChange={set(key)} />
                            ) : (
                              <Field field={f} value={values[key]} error={errors[key]} onChangeText={set(key)} />
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
                <View style={[styles.submitRow, { gap: 12 }]}>
                  <SubmitButton label={status === 'sending' ? copy.sending : copy.submit} busy={status === 'sending'} onPress={submit} />
                  {status === 'failed' ? (
                    <Copy size={14} color={color.crimson} role="alert">
                      {copy.failed}
                    </Copy>
                  ) : !FORM_ENDPOINT ? (
                    <Copy size={13} color={color.greyOnPaper}>
                      {copy.mailtoNote}
                    </Copy>
                  ) : null}
                </View>
              </View>
            )}
          </Clipping>
        </View>
      </View>
    </Band>
  );
}

/**
 * Numbered points under the intro, each a crimson numeral with a bold head and a line beneath:
 * the apply page's "what we look for", the contact page's "what happens next".
 */
export function NumberedPoints({ title, points, children }: { title: string; points: readonly { head: string; body: string }[]; children?: ReactNode }) {
  const L = useLayout();
  return (
    <View style={styles.points}>
      <Copy size={13} weight={600} upper>
        {title}
      </Copy>
      {points.map((point, i) => (
        <View key={point.head} style={styles.point}>
          <Display aria-hidden size={L.fl(40, 32)} lh={0.9} color={color.crimson} upper={false}>
            {String(i + 1).padStart(2, '0')}
          </Display>
          <View style={{ flex: 1, gap: 4 }}>
            <Copy size={L.fl(19, 17)} weight={600}>
              {point.head}
            </Copy>
            <Copy size={L.fl(16, 15)} lh={1.45} color={color.muteOnStock}>
              {point.body}
            </Copy>
          </View>
        </View>
      ))}
      {children ? <View style={{ paddingTop: 4 }}>{children}</View> : null}
    </View>
  );
}

/** On desktop the pitch column stays in view while the form scrolls past. */
const stickyWeb = webStyle<ViewStyle>({ position: 'sticky', top: 110 });

const inputWeb = webStyle<TextStyle>({ outlineStyle: 'none', transitionProperty: 'border-color', transitionDuration: '160ms' });

function Label({ field }: { field: FormField }) {
  return (
    <Copy size={12} weight={600} upper>
      {field.label}
      {field.required ? <Text style={{ color: color.crimson }}> *</Text> : null}
    </Copy>
  );
}

function ErrorLine({ error }: { error?: string }) {
  return error ? (
    <Copy size={13} color={color.crimson}>
      {error}
    </Copy>
  ) : null;
}

function Field({ field, value, error, onChangeText }: { field: FormField; value: string; error?: string; onChangeText: (text: string) => void }) {
  const [focused, setFocused] = useState(false);
  const { kind, multiline } = field;
  return (
    <View style={{ gap: 6 }}>
      <Label field={field} />
      <TextInput
        accessibilityLabel={field.label}
        aria-required={field.required}
        aria-invalid={Boolean(error)}
        value={value}
        onChangeText={onChangeText}
        placeholder={field.placeholder}
        placeholderTextColor="#8a8a86"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        maxLength={multiline ? 3000 : 300}
        keyboardType={kind === 'email' ? 'email-address' : kind === 'url' ? 'url' : 'default'}
        autoCapitalize={kind ? 'none' : 'sentences'}
        autoComplete={kind === 'email' ? 'email' : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, multiline && styles.multiline, { borderColor: error ? color.crimson : focused ? color.ink : '#b9b8b2' }, inputWeb]}
      />
      <ErrorLine error={error} />
    </View>
  );
}

const tabWeb = webStyle<ViewStyle>({ transitionProperty: 'background-color, transform', transitionDuration: '160ms', cursor: 'pointer' });

/** Paper tabs to pick from: one for `choice`, any number for `multi` (stored comma-joined). */
function ChoiceField({ field, value, error, onChange }: { field: FormField; value: string; error?: string; onChange: (value: string) => void }) {
  const multi = field.kind === 'multi';
  const picked = value ? value.split(MULTI_SEP) : [];
  const toggle = (option: string) => {
    if (!multi) return onChange(option);
    const next = picked.includes(option) ? picked.filter((p) => p !== option) : [...picked, option];
    onChange(field.options!.filter((o) => next.includes(o)).join(MULTI_SEP));
  };
  return (
    <View style={{ gap: 10 }}>
      <Label field={field} />
      <View role={multi ? 'group' : 'radiogroup'} aria-label={field.label} style={styles.tabs}>
        {field.options!.map((option) => {
          const on = picked.includes(option);
          return (
            <Pressable
              key={option}
              accessibilityRole={multi ? 'checkbox' : 'radio'}
              accessibilityState={{ checked: on }}
              onPress={() => toggle(option)}
              style={({ hovered }: { hovered?: boolean; pressed: boolean }) =>
                [styles.tab, on ? styles.tabOn : hovered ? styles.tabHover : null, { transform: [{ rotate: on ? '-1deg' : '0deg' }] }, tabWeb] as never
              }>
              <Copy size={14} weight={600} color={on ? color.paper : color.ink}>
                {option}
              </Copy>
            </Pressable>
          );
        })}
      </View>
      <ErrorLine error={error} />
    </View>
  );
}

const pressWeb = webStyle<ViewStyle>({ transitionProperty: 'transform, box-shadow', transitionDuration: '180ms' });

/** The submit control, cut like the site's paper-scrap buttons. */
function SubmitButton({ label, busy, onPress }: { label: string; busy: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy, disabled: busy }}
      disabled={busy}
      onPress={onPress}
      style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) =>
        [
          styles.submit,
          { transform: [{ rotate: hovered || pressed ? '0deg' : '-1.2deg' }, { translateY: hovered || pressed ? -3 : 0 }] },
          (hovered || pressed) && { boxShadow: '0px 10px 18px rgba(13, 13, 13, 0.3)' },
          busy && { opacity: 0.7 },
          pressWeb,
        ] as never
      }>
      <Copy size={15} weight={600} upper color={color.paper}>
        {label}
      </Copy>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trap: { position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden', opacity: 0 },
  row: { alignItems: 'flex-start' },
  side: { flex: 5, minWidth: 0 },
  formCol: { flex: 6, minWidth: 0 },
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: color.crimson },
  points: { gap: 4, borderTopWidth: 3, borderColor: color.ink, paddingTop: 16 },
  point: { flexDirection: 'row', gap: 18, alignItems: 'flex-start', paddingVertical: 14, borderBottomWidth: 1, borderColor: 'rgba(13, 13, 13, 0.18)' },
  formHead: { gap: 8, borderBottomWidth: 3, borderColor: color.ink, paddingBottom: 14 },
  formHeadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' },
  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  groupRule: { flex: 1, height: 1, backgroundColor: color.ink, opacity: 0.25 },
  fieldWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  half: { flexGrow: 1, flexBasis: '40%', minWidth: 0 },
  full: { width: '100%' },
  submitRow: { paddingTop: 4 },
  input: { fontFamily: font.text, fontSize: 17, color: color.ink, borderBottomWidth: 2, paddingVertical: 10, paddingHorizontal: 2 },
  multiline: { minHeight: 110, textAlignVertical: 'top', borderWidth: 2, paddingHorizontal: 12 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tab: { borderWidth: 2, borderColor: color.ink, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: color.paper },
  tabHover: { backgroundColor: color.stock },
  tabOn: { backgroundColor: color.crimson, borderColor: color.crimson },
  submit: {
    backgroundColor: color.crimson,
    minHeight: 56,
    paddingHorizontal: 26,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    cursor: 'pointer',
  } as ViewStyle,
});
