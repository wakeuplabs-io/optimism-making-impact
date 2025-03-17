import { FiltersContext, filtersReducer, initialState } from '@/features/filters/filters-context';
import { useFiltersActions } from '@/features/filters/use-filters';
import { CompleteStep } from '@/types/steps';
import { ComponentType, FC, useEffect, useReducer } from 'react';

/**
 * HOC that wraps a component with the Filters context provider and
 * adds initialization logic.
 *
 * On mount, it sets keywords and attributes based on the provided step prop,
 * and on unmount it clears the selected filters.
 *
 * @param WrappedComponent The component to wrap. It must receive a `step` prop with:
 *   - `keywords`: an array of Keyword.
 *   - `smartListFilter` (optional) with `attributes` as an array of Attribute.
 * @returns The wrapped component with filters initialization.
 */
export function withFiltersInitialization<P extends JSX.IntrinsicAttributes & { step: CompleteStep }>(
  WrappedComponent: ComponentType<P>,
): FC<P> {
  const FiltersInitializationWrapper: FC<P> = (props: P) => {
    const [state, dispatch] = useReducer(filtersReducer, initialState);

    return (
      <FiltersContext.Provider value={{ state, dispatch }}>
        <InnerFiltersInitializer {...props} />
      </FiltersContext.Provider>
    );
  };

  const InnerFiltersInitializer: FC<P> = (props: P) => {
    const { setKeywords, setAttributes, clearSelectedFilters } = useFiltersActions();

    useEffect(() => {
      return () => clearSelectedFilters();
    }, []);

    useEffect(() => {
      setKeywords(props.step.keywords);
      setAttributes(props.step.smartListFilter?.attributes || []);
    }, [props.step.keywords, props.step.smartListFilter]);

    return <WrappedComponent {...props} />;
  };

  return FiltersInitializationWrapper;
}
