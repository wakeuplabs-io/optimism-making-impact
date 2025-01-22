import { Card } from '@/features/main-section/step-types/cards/card';
import { useFilteredCards } from '@/features/main-section/step-types/cards/use-filtered-cards';
import { useCardFiltersStore } from '@/state/main-section-filters/store';
import { CompleteCard } from '@/types';

interface CardListProps {
  cards: CompleteCard[];
  stepId: number;
}

export function CardList(props: CardListProps) {
  const { selectedStrengths, selectedKeywords } = useCardFiltersStore((state) => state);

  const filteredCards = useFilteredCards({ cards: props.cards, selectedStrengths, selectedKeywords });

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
  // const isAdmin = useUserStore((state) => state.isAdmin);
  // const addCard = useMainSectionStore((state) => state.addCard);

  return (
    <div className='flex flex-col items-center flex-1 gap-2'>
      {/* {isAdmin && (
        <div className='flex justify-end w-full'>
          <AddCardButton stepId={props.stepId} onClick={addCard} />
        </div>
      )} */}
      <div className='flex flex-col flex-wrap items-center flex-1 gap-4 lg:flex-row'>
        {props.cards.map((card, i) => {
          return <Card card={card} key={`${card.id}-${i}`} />;
        })}
      </div>
    </div>
  );
}
