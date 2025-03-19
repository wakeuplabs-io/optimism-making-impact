import { Card } from '@/features/main-section/step-types/cards/card';
import { useCardsStepContext } from '@/features/main-section/step-types/cards/filters/use-cards-filters';
import { useFilteredData } from '@/features/main-section/use-filtered-data';
import { CompleteCard } from '@/types/cards';

interface CardListProps {
  cards: CompleteCard[];
  stepId: number;
}

export function CardList(props: CardListProps) {
  const { selectedKeywords, selectedStrengths, selectedAttributes } = useCardsStepContext();

  const filteredCards = useFilteredData({
    data: props.cards,
    selectedStrengths,
    selectedKeywords,
    selectedAttributes,
  });

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
    <div className='w-full pt-0'>
      <div className='flex w-full flex-1 flex-col flex-wrap items-center gap-6 md:flex-row md:justify-between md:gap-8 lg:items-start lg:justify-start'>
        {props.cards.map((card, i) => (
          <Card card={card} key={`${card.id}-${i}`} stepId={props.stepId} />
        ))}
      </div>
    </div>
  );
}
