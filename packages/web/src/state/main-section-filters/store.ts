import { toast } from '@/hooks/use-toast';
import { KeywordsService } from '@/services/keywords/service';
import { FiltersStore } from '@/state/main-section-filters/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { Attribute, Keyword, strengthArray, StrengthEnum } from '@/types';

const initialFilters = {
  selectedStrengths: [],
  selectedKeywords: [],
  selectedAttributes: [],
  keywords: [],
  attributes: [],
};

export const useFiltersStore = createWithMiddlewares<FiltersStore>((set, get) => ({
  ...initialFilters,
  strengths: strengthArray,
  setKeywords: async (stepId: number) => {
    try {
      const response = await KeywordsService.getByStepId(stepId);
      set({ keywords: response.data.keywords });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to fetch keywords', description: 'Please try again', variant: 'destructive' });
    }
  },
  setAttributes: (attributes: Attribute[]) => set({ attributes }),
  setSelectedStrengths: (strength: StrengthEnum) => {
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
  clear() {
    set(initialFilters);
  },
}));

function toggleFilter<T>(currentFilters: T[], filter: T): T[] {
  return currentFilters.includes(filter) ? currentFilters.filter((current) => current !== filter) : [...currentFilters, filter];
}
