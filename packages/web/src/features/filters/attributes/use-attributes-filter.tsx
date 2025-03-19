import {
  AttributesFilterContext,
  CLEAR_SELECTED_FILTERS,
  SET_ATTRIBUTES,
  SET_SELECTED_ATTRIBUTES,
} from '@/features/filters/attributes/attributes-filter-context';
import { Attribute } from '@optimism-making-impact/schemas';
import { useContext } from 'react';

export const useAttributesFilter = () => {
  const context = useContext(AttributesFilterContext);

  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  return {
    ...context.state,
    setAttributes: (attributes: Attribute[]) => context.dispatch({ type: SET_ATTRIBUTES, payload: attributes }),
    setSelectedAttributes: (attribute: Attribute) => context.dispatch({ type: SET_SELECTED_ATTRIBUTES, payload: attribute }),
    clearSelectedAttributes: () => context.dispatch({ type: CLEAR_SELECTED_FILTERS }),
  };
};
