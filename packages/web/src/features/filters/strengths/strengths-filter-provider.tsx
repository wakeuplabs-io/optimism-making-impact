import { initialState, StrengthsFilterContext, strengthsFiltersReducer } from '@/features/filters/strengths/strengths-filter-context';
import { ReactNode, useReducer } from 'react';

export const StrengthsFilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(strengthsFiltersReducer, initialState);
  return <StrengthsFilterContext.Provider value={{ state, dispatch }}>{children}</StrengthsFilterContext.Provider>;
};
