import { Card } from '@/features/main-section/step-types/cards/card';
import { useFilteredData } from '@/features/main-section/use-filtered-data';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { CompleteCard } from '@/types';

interface CardListProps {
  cards: CompleteCard[];
  stepId: number;
}

export function CardList(props: CardListProps) {
  const { selectedStrengths, selectedKeywords, selectedAttributes } = useFiltersStore((state) => state);

  const filteredCards = useFilteredData({ data: props.cards, selectedStrengths, selectedKeywords, selectedAttributes });

  if (!filteredCards.length) return <EmptyState />;

  return <List cards={filteredCards} stepId={props.stepId} />;
}

function EmptyState() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <p>No card matches applied filters</p>
    </div>
  );
}

interface ListProps {
  cards: CompleteCard[];
  stepId: number;
}

function List(props: ListProps) {
  return (
    <div className='w-full lg:px-8 lg:pb-8 pt-0'>
      <div className='flex w-full flex-1 flex-col flex-wrap items-center gap-6 md:gap-8 md:flex-row md:justify-between lg:justify-start lg:items-start'>
        {props.cards.map((card, i) => {
          return <Card card={card} key={`${card.id}-${i}`} stepId={props.stepId} />;
        })}
      </div>
    </div>
  );
}
