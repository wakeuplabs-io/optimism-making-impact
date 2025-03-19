import { AttributesFilterContext, attributeFiltersReducer, initialState } from '@/features/filters/attributes/attributes-filter-context';
import { ReactNode, useReducer } from 'react';

export const AttributesFilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(attributeFiltersReducer, initialState);
  return <AttributesFilterContext.Provider value={{ state, dispatch }}>{children}</AttributesFilterContext.Provider>;
};
