import { AttributesFilterProvider } from '@/features/filters/attributes/attributes-filter-provider';
import { useItemsFilters } from '@/features/main-section/step-types/items/filters/use-items-filters';
import { CompleteStep } from '@/types/steps';
import { ComponentType, FC, useEffect } from 'react';

/**
 * HOC that wraps a component with the Filters context provider and
 * adds initialization logic. On mount, it sets attributes based on the provided step prop,
 * and on unmount it clears the selected filters.
 *
 * @param WrappedComponent The component to wrap. It must receive a `step` prop of type CompleteStep.
 *
 * @returns The wrapped component with filters initialization.
 */
export function withItemsFilters<P extends JSX.IntrinsicAttributes & { step: CompleteStep }>(WrappedComponent: ComponentType<P>): FC<P> {
  const FiltersInitializationWrapper: FC<P> = (props: P) => {
    return (
      <AttributesFilterProvider>
        <InnerFiltersInitializer {...props} />
      </AttributesFilterProvider>
    );
  };

  const InnerFiltersInitializer: FC<P> = (props: P) => {
    const { setAttributes, clearSelectedAttributes } = useItemsFilters();

    useEffect(() => {
      return () => {
        clearSelectedAttributes();
      };
    }, []);

    useEffect(() => {
      setAttributes(props.step.smartListFilter?.attributes || []);
    }, [props.step.smartListFilter]);

    return <WrappedComponent {...props} />;
  };

  return FiltersInitializationWrapper;
}
