import { CompleteItem } from '@/types/items';
import { CompleteStep } from '@/types/steps';
import { Attribute } from '@optimism-making-impact/schemas';
import { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';

function toggleFilter(currentFilters: Attribute[], filter: Attribute): Attribute[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);

  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}

function filterItem(data: CompleteItem, selectedAttributes: Attribute[]): boolean {
  return !selectedAttributes.length || selectedAttributes.some(({ id }) => data.attribute?.id === id);
}

interface ItemsContextType {
  step: CompleteStep;
  attributes: Attribute[];
  selectedAttributes: Attribute[];
  setSelectedAttribute: (filter: Attribute) => void;
  items: CompleteItem[];
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}

interface ItemsProviderProps {
  step: CompleteStep;
  children: ReactNode;
}

export function ItemsProvider({ step, children }: ItemsProviderProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);
  const setSelectedAttribute = useCallback(
    (attribute: Attribute) => {
      setSelectedAttributes((prevAttributes) => toggleFilter(prevAttributes, attribute));
    },
    [setSelectedAttributes],
  );

  const items = useMemo(() => step.items.filter((item) => filterItem(item, selectedAttributes)), [step.items, selectedAttributes]);

  const value = {
    step,
    attributes: step.smartListFilter ? step.smartListFilter?.attributes : [],
    selectedAttributes,
    setSelectedAttribute,
    items,
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}
