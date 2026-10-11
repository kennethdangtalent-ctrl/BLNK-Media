import { StyleSheet, View } from 'react-native';

import { Accented } from '@/components/Accent';
import { Band } from '@/components/Band';
import { Clipping } from '@/components/Clipping';
import { FillPhoto } from '@/components/FillPhoto';
import { Grid } from '@/components/Grid';
import { Btn, ULink } from '@/components/Link';
import { Copy, Deck, Display } from '@/components/Type';
import { brandsClose, brandsHero, steps, withCreators, withTeam } from '@/content/brands';
import { cover, roster } from '@/content/home';
import { useLayout } from '@/theme/layout';
import { fitLines, fitWords } from '@/theme/metrics';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/** The pitch: who BLNK is for a brand, in one headline and one paragraph, with the two asks. */
export function BrandsHero() {
  const L = useLayout();
  return (
    <Band tone="stock" label="For brands" padTop={L.fl(96, 56)}>
      <View style={{ gap: L.fl(28, 20) }}>
        <View style={styles.kicker}>
          <View style={styles.dot} />
          <Copy size={13} weight={600} upper>
            {brandsHero.kicker}
          </Copy>
        </View>
        <Display level={1} size={fitWords(brandsHero.title, L.inner * (L.isDesktop ? 0.8 : 1), L.fl(120, 52), -0.03)} lh={0.92} upper={false}>
          <Accented text={brandsHero.title} word={brandsHero.accent} />
        </Display>
        <Deck size={L.fl(24, 19)} lh={1.35} maxCh={52}>
          {brandsHero.intro}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={brandsHero.primary.href} label={brandsHero.primary.label} />
          <Btn href={brandsHero.secondary.href} label={brandsHero.secondary.label} variant="outline" />
          <Btn href={brandsHero.call.href} label={brandsHero.call.label} variant="outline" tilt={1} />
        </View>
      </View>
    </Band>
  );
}

/** The two ways to work with BLNK, on two taped sheets: the creators, and the team. */
export function Ways() {
  const L = useLayout();
  const pad = L.fl(40, 22);
  return (
    <Band tone="accent" id="ways" label="Two ways to work with us">
      <View style={{ gap: L.fl(56, 36) }}>
        <Clipping tilt={-0.5} tape="left" pad={pad}>
          <View style={{ gap: L.fl(28, 20) }}>
            <SheetHead n="01" label={withCreators.label} title={withCreators.title} />
            <View style={styles.formats}>
              {withCreators.formats.map((f) => (
                <View key={f} style={styles.format}>
                  <Copy size={14} weight={600}>
                    {f}
                  </Copy>
                </View>
              ))}
            </View>
            <RosterReach />
            <View style={{ alignItems: 'flex-start' }}>
              <ULink href={withCreators.link.href} size={14}>
                {withCreators.link.label}
              </ULink>
            </View>
          </View>
        </Clipping>

        <Clipping tilt={0.5} tape="right" pad={pad}>
          <View style={{ gap: L.fl(28, 20) }}>
            <SheetHead n="02" label={withTeam.label} title={withTeam.title} />
            <Grid cols={L.isPhone ? 1 : L.isTablet ? 2 : 4} gap={L.fl(20, 14)} rowGap={L.fl(20, 14)}>
              {withTeam.services.map((s, i) => (
                <View key={s.head} style={styles.service}>
                  <Copy size={12} weight={600} color={color.crimson}>
                    {String(i + 1).padStart(2, '0')}
                  </Copy>
                  <Display level={3} size={L.fl(26, 22)} lh={1.05} upper={false}>
                    {s.head}
                  </Display>
                  <Copy size={15} lh={1.45} color={color.greyOnPaper}>
                    {s.body}
                  </Copy>
                </View>
              ))}
            </Grid>
            <View style={{ alignItems: 'flex-start' }}>
              <ULink href={withTeam.link.href} size={14}>
                {withTeam.link.label}
              </ULink>
            </View>
          </View>
        </Clipping>
      </View>
    </Band>
  );
}

function SheetHead({ n, label, title }: { n: string; label: string; title: string }) {
  const L = useLayout();
  return (
    <View style={[styles.sheetHead, L.isPhone ? { alignItems: 'flex-start' } : { flexDirection: 'row', alignItems: 'flex-end' }]}>
      <Display aria-hidden size={L.fl(96, 56)} lh={0.82} color={color.crimson} upper={false}>
        {n}
      </Display>
      <View style={{ gap: 6, flex: L.isPhone ? undefined : 1, minWidth: 0 }}>
        <Copy size={13} weight={600} upper>
          {label}
        </Copy>
        <Display level={2} size={L.fl(52, 32)} lh={1} upper={false}>
          {title}
        </Display>
      </View>
    </View>
  );
}

/**
 * The roster for a brand: its reach as three big figures, then each creator as a round photo
 * with what they're the right fit for.
 */
