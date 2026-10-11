import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Footer } from '@/components/Footer';
import { FormPage, NumberedPoints } from '@/components/FormPage';
import { ULink } from '@/components/Link';
import { Masthead } from '@/components/Masthead';
import { Main, Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Copy } from '@/components/Type';
import { contactPage, nextSteps, topics } from '@/content/contact';
import { meta } from '@/content/site';

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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 10, rowGap: 4 }}>
                  <Copy size={14}>{nextSteps.direct.label}</Copy>
                  <ULink href={nextSteps.direct.link.href} size={14}>
                    {nextSteps.direct.link.label}
                  </ULink>
                </View>
              </NumberedPoints>
            }
          />
        </Main>
        <Footer variant="contact" />
      </Page>
    </>
  );
}
