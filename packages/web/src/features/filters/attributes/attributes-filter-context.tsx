import { Attribute } from '@optimism-making-impact/schemas';
import React, { createContext } from 'react';

interface AttributeFilterState {
  attributes: Attribute[];
  selectedAttributes: Attribute[];
}

export const SET_ATTRIBUTES = 'SET_ATTRIBUTES';
export const SET_SELECTED_ATTRIBUTES = 'SET_SELECTED_ATTRIBUTES';
export const CLEAR_SELECTED_FILTERS = 'CLEAR_SELECTED_FILTERS';

type Action =
  | { type: typeof SET_ATTRIBUTES; payload: Attribute[] }
  | { type: typeof SET_SELECTED_ATTRIBUTES; payload: Attribute }
  | { type: typeof CLEAR_SELECTED_FILTERS };

export const initialState: AttributeFilterState = {
  attributes: [],
  selectedAttributes: [],
};

function toggleFilter<T extends { id: number }>(currentFilters: T[], filter: T): T[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);
  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}

export function attributeFiltersReducer(state: AttributeFilterState, action: Action): AttributeFilterState {
  switch (action.type) {
    case SET_ATTRIBUTES:
      return { ...state, attributes: action.payload };

    case SET_SELECTED_ATTRIBUTES:
      return {
        ...state,
        selectedAttributes: toggleFilter(state.selectedAttributes, action.payload),
      };
    case CLEAR_SELECTED_FILTERS:
      return {
        ...state,
        selectedAttributes: [],
      };
    default:
      return state;
  }
}

interface AttributesFilterContextProps {
  state: AttributeFilterState;
  dispatch: React.Dispatch<Action>;
}

export const AttributesFilterContext = createContext<AttributesFilterContextProps | undefined>(undefined);
