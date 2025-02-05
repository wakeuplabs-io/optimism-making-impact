import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { cn } from '@/lib/utils';
import { CompleteStep } from '@/types';

interface ItemStepProps {
  step: CompleteStep;
}

export function ItemsStep(props: ItemStepProps) {
  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <div className='flex flex-col lg:flex-row'>
        <ItemFilters smartList={props.step.smartList} stepId={props.step.id} />
        <ItemsList
          items={props.step.items}
          stepId={props.step.id}
          title={props.step.description}
          attributes={props.step.smartList?.attributes}
        />
      </div>
    </div>
  );
}
