import { StepsContext } from '@/contexts/steps/steps-context';
import { useContext } from 'react';

export function useStepsList() {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error('useStepsList must be used within a StepsProvider');
  }
  return context;
}
