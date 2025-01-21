import { Card } from '@/features/main-section/step-types/cards/card';
import { CompleteCard } from '@/types';

interface CardListProps {
  cards: CompleteCard[];
}

export function CardList(props: CardListProps) {
  return (
    <div className='flex flex-col flex-wrap items-center flex-1 gap-8 lg:flex-row'>
      {props.cards.map((card, i) => {
        return <Card card={card} key={`${card.id}-${i}`} />;
      })}
    </div>
  );
}
