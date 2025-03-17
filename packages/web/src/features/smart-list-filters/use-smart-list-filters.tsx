import { StrengthItem, strengthItems } from '@/types/common';
import { Attribute, Keyword } from '@optimism-making-impact/schemas';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface FiltersState {
  keywords: Keyword[];
  attributes: Attribute[];
  strengths: StrengthItem[];
  selectedStrengths: StrengthItem[];
  selectedKeywords: Keyword[];
  selectedAttributes: Attribute[];
}

type Action =
  | { type: 'SET_KEYWORDS'; payload: Keyword[] }
  | { type: 'SET_ATTRIBUTES'; payload: Attribute[] }
  | { type: 'SET_SELECTED_STRENGTHS'; payload: StrengthItem }
  | { type: 'SET_SELECTED_KEYWORDS'; payload: Keyword }
  | { type: 'SET_SELECTED_ATTRIBUTES'; payload: Attribute }
  | { type: 'CLEAR_SELECTED_FILTERS' };

const initialState: FiltersState = {
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

function filtersReducer(state: FiltersState, action: Action): FiltersState {
  switch (action.type) {
    case 'SET_KEYWORDS':
      return {
        ...state,
        keywords: action.payload,
        selectedKeywords: state.selectedKeywords.filter((selectedKeyword) =>
          action.payload.some((keyword) => selectedKeyword.id === keyword.id),
        ),
      };
    case 'SET_ATTRIBUTES':
      return { ...state, attributes: action.payload };
    case 'SET_SELECTED_STRENGTHS':
      return {
        ...state,
        selectedStrengths: toggleFilter(state.selectedStrengths, action.payload),
      };
    case 'SET_SELECTED_KEYWORDS':
      return {
        ...state,
        selectedKeywords: toggleFilter(state.selectedKeywords, action.payload),
      };
    case 'SET_SELECTED_ATTRIBUTES':
      return {
        ...state,
        selectedAttributes: toggleFilter(state.selectedAttributes, action.payload),
      };
    case 'CLEAR_SELECTED_FILTERS':
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

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);
  return <FiltersContext.Provider value={{ state, dispatch }}>{children}</FiltersContext.Provider>;
};

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
    setKeywords: (keywords: Keyword[]) => dispatch({ type: 'SET_KEYWORDS', payload: keywords }),
    setAttributes: (attributes: Attribute[]) => dispatch({ type: 'SET_ATTRIBUTES', payload: attributes }),
    setSelectedStrengths: (strength: StrengthItem) => dispatch({ type: 'SET_SELECTED_STRENGTHS', payload: strength }),
    setSelectedKeywords: (keyword: Keyword) => dispatch({ type: 'SET_SELECTED_KEYWORDS', payload: keyword }),
    setSelectedAttributes: (attribute: Attribute) => dispatch({ type: 'SET_SELECTED_ATTRIBUTES', payload: attribute }),
    clearSelectedFilters: () => dispatch({ type: 'CLEAR_SELECTED_FILTERS' }),
  };
};
