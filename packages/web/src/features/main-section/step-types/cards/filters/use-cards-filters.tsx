import { useAttributesFilter } from '@/features/filters/attributes/use-attributes-filter';
import { useKeywordsFilter } from '@/features/filters/keywords/use-keywords-filter';
import { useStrengthsFilter } from '@/features/filters/strengths/use-strengths-filter';

export function useCardsFilters() {
  const keywordsFilter = useKeywordsFilter();
  const strengthFilter = useStrengthsFilter();
  const attributeFilter = useAttributesFilter();

  return {
    ...keywordsFilter,
    ...strengthFilter,
    ...attributeFilter,
  };
}
