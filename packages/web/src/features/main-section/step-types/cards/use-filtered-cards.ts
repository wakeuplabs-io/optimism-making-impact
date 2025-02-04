import { CompleteCard, Keyword, StrengthEnum } from '@/types';
import { useMemo } from 'react';

type UseFilteredCardsProps = {
  cards: CompleteCard[];
  selectedStrengths: StrengthEnum[];
  selectedKeywords: Keyword[];
};

export const useFilteredCards = ({ cards, selectedStrengths, selectedKeywords }: UseFilteredCardsProps) => {
  const filtered = useMemo(() => {
    if (!selectedStrengths.length && !selectedKeywords.length) return cards;

    return cards.filter((card) => filterByStrength(card, selectedStrengths) && filterByKeywords(card, selectedKeywords));
  }, [cards, selectedStrengths, selectedKeywords]);

  return filtered;
};

// Helpers
function filterByStrength(card: CompleteCard, selectedStrengths: StrengthEnum[]) {
  return !selectedStrengths.length || selectedStrengths.includes(card.strength);
}

function filterByKeywords(card: CompleteCard, selectedKeywords: Keyword[]) {
  return !selectedKeywords.length || card.keywords.some(({ id }) => selectedKeywords.some((keyword) => keyword.id === id));
}
