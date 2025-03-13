import { CompleteCard, Keyword } from '@/types';
import { CardStrength } from '@optimism-making-impact/schemas';
import { useMemo } from 'react';

type UseFilteredCardsProps = {
  cards: CompleteCard[];
  selectedStrengths: CardStrength[];
  selectedKeywords: Keyword[];
};

export const useFilteredCards = ({ cards, selectedStrengths, selectedKeywords }: UseFilteredCardsProps) => {
  const filtered = useMemo(() => {
    if (!selectedStrengths.length && !selectedKeywords.length) return cards;

    return cards.filter((card) => filterByStrength(card, selectedStrengths) && filterByKeywords(card, selectedKeywords));
  }, [cards, selectedStrengths, selectedKeywords]);

  return filtered;
};

function filterByStrength(card: CompleteCard, selectedStrengths: CardStrength[]) {
  return !selectedStrengths.length || selectedStrengths.includes(card.strength);
}

function filterByKeywords(card: CompleteCard, selectedKeywords: Keyword[]) {
  return !selectedKeywords.length || card.keywords.some(({ id }) => selectedKeywords.some((keyword) => keyword.id === id));
}
