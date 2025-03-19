import { CompleteStep } from '@/types/steps';
import { createContext, ReactNode, useContext } from 'react';

interface StepContextType {
  step: CompleteStep;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export function useStepContext() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStepContext must be used within an StepProvider');
  }
  return context;
}

interface StepProviderProps {
  step: CompleteStep;
  children: ReactNode;
}

export function StepProvider({ step, children }: StepProviderProps) {
  const value = {
    step,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
