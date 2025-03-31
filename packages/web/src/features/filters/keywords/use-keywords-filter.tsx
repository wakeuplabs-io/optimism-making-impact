import { CLEAR_SELECTED_FILTERS } from '@/features/filters/attributes/attributes-filter-context';
import { KeywordsFilterContext, SET_KEYWORDS, SET_SELECTED_KEYWORDS } from '@/features/filters/keywords/keywords-filter-context';
import { CompleteKeyword } from '@/types/keywords';
import { useContext } from 'react';

export const useKeywordsFilter = () => {
  const context = useContext(KeywordsFilterContext);

  if (!context) {
    throw new Error('useKeywordsFilter must be used within a KeywordsFiltersProvider');
  }

  return {
    ...context.state,
    setKeywords: (keywords: CompleteKeyword[]) => context.dispatch({ type: SET_KEYWORDS, payload: keywords }),
    setSelectedKeywords: (keyword: CompleteKeyword) => context.dispatch({ type: SET_SELECTED_KEYWORDS, payload: keyword }),
    clearSelectedKeywords: () => context.dispatch({ type: CLEAR_SELECTED_FILTERS }),
  };
};
