import { StrengthItem, strengthItems } from '@/types/common';
import { Attribute, Keyword } from '@optimism-making-impact/schemas';
import React, { createContext } from 'react';

interface FiltersState {
  keywords: Keyword[];
  attributes: Attribute[];
  strengths: StrengthItem[];
  selectedStrengths: StrengthItem[];
  selectedKeywords: Keyword[];
  selectedAttributes: Attribute[];
}

export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_ATTRIBUTES = 'SET_ATTRIBUTES';
export const SET_SELECTED_STRENGTHS = 'SET_SELECTED_STRENGTHS';
export const SET_SELECTED_KEYWORDS = 'SET_SELECTED_KEYWORDS';
export const SET_SELECTED_ATTRIBUTES = 'SET_SELECTED_ATTRIBUTES';
export const CLEAR_SELECTED_FILTERS = 'CLEAR_SELECTED_FILTERS';

type Action =
  | { type: typeof SET_KEYWORDS; payload: Keyword[] }
  | { type: typeof SET_ATTRIBUTES; payload: Attribute[] }
  | { type: typeof SET_SELECTED_STRENGTHS; payload: StrengthItem }
  | { type: typeof SET_SELECTED_KEYWORDS; payload: Keyword }
  | { type: typeof SET_SELECTED_ATTRIBUTES; payload: Attribute }
  | { type: typeof CLEAR_SELECTED_FILTERS };

export const initialState: FiltersState = {
  keywords: [],
  attributes: [],
  strengths: strengthItems,
  selectedStrengths: [],
  selectedKeywords: [],
  selectedAttributes: [],
};

function toggleFilter<T extends { id: number }>(currentFilters: T[], filter: T): T[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);
  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}

export function filtersReducer(state: FiltersState, action: Action): FiltersState {
  switch (action.type) {
    case SET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
        selectedKeywords: state.selectedKeywords.filter((selectedKeyword) =>
          action.payload.some((keyword) => selectedKeyword.id === keyword.id),
        ),
      };
    case SET_ATTRIBUTES:
      return { ...state, attributes: action.payload };
    case SET_SELECTED_STRENGTHS:
      return {
        ...state,
        selectedStrengths: toggleFilter(state.selectedStrengths, action.payload),
      };
    case SET_SELECTED_KEYWORDS:
      return {
        ...state,
        selectedKeywords: toggleFilter(state.selectedKeywords, action.payload),
      };
    case SET_SELECTED_ATTRIBUTES:
      return {
        ...state,
        selectedAttributes: toggleFilter(state.selectedAttributes, action.payload),
      };
    case CLEAR_SELECTED_FILTERS:
      return {
        ...state,
        selectedStrengths: [],
        selectedKeywords: [],
        selectedAttributes: [],
      };
    default:
      return state;
  }
}

interface FiltersContextProps {
  state: FiltersState;
  dispatch: React.Dispatch<Action>;
}

export const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);
