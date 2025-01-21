import { Card } from '@/features/main-section/step-types/cards/card';
import { useCardFiltersStore } from '@/state/main-section-filters/store';
import { CompleteCard } from '@/types';
import { useEffect, useState } from 'react';

interface CardListProps {
  cards: CompleteCard[];
}

export function CardList(props: CardListProps) {
  const [filteredCards, setFilteredCards] = useState(props.cards);
  const { selectedStreghts, selectedKeywords } = useCardFiltersStore((state) => state);

  useEffect(() => {
    const filtered = props.cards.filter(
      (card) =>
        (!selectedStreghts.length || selectedStreghts.includes(card.strength)) &&
        (!selectedKeywords.length || card.keywords.some(({ id }) => selectedKeywords.includes(id))),
    );
    setFilteredCards(filtered);
  }, [selectedStreghts, selectedKeywords, props.cards]);

  return (
    <div className='flex flex-col flex-wrap items-center flex-1 gap-8 lg:flex-row'>
      {filteredCards.length < 1 ? (
        <div className='flex items-center justify-center w-full h-full'>
          <p>No card match applied filters</p>
        </div>
      ) : (
        filteredCards.map((card, i) => {
          return <Card card={card} key={`${card.id}-${i}`} />;
        })
      )}
    </div>
  );
}
