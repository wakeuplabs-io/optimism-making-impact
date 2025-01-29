import { CardFiltersStore } from '@/state/main-section-filters/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { Keyword, strengthArray, StrengthEnum } from '@/types';

export const useCardFiltersStore = createWithMiddlewares<CardFiltersStore>((set, get) => ({
  strengths: strengthArray,
  selectedStrengths: [],
  keywords: [],
  selectedKeywords: [],
  setKeywords: (keywords: Keyword[]) => set({ keywords }),
  setSelectedStrengths: (strength: StrengthEnum) => {
    const selectedStrengths = toggleFilter(get().selectedStrengths, strength);
    set({ selectedStrengths });
  },
  setSelectedKeywords: (keyword: Keyword) => {
    const selectedKeywords = toggleFilter(get().selectedKeywords, keyword);
    set({ selectedKeywords });
  },
  clear() {
    set({
      selectedStrengths: [],
      selectedKeywords: [],
      keywords: [],
    });
  },
}));

function toggleFilter<T>(currentFilters: T[], filter: T): T[] {
  return currentFilters.includes(filter) ? currentFilters.filter((current) => current !== filter) : [...currentFilters, filter];
}
