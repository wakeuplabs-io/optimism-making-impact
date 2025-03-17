import { useFiltersActions } from '@/features/filters/use-filters';
import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { CompleteStep } from '@/types/steps';
import { useEffect } from 'react';

interface ItemsStepProps {
  step: CompleteStep;
}

export function ItemsStep(props: ItemsStepProps) {
  const step = useMainSectionStore((state) => state.step);
  const updateStep = useMainSectionStore((state) => state.updateStep);
  const editStepDescription = useStepsStore((state) => state.editStepDescription);

  const { setKeywords, clearSelectedFilters, setAttributes } = useFiltersActions();

  useEffect(() => {
    return () => clearSelectedFilters();
  }, []);

  useEffect(() => {
    setKeywords(props.step.keywords);
    setAttributes(props.step.smartListFilter?.attributes || []);
  }, [props.step.keywords, props.step.smartListFilter]);

  if (!step) {
    return null;
  }

  const handleStepDescriptionChange = async (description: string) => {
    try {
      await editStepDescription(step.id, description);
      updateStep({ description });
    } catch (error) {
      console.error('Failed to update description', error);
    }
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <div className='flex h-full flex-col gap-6 lg:flex-row'>
        <ItemFilters smartListFilter={step.smartListFilter} stepId={step.id} />
        <div className='w-full pb-8'>
          <ItemsList
            items={step.items}
            step={step}
            attributes={step.smartListFilter?.attributes}
            editStepDescription={handleStepDescriptionChange}
          />
        </div>
      </div>
    </div>
  );
}
