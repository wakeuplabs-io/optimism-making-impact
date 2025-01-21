import { CardFiltersStore } from '@/state/main-section-filters/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { Keyword, strengthArray, StrengthEnum } from '@/types';

export const useCardFiltersStore = createWithMiddlewares<CardFiltersStore>((set, get) => ({
  strengths: strengthArray,
  selectedStreghts: [],
  keywords: [],
  selectedKeywords: [],
  setKeywords: (keywords: Keyword[]) => set({ keywords }),
  setSelectedStrengths: (strenghtFilter: StrengthEnum) => {
    const currentStrengFilters = get().selectedStreghts;

    let newStrengFilters: StrengthEnum[] = [];

    if (currentStrengFilters.includes(strenghtFilter)) {
      newStrengFilters = currentStrengFilters.filter((filter) => filter !== strenghtFilter);
    } else {
      newStrengFilters = [...currentStrengFilters, strenghtFilter];
    }

    set({ selectedStreghts: newStrengFilters });
  },
  setSelectedKeywords: (keywordId: number) => {
    const currentKeywordFilters = get().selectedKeywords;

    let newKeywordFilters: number[] = [];

    if (currentKeywordFilters.includes(keywordId)) {
      newKeywordFilters = currentKeywordFilters.filter((filter) => filter !== keywordId);
    } else {
      newKeywordFilters = [...currentKeywordFilters, keywordId];
    }

    set({ selectedKeywords: newKeywordFilters });
  },
  clear() {
    set({
      selectedStreghts: [],
      selectedKeywords: [],
      keywords: [],
    });
  },
}));
