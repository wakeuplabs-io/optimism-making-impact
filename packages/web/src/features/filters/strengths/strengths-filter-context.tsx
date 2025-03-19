import { StrengthItem, strengthItems } from '@/types/common';
import React, { createContext } from 'react';

// TODO: split filters
interface StrengthsFilterState {
  strengths: StrengthItem[];
  selectedStrengths: StrengthItem[];
}

export const SET_SELECTED_STRENGTHS = 'SET_SELECTED_STRENGTHS';
export const CLEAR_SELECTED_STRENGTHS = 'CLEAR_SELECTED_FILTERS';

type Action = { type: typeof SET_SELECTED_STRENGTHS; payload: StrengthItem } | { type: typeof CLEAR_SELECTED_STRENGTHS };

export const initialState: StrengthsFilterState = {
  strengths: strengthItems,
  selectedStrengths: [],
};

function toggleFilter<T extends { id: number }>(currentFilters: T[], filter: T): T[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);
  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}

export function strengthsFiltersReducer(state: StrengthsFilterState, action: Action): StrengthsFilterState {
  switch (action.type) {
    case SET_SELECTED_STRENGTHS:
      return {
        ...state,
        selectedStrengths: toggleFilter(state.selectedStrengths, action.payload),
      };

    case CLEAR_SELECTED_STRENGTHS:
      return {
        ...state,
        selectedStrengths: [],
      };
    default:
      return state;
  }
}

interface StrengthsFilterContextProps {
  state: StrengthsFilterState;
  dispatch: React.Dispatch<Action>;
}

export const StrengthsFilterContext = createContext<StrengthsFilterContextProps | undefined>(undefined);
