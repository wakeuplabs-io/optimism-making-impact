import { CompleteCard, CompleteItem, Keyword, StrengthItem } from '@/types';
import { Attribute } from '@optimism-making-impact/schemas';
import { useMemo } from 'react';

type Data = CompleteCard | CompleteItem;

type UseFilteredDataProps<T extends Data> = {
  data: T[];
  selectedStrengths: StrengthItem[];
  selectedKeywords: Keyword[];
  selectedAttributes: Attribute[];
};

/**
 * Filters a list of data based on selected strengths, keywords, and attributes.
 *
 * @template T - The type of data being filtered, which extends either CompleteCard or CompleteItem.
 * @param {T[]} data - The array of data items to be filtered.
 * @param {StrengthFilter[]} selectedStrengths - The selected strengths to filter by.
 * @param {Keyword[]} selectedKeywords - The selected keywords to filter by.
 * @param {Attribute[]} selectedAttributes - The selected attributes to filter by.
 * @returns {T[]} - The filtered array of data items that match the selected criteria.
 */
export const useFilteredData = <T extends Data>({
  data,
  selectedStrengths,
  selectedKeywords,
  selectedAttributes,
}: UseFilteredDataProps<T>): T[] => {
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
function filterByStrength(data: Data, selectedStrengths: StrengthItem[]): boolean {
  if ('strength' in data) {
    return !selectedStrengths.length || selectedStrengths.map((selectedStrength) => selectedStrength.value).includes(data.strength);
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
