import { useAttributesFilter } from '@/features/filters/attributes/use-attributes-filter';

export function useItemsFilters() {
  const attributeFilter = useAttributesFilter();

  return attributeFilter;
}
