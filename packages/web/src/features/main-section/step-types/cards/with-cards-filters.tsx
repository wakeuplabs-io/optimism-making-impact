import { AttributesFilterProvider } from '@/features/filters/attributes/attributes-filter-provider';
import { useAttributesFilter } from '@/features/filters/attributes/use-attributes-filter';
import { KeywordsFiltersProvider } from '@/features/filters/keywords/keywords-filter-provider';
import { useKeywordsFilter } from '@/features/filters/keywords/use-keywords-filter';
import { StrengthsFilterProvider } from '@/features/filters/strengths/strengths-filter-provider';
import { useStrengthsFilter } from '@/features/filters/strengths/use-strengths-filter';
import { CompleteStep } from '@/types/steps';
import { ComponentType, FC, useEffect } from 'react';

/**
 * HOC that wraps a component with the Filters context provider and
 * adds initialization logic. On mount, it sets strengths and keywords and attributes based on the provided step prop,
 * and on unmount it clears the selected filters.
 *
 * @param WrappedComponent The component to wrap. It must receive a `step` prop of type CompleteStep.
 *
 * @returns The wrapped component with filters initialization.
 */
export function withCardsFilters<P extends JSX.IntrinsicAttributes & { step: CompleteStep }>(WrappedComponent: ComponentType<P>): FC<P> {
  const FiltersInitializationWrapper: FC<P> = (props: P) => {
    return (
      <KeywordsFiltersProvider>
        <AttributesFilterProvider>
          <StrengthsFilterProvider>
            <InnerFiltersInitializer {...props} />
          </StrengthsFilterProvider>
        </AttributesFilterProvider>
      </KeywordsFiltersProvider>
    );
  };

  const InnerFiltersInitializer: FC<P> = (props: P) => {
    const { setKeywords, clearSelectedKeywords } = useKeywordsFilter();
    const { setAttributes, clearSelectedAttributes } = useAttributesFilter();
    const { clearSelectedStrenghts } = useStrengthsFilter();

    useEffect(() => {
      return () => {
        clearSelectedStrenghts();
        clearSelectedKeywords();
        clearSelectedAttributes();
      };
    }, []);

    useEffect(() => {
      setKeywords(props.step.keywords);
      setAttributes(props.step.smartListFilter?.attributes || []);
    }, [props.step.keywords, props.step.smartListFilter]);

    return <WrappedComponent {...props} />;
  };

  return FiltersInitializationWrapper;
}
