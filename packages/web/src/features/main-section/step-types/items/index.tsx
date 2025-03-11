import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';

export function ItemsStep() {
  const step = useMainSectionStore((state) => state.step);
  const updateStep = useMainSectionStore((state) => state.updateStep);
  const editStepDescription = useStepsStore((state) => state.editStepDescription);

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
