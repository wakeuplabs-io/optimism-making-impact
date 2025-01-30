import { AddCardModal } from '@/features/main-section/step-types/cards/add-card-button';
import { Card } from '@/features/main-section/step-types/cards/card';
import { useFilteredData } from '@/features/main-section/use-filtered-data';
import { extractUniqueKeywordsFromCards } from '@/lib/utils';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
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
  const isAdmin = useUserStore((state) => state.isAdmin);
  const addCard = useMainSectionStore((state) => state.addCard);

  return (
    <div className='flex flex-1 flex-col items-center gap-2'>
      {isAdmin && (
        // TODO: move above filters
        <div className='flex w-full justify-end'>
          <AddCardModal stepId={props.stepId} onClick={addCard} keywords={extractUniqueKeywordsFromCards(props.cards)} />
        </div>
      )}
      <div className='flex w-full flex-1 flex-col flex-wrap items-center gap-4 lg:flex-row lg:items-start'>
        {props.cards.map((card, i) => {
          return <Card card={card} key={`${card.id}-${i}`} />;
        })}
      </div>
    </div>
  );
}
