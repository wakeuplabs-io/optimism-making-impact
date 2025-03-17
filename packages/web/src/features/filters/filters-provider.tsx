import { FiltersContext, filtersReducer, initialState } from '@/features/filters/filters-context';
import { ReactNode, useReducer } from 'react';

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);
  return <FiltersContext.Provider value={{ state, dispatch }}>{children}</FiltersContext.Provider>;
};
