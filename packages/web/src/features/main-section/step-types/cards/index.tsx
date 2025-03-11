import { AddCardModal } from '@/features/main-section/step-types/cards/add-card-button';
import { CardList } from '@/features/main-section/step-types/cards/card-list';
import { CardFilters } from '@/features/main-section/step-types/cards/filters-list';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteStep } from '@/types';

interface CardStepProps {
  step: CompleteStep;
}

export function CardStep(props: CardStepProps) {
  const { keywords } = useFiltersStore((state) => state);
  const { addCard } = useMainSectionStore((state) => state);
  const adminMode = useUserStore((state) => state.isAdminModeEnabled);

  return (
    <div className={cn('flex flex-col gap-4')}>
      <div className='flex h-full w-full flex-col lg:flex-row lg:gap-8'>
        <div className='mb-6 flex w-full flex-col-reverse items-center gap-8 lg:mb-0 lg:flex-1 lg:flex-col lg:gap-6'>
          {adminMode && (
            <AddCardModal
              stepId={props.step.id}
              onClick={addCard}
              keywords={keywords}
              attributes={props.step.smartListFilter?.attributes}
            />
          )}
          <CardFilters smartListFilter={props.step.smartListFilter} stepId={props.step.id} />
        </div>
        <CardList cards={props.step.cards} stepId={props.step.id} />
      </div>
    </div>
  );
}
