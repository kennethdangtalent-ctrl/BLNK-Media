import { LegalPage } from '@/components/LegalPage';
import { privacy } from '@/content/legal';
import { meta } from '@/content/site';

/** Privacy policy, including the cookies section linked from the cookie notice (/privacy#cookies). */
export default function Privacy() {
  return <LegalPage doc={privacy} meta={meta.privacy} />;
}
