import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { CompleteStep } from '@/types';

interface ItemStepProps {
  step: CompleteStep;
}

export function ItemsStep(props: ItemStepProps) {
  return (
    <div className={'flex flex-col gap-4'}>
      <div className='flex h-full flex-col gap-6 lg:flex-row'>
        <ItemFilters smartList={props.step.smartList} stepId={props.step.id} />
        <div className='w-full pb-8'>
          <ItemsList
            items={props.step.items}
            stepId={props.step.id}
            title={props.step.description}
            attributes={props.step.smartList?.attributes}
          />
        </div>
      </div>
    </div>
  );
}
