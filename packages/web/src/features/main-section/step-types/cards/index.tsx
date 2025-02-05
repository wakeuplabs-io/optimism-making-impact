import { CardList } from '@/features/main-section/step-types/cards/card-list';
import { CardFilters } from '@/features/main-section/step-types/cards/filters-list';
import { cn } from '@/lib/utils';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { CompleteStep } from '@/types';
import { useEffect } from 'react';

interface CardStepProps {
  step: CompleteStep;
}

export function CardStep(props: CardStepProps) {
  const { setKeywords, clear, setAttributes } = useFiltersStore((state) => state);

  useEffect(() => {
    return () => clear();
  }, []);

  useEffect(() => {
    setKeywords(props.step.id);
    setAttributes(props.step.smartList?.attributes || []);
  }, [props.step.id, props.step.cards]);

  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <div className='flex flex-col lg:flex-row'>
        <CardFilters smartList={props.step.smartList} stepId={props.step.id} />
        <CardList cards={props.step.cards} stepId={props.step.id} />
      </div>
    </div>
  );
}
