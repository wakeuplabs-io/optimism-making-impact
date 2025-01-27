import { Attribute, CompleteCard, CompleteItem, Keyword, StrengthEnum } from '@/types';
import { useMemo } from 'react';

type Data = CompleteCard | CompleteItem;

type UseFilteredCardsProps<T extends Data> = {
  data: T[];
  selectedStrengths: StrengthEnum[];
  selectedKeywords: Keyword[];
  selectedAttributes: Attribute[];
};

export const useFilteredCards = <T extends Data>({
  data,
  selectedStrengths,
  selectedKeywords,
  selectedAttributes,
}: UseFilteredCardsProps<T>): T[] => {
  const filtered = useMemo(() => {
    if (!selectedStrengths.length && !selectedKeywords.length && !selectedAttributes.length) return data;

    return data.filter(
      (card) =>
        filterByStrength(card, selectedStrengths) &&
        filterByKeywords(card, selectedKeywords) &&
        filterByAttributes(card, selectedAttributes),
    );
  }, [data, selectedStrengths, selectedKeywords, selectedAttributes]);

  return filtered;
};

// Helpers
function filterByStrength(data: Data, selectedStrengths: StrengthEnum[]): boolean {
  if ('strength' in data) {
    return !selectedStrengths.length || selectedStrengths.includes(data.strength);
  }
  return true;
}

function filterByKeywords(data: Data, selectedKeywords: Keyword[]): boolean {
  if ('keywords' in data) {
    return !selectedKeywords.length || data.keywords.some(({ id }) => selectedKeywords.some((keyword) => keyword.id === id));
  }
  return true;
}

function filterByAttributes(data: Data, selectedAttributes: Attribute[]): boolean {
  return !selectedAttributes.length || selectedAttributes.some(({ id }) => data.attribute?.id === id);
}
