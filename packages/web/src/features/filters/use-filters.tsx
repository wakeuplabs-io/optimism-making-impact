import {
  CLEAR_SELECTED_FILTERS,
  FiltersContext,
  SET_ATTRIBUTES,
  SET_KEYWORDS,
  SET_SELECTED_ATTRIBUTES,
  SET_SELECTED_KEYWORDS,
  SET_SELECTED_STRENGTHS,
} from '@/features/filters/filters-context';
import { StrengthItem } from '@/types/common';
import { Attribute, Keyword } from '@optimism-making-impact/schemas';
import { useContext } from 'react';

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

export const useFiltersActions = () => {
  const { dispatch } = useFilters();

  return {
    setKeywords: (keywords: Keyword[]) => dispatch({ type: SET_KEYWORDS, payload: keywords }),
    setAttributes: (attributes: Attribute[]) => dispatch({ type: SET_ATTRIBUTES, payload: attributes }),
    setSelectedStrengths: (strength: StrengthItem) => dispatch({ type: SET_SELECTED_STRENGTHS, payload: strength }),
    setSelectedKeywords: (keyword: Keyword) => dispatch({ type: SET_SELECTED_KEYWORDS, payload: keyword }),
    setSelectedAttributes: (attribute: Attribute) => dispatch({ type: SET_SELECTED_ATTRIBUTES, payload: attribute }),
    clearSelectedFilters: () => dispatch({ type: CLEAR_SELECTED_FILTERS }),
  };
};
