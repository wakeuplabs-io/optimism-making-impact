import { Attribute, Keyword } from '@optimism-making-impact/schemas';
import { FiltersStore } from '@/state/main-section-filters/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { StrengthItem, strengthItems } from '@/types';

const initialSelectedFilters = {
  selectedStrengths: [],
  selectedKeywords: [],
  selectedAttributes: [],
};

// TODO: review this component!!!! do we really need a global store?????

export const useFiltersStore = createWithMiddlewares<FiltersStore>((set, get) => ({
  ...initialSelectedFilters,
  keywords: [],
  attributes: [],
  strengths: strengthItems,
  setKeywords: (keywords: Keyword[]) => {
    set({ keywords });
    // Remove selected keywords that are not in the updated keyword list
    const updatedSelectedKeywords = get().selectedKeywords.filter((selectedKeyword) =>
      keywords.some((keyword) => selectedKeyword.id === keyword.id),
    );
    set({ selectedKeywords: updatedSelectedKeywords });
  },
  setAttributes: (attributes: Attribute[]) => set({ attributes }),
  setSelectedStrengths: (strength: StrengthItem) => {
    const selectedStrengths = toggleFilter(get().selectedStrengths, strength);
    set({ selectedStrengths });
  },
  setSelectedKeywords: (keyword: Keyword) => {
    const selectedKeywords = toggleFilter(get().selectedKeywords, keyword);
    set({ selectedKeywords });
  },
  setSelectedAttributes(attribute) {
    const selectedAttributes = toggleFilter(get().selectedAttributes, attribute);
    set({ selectedAttributes });
  },
  clearSelectedFilters() {
    set(initialSelectedFilters);
  },
}));

function toggleFilter<T extends { id: number }>(currentFilters: T[], filter: T): T[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);

  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}
