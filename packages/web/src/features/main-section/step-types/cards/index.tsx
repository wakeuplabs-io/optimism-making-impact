import { CardList } from '@/features/main-section/step-types/cards/card-list';
import { CardFilters } from '@/features/main-section/step-types/cards/filters-list';
import { cn, extractUniqueKeywordsFromStep } from '@/lib/utils';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useEffect } from 'react';

export function CardStep() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Container(props: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex h-full w-full flex-col gap-4', props.className)}>{props.children}</div>;
}

function Content() {
  const { step } = useMainSectionStore((state) => state);
  const { setKeywords, clear } = useFiltersStore((state) => state);

  useEffect(() => {
    if (!step) return;
    setKeywords(extractUniqueKeywordsFromStep(step));
    return () => clear();
  }, [step]);

  if (!step) {
    return <div className='flex h-full w-full items-center justify-center'>Select a step</div>;
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <CardFilters smartList={step.smartList} />
      <CardList cards={step.cards} stepId={step.id} />
    </div>
  );
}
