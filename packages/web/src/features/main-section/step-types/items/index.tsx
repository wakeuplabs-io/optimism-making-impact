import { ItemsProvider } from './items-context';
import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { CompleteStep } from '@/types/steps';

interface ItemStepProps {
  step: CompleteStep;
}

export function ItemsStep({ step }: ItemStepProps) {
  const updateStep = useMainSectionStore((state) => state.updateStep);
  const editStepDescription = useStepsStore((state) => state.editStepDescription);

  const handleStepDescriptionChange = async (description: string) => {
    try {
      await editStepDescription(props.step.id, description);
      updateStep({ description });
    } catch (error) {
      console.error('Failed to update description', error);
    }
  };

  return (
    <ItemsProvider step={step}>
      <div className={'flex flex-col gap-4'}>
        <div className='flex h-full flex-col gap-6 lg:flex-row'>
          <ItemFilters />
          <div className='w-full pb-8'>
            <ItemsList editStepDescription={handleStepDescriptionChange} />
          </div>
        </div>
      </div>
    </ItemsProvider>
  );
}
