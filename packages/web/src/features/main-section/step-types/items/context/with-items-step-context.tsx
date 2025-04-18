import { AttributesFilterProvider } from '@/features/filters/attributes/attributes-filter-provider';
import { StepProvider } from '@/features/main-section/step-context';
import { useItemsStepContext } from '@/features/main-section/step-types/items/context/use-items-step-context';
import { CompleteStep } from '@/types/steps';
import { ComponentType, FC, useEffect, useMemo } from 'react';

/**
 * HOC that wraps a component with the step and filters context providers and
 * adds initialization logic. On mount, it sets attributes based on the provided step prop,
 * and on unmount it clears the selected filters.
 *
 * @param WrappedComponent The component to wrap. It must receive a `step` prop of type CompleteStep.
 *
 * @returns The wrapped component with filters initialization.
 */
export function withItemsStepContext<P extends JSX.IntrinsicAttributes & { step: CompleteStep }>(
  WrappedComponent: ComponentType<P>,
): FC<P> {
  const ItemStepInitializationWrapper: FC<P> = (props: P) => {
    const key = useMemo(() => {
      return JSON.stringify(props.step);
    }, [props.step]);

    return (
      <AttributesFilterProvider>
        <StepProvider step={props.step} key={key}>
          <InnerInitializer {...props} />
        </StepProvider>
      </AttributesFilterProvider>
    );
  };

  const InnerInitializer: FC<P> = (props: P) => {
    // Add common logic to all whole item step here
    const { setAttributes, clearSelectedAttributes } = useItemsStepContext();

    useEffect(() => {
      return () => clearSelectedAttributes();
    }, []);

    useEffect(() => {
      setAttributes(props.step.smartListFilter?.attributes || []);
    }, [props.step.smartListFilter]);

    return <WrappedComponent {...props} />;
  };

  return ItemStepInitializationWrapper;
}
