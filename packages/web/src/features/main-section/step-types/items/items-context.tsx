import { useItemsFilters } from '@/features/main-section/step-types/items/filters/use-items-filters';
import { CompleteItem } from '@/types/items';
import { CompleteStep } from '@/types/steps';
import { Attribute } from '@optimism-making-impact/schemas';
import { createContext, ReactNode, useContext, useMemo } from 'react';

function filterItem(data: CompleteItem, selectedAttributes: Attribute[]): boolean {
  return !selectedAttributes.length || selectedAttributes.some(({ id }) => data.attribute?.id === id);
}

interface ItemsContextType {
  step: CompleteStep;
  filteredItems: CompleteItem[];
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function useItemsStepContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}

interface ItemsStepProviderProps {
  step: CompleteStep;
  children: ReactNode;
}

export function ItemsStepProvider({ step, children }: ItemsStepProviderProps) {
  const { selectedAttributes } = useItemsFilters();
  const filteredItems = useMemo(() => step.items.filter((item) => filterItem(item, selectedAttributes)), [step.items, selectedAttributes]);

  const value = {
    step,
    filteredItems,
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}
