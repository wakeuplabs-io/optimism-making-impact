import { CompleteKeyword } from '@/types/keywords';
import React, { createContext } from 'react';

interface KeywordsFilterState {
  keywords: CompleteKeyword[];
  selectedKeywords: CompleteKeyword[];
}

export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_SELECTED_KEYWORDS = 'SET_SELECTED_KEYWORDS';
export const CLEAR_SELECTED_KEYWORDS = 'CLEAR_SELECTED_FILTERS';

type Action =
  | { type: typeof SET_KEYWORDS; payload: CompleteKeyword[] }
  | { type: typeof SET_SELECTED_KEYWORDS; payload: CompleteKeyword }
  | { type: typeof CLEAR_SELECTED_KEYWORDS };

export const initialState: KeywordsFilterState = {
  keywords: [],
  selectedKeywords: [],
};

function toggleFilter<T extends { id: number }>(currentFilters: T[], filter: T): T[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);
  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}

export function keywordsFilterReducer(state: KeywordsFilterState, action: Action): KeywordsFilterState {
  switch (action.type) {
    case SET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
        selectedKeywords: state.selectedKeywords.filter((selectedKeyword) =>
          action.payload.some((keyword) => selectedKeyword.id === keyword.id),
        ),
      };

    case SET_SELECTED_KEYWORDS:
      return {
        ...state,
        selectedKeywords: toggleFilter(state.selectedKeywords, action.payload),
      };

    case CLEAR_SELECTED_KEYWORDS:
      return {
        ...state,
        selectedKeywords: [],
      };
    default:
      return state;
  }
}

interface KeywordsFilterContextProps {
  state: KeywordsFilterState;
  dispatch: React.Dispatch<Action>;
}

export const KeywordsFilterContext = createContext<KeywordsFilterContextProps | undefined>(undefined);
