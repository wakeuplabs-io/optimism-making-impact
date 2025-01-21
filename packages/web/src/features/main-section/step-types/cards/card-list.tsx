import { Card } from '@/features/main-section/step-types/cards/card';
import { useFilteredCards } from '@/features/main-section/step-types/cards/use-filtered-cards';
import { useCardFiltersStore } from '@/state/main-section-filters/store';
import { CompleteCard } from '@/types';

interface CardListProps {
  cards: CompleteCard[];
}

export function CardList(props: CardListProps) {
  const { selectedStrengths, selectedKeywords } = useCardFiltersStore((state) => state);

  const filteredCards = useFilteredCards({ cards: props.cards, selectedStrengths, selectedKeywords });

  return (
    <div className='flex flex-col flex-wrap items-center flex-1 gap-8 lg:flex-row'>
      {filteredCards.length < 1 ? (
        <div className='flex items-center justify-center w-full h-full'>
          <p>No card matches applied filters</p>
        </div>
      ) : (
        filteredCards.map((card, i) => {
          return <Card card={card} key={`${card.id}-${i}`} />;
        })
      )}
    </div>
  );
}
