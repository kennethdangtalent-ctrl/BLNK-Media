import { StyleSheet, View } from 'react-native';

import { Band } from './Band';
import { Footer } from './Footer';
import { Masthead } from './Masthead';
import { Main, Page } from './Page';
import { PageHead } from './PageHead';
import { SectionHead } from './SectionHead';
import { Display, Mono, Serif } from './Type';
import type { LegalDoc } from '@/content/legal';
import { useLayout } from '@/theme/layout';
import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

type Meta = { title: string; description: string; path: string };

/** A plain reading page for the privacy policy and terms: one light band, numbered sections, a 70-character measure. */
export function LegalPage({ doc, meta }: { doc: LegalDoc; meta: Meta }) {
  return (
    <>
      <PageHead {...meta} />
      <Page>
        <Masthead current="other" />
        <Main>
          <Band tone="light" label={doc.title}>
            <LegalBody doc={doc} />
          </Band>
        </Main>
        <Footer variant="legal" />
      </Page>
    </>
  );
}

function LegalBody({ doc }: { doc: LegalDoc }) {
  const L = useLayout();
  const tone = useTone();
  return (
    <View style={{ gap: L.fl(56, 40) }}>
      <SectionHead level={1} eyebrow={doc.eyebrow} title={doc.title} dek={doc.updated} />
      <Serif italic size={L.fl(32, 24)} lh={1.2} maxCh={40}>
        {doc.intro}
      </Serif>
      <View style={styles.sections}>
        {doc.sections.map((section, i) => (
          <View key={section.heading} nativeID={section.id} style={[styles.section, { gap: 14 }]}>
            <Mono size={12} weight={600} ls={0.16} color={color.accent}>
              {String(i + 1).padStart(2, '0')}
            </Mono>
            <Display level={2} size={L.fl(40, 30)} lh={0.95}>
              {section.heading}
            </Display>
            {section.body.map((paragraph) => (
              <Mono key={paragraph} size={L.fl(15, 14)} lh={1.7} color={tone.mute} maxCh={70}>
                {paragraph}
              </Mono>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sections: { gap: 0 },
  section: { paddingVertical: 28, borderTopWidth: 1, borderColor: color.hairOnPaper },
});
