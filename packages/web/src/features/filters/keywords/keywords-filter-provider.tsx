import { initialState, KeywordsFilterContext, keywordsFilterReducer } from '@/features/filters/keywords/keywords-filter-context';
import { ReactNode, useReducer } from 'react';

export const KeywordsFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(keywordsFilterReducer, initialState);
  return <KeywordsFilterContext.Provider value={{ state, dispatch }}>{children}</KeywordsFilterContext.Provider>;
};
