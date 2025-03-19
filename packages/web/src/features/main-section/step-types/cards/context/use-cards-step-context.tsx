import { useAttributesFilter } from '@/features/filters/attributes/use-attributes-filter';
import { useKeywordsFilter } from '@/features/filters/keywords/use-keywords-filter';
import { useStrengthsFilter } from '@/features/filters/strengths/use-strengths-filter';
import { useStepContext } from '@/features/main-section/step-context';

/**
 * Custom hook that provides the current step context along with filter states and actions for keywords, strengths, and attributes. It combines the contexts from keywords, strengths, and attributes filters and includes the current step information.
 */
export function useCardsStepContext() {
  const keywordsFilter = useKeywordsFilter();
  const strengthFilter = useStrengthsFilter();
  const attributeFilter = useAttributesFilter();
  const { step } = useStepContext();

  return {
    ...keywordsFilter,
    ...strengthFilter,
    ...attributeFilter,
    step,
  };
}
