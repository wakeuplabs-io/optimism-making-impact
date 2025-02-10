import { CardList } from '@/features/main-section/step-types/cards/card-list';
import { CardFilters } from '@/features/main-section/step-types/cards/filters-list';
import { cn } from '@/lib/utils';
import { CompleteStep } from '@/types';

interface CardStepProps {
  step: CompleteStep;
}

export function CardStep(props: CardStepProps) {
  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <div className='flex flex-col h-full lg:flex-row'>
        <CardFilters smartList={props.step.smartList} stepId={props.step.id} />
        <CardList cards={props.step.cards} stepId={props.step.id} />
      </div>
    </div>
  );
}
