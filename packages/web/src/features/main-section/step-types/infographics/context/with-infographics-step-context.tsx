import { StepProvider } from '@/features/main-section/step-context';
import { CompleteStep } from '@/types/steps';
import { ComponentType, FC } from 'react';

/**
 * HOC that wraps INFOGRAPHIC step top level component with step context so every child can access it directly.
 *
 * @param WrappedComponent The component to wrap. It must receive a `step` prop of type CompleteStep.
 *
 * @returns The wrapped component with step context.
 */
export function withInfographicsStepContext<P extends JSX.IntrinsicAttributes & { step: CompleteStep }>(
  WrappedComponent: ComponentType<P>,
): FC<P> {
  return (props: P) => {
    return (
      <StepProvider step={props.step}>
        <WrappedComponent {...props} />
      </StepProvider>
    );
  };
}
