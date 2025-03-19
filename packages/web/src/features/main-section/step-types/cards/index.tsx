import { AddCardModal } from '@/features/main-section/step-types/cards/add-card-button';
import { CardList } from '@/features/main-section/step-types/cards/card-list';
import { useCardsStepContext } from '@/features/main-section/step-types/cards/context/use-cards-step-context';
import { withCardsStepContext } from '@/features/main-section/step-types/cards/context/with-cards-step-context';
import { CardFilters } from '@/features/main-section/step-types/cards/filters-list';
import { useStep } from '@/hooks/use-step';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import { CompleteStep } from '@/types/steps';

interface CardStepProps {
  step: CompleteStep;
}

function CardStepComponent(props: CardStepProps) {
  const { keywords } = useCardsStepContext();
  const { addCard } = useStep();
  const { isAdminModeEnabled: adminMode } = useUser();

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

export const CardStep = withCardsStepContext(CardStepComponent);