function RosterReach() {
  const L = useLayout();
  const avatar = L.isPhone ? 64 : 76;
  return (
    <View style={{ gap: L.fl(28, 20) }}>
      <View style={[styles.reach, { flexDirection: L.isPhone ? 'column' : 'row' }]}>
        {withCreators.reach.map((r, i) => (
          <View key={r.label} style={[styles.reachCell, i > 0 && (L.isPhone ? styles.reachRuleTop : styles.reachRuleLeft)]}>
            <Display size={L.fl(64, 44)} lh={0.95} color={color.crimson} upper={false}>
              {r.value}
            </Display>
            <Copy size={13} weight={600} upper lh={1.35}>
              {r.label}
            </Copy>
          </View>
        ))}
      </View>
      <Grid cols={L.isPhone ? 2 : 5} gap={L.fl(16, 12)} rowGap={20}>
        {roster.map((c) => {
          const slide = cover.card.slides.find((s) => s.name === c.name);
          return (
            <View key={c.name} style={styles.person}>
              <View style={[styles.avatar, { width: avatar, height: avatar, borderRadius: avatar / 2 }]}>
                {slide ? <FillPhoto source={slide.photo} focus={slide.photoFocus ?? 30} label={c.name} /> : null}
              </View>
              <View style={{ gap: 2, alignItems: 'center' }}>
                <Copy size={15} weight={600} align="center">
                  {c.name}
                </Copy>
                <Copy size={13} color={color.greyOnPaper} align="center">
                  {withCreators.bestFor[c.name]}
                </Copy>
              </View>
            </View>
          );
        })}
      </Grid>
    </View>
  );
}

/** How a campaign runs, in three numbered steps on the dark band. */
export function Steps() {
  return (
    <Band tone="dark" label="How it works">
      <StepsBody />
    </Band>
  );
}

/** Inside the band, so `useTone` gives the dark band's colors, not the page's. */
function StepsBody() {
  const L = useLayout();
  const tone = useTone();
  return (
    <>
      <View style={{ gap: L.fl(48, 32) }}>
        <Display level={2} size={fitWords(steps.title, L.inner, L.fl(96, 48), -0.03)} lh={1} upper={false}>
          {steps.title}
        </Display>
        <Grid cols={L.isPhone ? 1 : 3} gap={L.fl(40, 24)} rowGap={28}>
          {steps.items.map((step, i) => (
            <View key={step.head} style={[styles.step, { borderColor: tone.fg }]}>
              <Copy size={13} weight={600} upper>
                {`Step ${String(i + 1).padStart(2, '0')}`}
              </Copy>
              <Display level={3} size={L.fl(30, 26)} lh={1.05} upper={false}>
                {step.head}
              </Display>
              <Copy size={L.fl(17, 16)} lh={1.5} color={tone.fg} style={{ opacity: 0.82 }}>
                {step.body}
              </Copy>
            </View>
          ))}
        </Grid>
      </View>
    </>
  );
}

/** The closing ask. */
export function BrandsClose() {
  const L = useLayout();
  return (
    <Band tone="accent" label="Work with us">
      <View style={{ gap: L.fl(32, 24) }}>
        <Display level={2} size={fitLines(brandsClose.title, L.inner, L.fl(140, 64), -0.02)} lh={0.88}>
          <Accented text={brandsClose.title} word={brandsClose.accent} />
        </Display>
        <Deck size={L.fl(24, 19)} lh={1.3} maxCh={44}>
          {brandsClose.body}
        </Deck>
        <View style={styles.ctas}>
          <Btn href={brandsClose.primary.href} label={brandsClose.primary.label} />
          <Btn href={brandsClose.secondary.href} label={brandsClose.secondary.label} variant="outline" />
          <Btn href={brandsClose.call.href} label={brandsClose.call.label} variant="outline" tilt={1} />
        </View>
      </View>
    </Band>
  );
}

const styles = StyleSheet.create({
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: color.crimson },
  ctas: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 },
  sheetHead: { gap: 18 },
  formats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  format: { borderWidth: 2, borderColor: color.ink, paddingVertical: 7, paddingHorizontal: 12 },
  reach: { borderTopWidth: 3, borderBottomWidth: 1, borderColor: color.ink },
  reachCell: { flex: 1, gap: 6, paddingVertical: 18, paddingHorizontal: 4 },
  reachRuleLeft: { borderLeftWidth: 1, borderColor: 'rgba(13, 13, 13, 0.18)', paddingLeft: 20 },
  reachRuleTop: { borderTopWidth: 1, borderColor: 'rgba(13, 13, 13, 0.18)' },
  person: { alignItems: 'center', gap: 10 },
  avatar: { overflow: 'hidden', backgroundColor: color.stock, borderWidth: 3, borderColor: color.crimson },
  service: { gap: 8, borderTopWidth: 3, borderColor: color.ink, paddingTop: 14 },
  step: { gap: 12, borderTopWidth: 3, paddingTop: 18 },
});
