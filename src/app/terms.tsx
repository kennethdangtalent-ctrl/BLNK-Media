import { LegalPage } from '@/components/LegalPage';
import { terms } from '@/content/legal';
import { meta } from '@/content/site';

/** Terms of service. */
export default function Terms() {
  return <LegalPage doc={terms} meta={meta.terms} />;
}
