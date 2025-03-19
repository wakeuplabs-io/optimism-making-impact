import { CompleteStep } from '@/types/steps';
import { createContext, ReactNode, useContext } from 'react';

interface StepContextType {
  step: CompleteStep;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

// TODO: split this file contents: Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.eslint(react-refresh/only-export-components)
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
  return <StepContext.Provider value={{ step }}> {children} </StepContext.Provider>;
}
