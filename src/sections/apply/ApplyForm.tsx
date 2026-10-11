import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View, type TextStyle, type ViewStyle } from 'react-native';

import { Band } from '@/components/Band';
import { Clipping } from '@/components/Clipping';
import { ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { Accented } from '@/components/Accent';
import { FORM_ENDPOINT, applyPage, fields, groups, type FieldKey } from '@/content/apply';
import { EMAIL } from '@/content/site';
import { useLayout } from '@/theme/layout';
import { fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color, font } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

type Values = Record<FieldKey, string>;
type Status = 'idle' | 'sending' | 'sent' | 'failed';

const EMPTY: Values = { name: '', email: '', twitch: '', socials: '', clip: '', schedule: '', about: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The application as plain text, for the email that either route produces. */
function asText(v: Values) {
  return fields.map((f) => `${f.label}: ${v[f.key].trim() || '-'}`).join('\n');
}

/**
 * The application page: the pitch and what we look for on one side, the form on a taped sheet on
 * the other. With `FORM_ENDPOINT` set, the form posts straight to the business inbox; without it,
 * submitting opens the applicant's email app with the application filled in.
 */
export function ApplyForm() {
  const L = useLayout();
  const tone = useTone();
  const wide = L.isDesktop;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: FieldKey) => (text: string) => {
    setValues((v) => ({ ...v, [key]: text }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    for (const f of fields) if (f.required && !values[f.key].trim()) next[f.key] = applyPage.required;
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) next.email = applyPage.badEmail;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (status === 'sending' || !validate()) return;
    const subject = `BLNK Roster Application: ${values.name.trim()}`;
    if (!FORM_ENDPOINT) {
      const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(asText(values))}`;
      Linking.openURL(href).catch((error: unknown) => console.warn('[BLNK] could not open the email app', error));
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          // Labelled keys so the email reads "Twitch channel: …", not "twitch: …".
          ...Object.fromEntries(fields.map((f) => [f.label, values[f.key].trim() || '-'])),
          _subject: subject,
          _replyto: values.email.trim(),
          _template: 'table',
        }),
      });
      // FormSubmit answers 200 with `success: "false"` when it refuses (e.g. before activation).
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      const ok = res.ok && String(json.success) !== 'false';
      setStatus(ok ? 'sent' : 'failed');
      if (!ok) console.warn('[BLNK] application form returned', res.status, json.message);
    } catch (error) {
      console.warn('[BLNK] application form failed to send', error);
      setStatus('failed');
    }
  };

  const byKey = Object.fromEntries(fields.map((f) => [f.key, f])) as Record<FieldKey, (typeof fields)[number]>;
  const pairs = !L.isPhone;

  return (
    <Band tone="stock" label="Apply" padTop={L.fl(96, 56)}>
      <View style={[styles.row, { flexDirection: wide ? 'row' : 'column', gap: L.fl(72, 40) }]}>
        <View style={[{ gap: L.fl(28, 20) }, wide ? [styles.side, stickyWeb] : null]}>
          <View style={styles.kicker}>
            <View style={styles.dot} />
            <Copy size={13} weight={600} upper>
              {applyPage.kicker}
            </Copy>
          </View>
          <Display level={1} size={fitWords(applyPage.title, wide ? L.inner * 0.38 : L.inner, L.fl(104, 52), -0.03)} lh={0.92} upper={false}>
            <Accented text={applyPage.title} word={applyPage.accent} />
          </Display>
          <Deck size={L.fl(22, 18)} lh={1.4}>
            {applyPage.intro}
          </Deck>
          <View style={[styles.lookFor, { borderColor: tone.fg }]}>
            <Copy size={13} weight={600} upper>
              {applyPage.lookFor.title}
            </Copy>
            {applyPage.lookFor.points.map((point, i) => (
              <View key={point.head} style={[styles.point, { borderColor: 'rgba(13, 13, 13, 0.18)' }]}>
                <Display aria-hidden size={L.fl(40, 32)} lh={0.9} color={color.crimson} upper={false}>
                  {String(i + 1).padStart(2, '0')}
                </Display>
                <View style={{ flex: 1, gap: 4 }}>
                  <Copy size={L.fl(19, 17)} weight={600}>
                    {point.head}
                  </Copy>
                  <Copy size={L.fl(16, 15)} lh={1.45} color={tone.mute}>
                    {point.body}
                  </Copy>
                </View>
              </View>
            ))}
            <View style={{ paddingTop: 4 }}>
              <ULink href={applyPage.lookFor.link.href} size={14}>
                {applyPage.lookFor.link.label}
              </ULink>
            </View>
          </View>
        </View>

        <View style={wide ? styles.formCol : null}>
          <Clipping tilt={wide ? 0.6 : 0} pad={L.fl(40, 20)}>
            {status === 'sent' ? (
              <Sent />
            ) : (
              <View role="form" aria-label="Application" style={{ gap: L.fl(34, 26) }}>
                <View style={styles.formHead}>
                  <View style={styles.formHeadRow}>
                    <Display level={2} size={L.fl(30, 24)} lh={1} upper={false}>
                      {applyPage.form.title}
                    </Display>
                    <Copy size={12} weight={600} upper color={color.crimson}>
                      {applyPage.form.number}
                    </Copy>
                  </View>
                  <Copy size={13} color={color.greyOnPaper}>
                    {applyPage.form.note}
                  </Copy>
                </View>
                {groups.map((g, gi) => (
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
                        const half = pairs && HALF.has(key);
                        return (
                          <View key={key} style={half ? styles.half : styles.full}>
                            <Field
                              label={f.label}
                              placeholder={f.placeholder}
                              required={f.required}
                              multiline={f.multiline}
                              kind={f.kind}
                              value={values[key]}
                              error={errors[key]}
                              onChangeText={set(key)}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
                <View style={[styles.submitRow, { gap: 12 }]}>
                  <SubmitButton label={status === 'sending' ? applyPage.sending : applyPage.submit} busy={status === 'sending'} onPress={submit} />
                  {status === 'failed' ? (
                    <Copy size={14} color={color.crimson} role="alert">
                      {applyPage.failed}
                    </Copy>
                  ) : !FORM_ENDPOINT ? (
                    <Copy size={13} color={color.greyOnPaper}>
                      {applyPage.mailtoNote}
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

function Sent() {
  const L = useLayout();
  return (
    <View role="status" style={{ gap: 14, paddingVertical: L.fl(24, 12) }}>
      <Display level={2} size={L.fl(44, 32)} lh={1} upper={false}>
        {applyPage.sent.title}
      </Display>
      <Deck size={L.fl(20, 18)} lh={1.4} color={color.greyOnPaper}>
        {applyPage.sent.body}
      </Deck>
    </View>
  );
}

/** Fields that sit two to a row on tablet and desktop. */
const HALF = new Set<FieldKey>(['name', 'email', 'twitch', 'schedule']);

/** On desktop the pitch column stays in view while the form scrolls past. */
const stickyWeb = webStyle<ViewStyle>({ position: 'sticky', top: 110 });

const inputWeb =webStyle<TextStyle>({ outlineStyle: 'none', transitionProperty: 'border-color', transitionDuration: '160ms' });

function Field({
  label,
  placeholder,
  required,
  multiline,
  kind,
  value,
  error,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  kind?: 'email' | 'url';
  value: string;
  error?: string;
  onChangeText: (text: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      <Copy size={12} weight={600} upper>
        {label}
        {required ? <Text style={{ color: color.crimson }}> *</Text> : null}
      </Copy>
      <TextInput
        accessibilityLabel={label}
        aria-required={required}
        aria-invalid={Boolean(error)}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8a8a86"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={kind === 'email' ? 'email-address' : kind === 'url' ? 'url' : 'default'}
        autoCapitalize={kind ? 'none' : 'sentences'}
        autoComplete={kind === 'email' ? 'email' : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          multiline && styles.multiline,
          { borderColor: error ? color.crimson : focused ? color.ink : '#b9b8b2' },
          inputWeb,
        ]}
      />
      {error ? (
        <Copy size={13} color={color.crimson}>
          {error}
        </Copy>
      ) : null}
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
      style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => [
        styles.submit,
        { transform: [{ rotate: hovered || pressed ? '0deg' : '-1.2deg' }, { translateY: hovered || pressed ? -3 : 0 }] },
        (hovered || pressed) && { boxShadow: '0px 10px 18px rgba(13, 13, 13, 0.3)' },
        busy && { opacity: 0.7 },
        pressWeb,
      ] as never}>
      <Copy size={15} weight={600} upper color={color.paper}>
        {label}
      </Copy>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'flex-start' },
  side: { flex: 5, minWidth: 0 },
  formCol: { flex: 6, minWidth: 0 },
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: color.crimson },
  lookFor: { gap: 4, borderTopWidth: 3, paddingTop: 16 },
  point: { flexDirection: 'row', gap: 18, alignItems: 'flex-start', paddingVertical: 14, borderBottomWidth: 1 },
  formHead: { gap: 8, borderBottomWidth: 3, borderColor: color.ink, paddingBottom: 14 },
  formHeadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' },
  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  groupRule: { flex: 1, height: 1, backgroundColor: color.ink, opacity: 0.25 },
  fieldWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  half: { flexGrow: 1, flexBasis: '40%', minWidth: 0 },
  full: { width: '100%' },
  submitRow: { paddingTop: 4 },
  input: {
    fontFamily: font.text,
    fontSize: 17,
    color: color.ink,
    borderBottomWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  multiline: { minHeight: 110, textAlignVertical: 'top', borderWidth: 2, paddingHorizontal: 12 },
  submit: { backgroundColor: color.crimson, minHeight: 56, paddingHorizontal: 26, justifyContent: 'center', alignSelf: 'flex-start', cursor: 'pointer' } as ViewStyle,
});
