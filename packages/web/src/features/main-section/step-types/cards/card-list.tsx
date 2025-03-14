import { Card } from '@/features/main-section/step-types/cards/card';
import { useFilteredData } from '@/features/main-section/use-filtered-data';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { CompleteCard } from '@/types/cards';

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
    <div className='flex items-center justify-center w-full h-full'>
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
    <div className='w-full pt-0'>
      <div className='flex flex-col flex-wrap items-center flex-1 w-full gap-6 md:flex-row md:justify-between md:gap-8 lg:items-start lg:justify-start'>
        {props.cards.map((card, i) => {
          return <Card card={card} key={`${card.id}-${i}`} stepId={props.stepId} />;
        })}
      </div>
    </div>
  );
}
