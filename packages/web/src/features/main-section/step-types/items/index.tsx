import { withItemsStepContext } from '@/features/main-section/step-types/items/context/with-items-step-context';
import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { useStepsList } from '@/hooks/use-steps-list';
import { CompleteStep } from '@/types/steps';

interface ItemStepProps {
  step: CompleteStep;
}

function ItemsStepComponent({ step }: ItemStepProps) {
  const { handleStepEdit } = useStepsList();

  const handleStepDescriptionChange = async (description: string) => {
    try {
      handleStepEdit(step.id, { ...step, description });
    } catch (error) {
      console.error('Failed to update description', error);
    }
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <div className='flex h-full flex-col gap-6 lg:flex-row'>
        <ItemFilters />
        <div className='w-full pb-8'>
          <ItemsList editStepDescription={handleStepDescriptionChange} />
        </div>
      </div>
    </div>
  );
}

export const ItemsStep = withItemsStepContext(ItemsStepComponent);
