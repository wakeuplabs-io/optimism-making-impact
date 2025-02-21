import { FiltersStore } from '@/state/main-section-filters/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { Attribute, Keyword, Strength, strengthArray } from '@/types';

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
  strengths: strengthArray,
  setKeywords: (keywords: Keyword[]) => {
    set({ keywords });
  },
  setAttributes: (attributes: Attribute[]) => set({ attributes }),
  setSelectedStrengths: (strength: Strength) => {
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
