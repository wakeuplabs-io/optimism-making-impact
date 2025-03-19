import { useAttributesFilter } from '@/features/filters/attributes/use-attributes-filter';
import { useStepContext } from '@/features/main-section/step-context';

/**
 * Custom hook that provides the current step context along with filter states and actions for attributes. It combines the context from attributes filters and includes the current step information.
 */
export function useItemsStepContext() {
  const attributeFilter = useAttributesFilter();
  const { step } = useStepContext();

  return {
    ...attributeFilter,
    step,
  };
}
