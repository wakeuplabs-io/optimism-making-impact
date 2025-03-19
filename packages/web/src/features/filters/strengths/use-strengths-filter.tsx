import { CLEAR_SELECTED_FILTERS } from '@/features/filters/attributes/attributes-filter-context';
import { SET_SELECTED_STRENGTHS, StrengthsFilterContext } from '@/features/filters/strengths/strengths-filter-context';
import { StrengthItem } from '@/types/common';
import { useContext } from 'react';

export const useStrengthsFilter = () => {
  const context = useContext(StrengthsFilterContext);

  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  return {
    ...context.state,
    setSelectedStrengths: (strength: StrengthItem) => context.dispatch({ type: SET_SELECTED_STRENGTHS, payload: strength }),
    clearSelectedStrenghts: () => context.dispatch({ type: CLEAR_SELECTED_FILTERS }),
  };
};
