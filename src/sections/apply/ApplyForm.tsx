import { FormPage, NumberedPoints } from '@/components/FormPage';
import { ULink } from '@/components/Link';
import { applyPage, lookFor } from '@/content/apply';

/** The roster application: what we look for beside the pitch, the form on a taped sheet. */
export function ApplyForm() {
  return (
    <FormPage
      copy={applyPage}
      aside={
        <NumberedPoints title={lookFor.title} points={lookFor.points}>
          <ULink href={lookFor.link.href} size={14}>
            {lookFor.link.label}
          </ULink>
        </NumberedPoints>
      }
    />
  );
}
