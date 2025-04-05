import { AttributesFilterProvider } from '@/features/filters/attributes/attributes-filter-provider';
import { KeywordsFiltersProvider } from '@/features/filters/keywords/keywords-filter-provider';
import { StrengthsFilterProvider } from '@/features/filters/strengths/strengths-filter-provider';
import { StepProvider } from '@/features/main-section/step-context';
import { useCardsStepContext } from '@/features/main-section/step-types/cards/context/use-cards-step-context';
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
export function withCardsStepContext<P extends JSX.IntrinsicAttributes & { step: CompleteStep }>(
  WrappedComponent: ComponentType<P>,
): FC<P> {
  const CardsStepInitializationWrapper: FC<P> = (props: P) => {
    const key = useMemo(() => {
      return JSON.stringify(props.step);
    }, [props.step]);

    return (
      <KeywordsFiltersProvider>
        <AttributesFilterProvider>
          <StrengthsFilterProvider>
            <StepProvider step={props.step} key={key}>
              <InnerInitializer {...props} />
            </StepProvider>
          </StrengthsFilterProvider>
        </AttributesFilterProvider>
      </KeywordsFiltersProvider>
    );
  };

  const InnerInitializer: FC<P> = (props: P) => {
    const { setKeywords, clearSelectedKeywords, setAttributes, clearSelectedAttributes, clearSelectedStrenghts } = useCardsStepContext();

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

  return CardsStepInitializationWrapper;
}
