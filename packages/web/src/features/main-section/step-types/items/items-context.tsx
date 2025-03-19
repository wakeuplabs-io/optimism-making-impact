import { CompleteStep } from '@/types/steps';
import { createContext, ReactNode, useContext } from 'react';

interface ItemsContextType {
  step: CompleteStep;
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
  const value = {
    step,
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}
