import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContinuedOn } from '@/components/ContinuedOn';
import { Footer } from '@/components/Footer';
import { FormPage, NumberedPoints } from '@/components/FormPage';
import { Btn } from '@/components/Link';
import { Masthead } from '@/components/Masthead';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Copy } from '@/components/Type';
import { contactPage, nextSteps, topics } from '@/content/contact';
import { meta } from '@/content/site';
import { color } from '@/theme/tokens';

/** How brands reach BLNK. `?topic=media-kit` (see `contactHref`) opens the form with that request picked. */
export default function Contact() {
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  const picked = topics.find((t) => t.id === topic);
  return (
    <>
      <PageHead {...meta.contact} />
      <Page>
        <Masthead current="contact" />
        <Main>
          <FormPage
            copy={contactPage}
            initial={picked ? { topic: picked.label } : undefined}
            aside={
              <NumberedPoints title={nextSteps.title} points={nextSteps.points}>
                {/* The other ways in, as real buttons on a ruled box so they aren't missed beside the form. */}
                <View style={styles.direct}>
                  <Copy size={13} weight={600} upper>
                    Rather talk, or email?
                  </Copy>
                  <View style={styles.directButtons}>
                    {nextSteps.direct.map((d, i) => (
                      <Btn key={d.label} href={d.link.href} label={d.link.label} variant={i === 0 ? 'solid' : 'outline'} tilt={i === 0 ? -1.5 : 1} />
                    ))}
                  </View>
                </View>
              </NumberedPoints>
            }
          />
          <ContinuedOn from="contact" />
        </Main>
        <Footer variant="contact" />
      </Page>
    </>
  );
}

const styles = StyleSheet.create({
  direct: { gap: 14, marginTop: 8, padding: 18, borderWidth: 2, borderColor: color.ink, backgroundColor: color.paper },
  directButtons: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 14 },
});
