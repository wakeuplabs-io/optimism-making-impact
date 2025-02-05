import { toast } from '@/hooks/use-toast';
import { KeywordsService } from '@/services/keywords/service';
import { FiltersStore } from '@/state/main-section-filters/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { Attribute, Keyword, Strength, strengthArray } from '@/types';
import { AxiosError } from 'axios';

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
  deleteKeyword(keywordId: number) {
    optimisticUpdate({
      getStateSlice: () => get().keywords,
      updateFn: (keywords) => keywords.filter((keyword) => keyword.id !== keywordId),
      setStateSlice: (keywords) => set({ keywords }),
      apiCall: () => KeywordsService.deleteOne(keywordId),
      onError: (error) => {
        const title = 'Failed to delete keyword';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        toast({ title: 'Keyword deleted', description: 'Keyword deleted successfully' });
      },
    });
  },
  clear() {
    set(initialFilters);
  },
}));

function toggleFilter<T extends { id: number }>(currentFilters: T[], filter: T): T[] {
  const isSelected = currentFilters.some((current) => current.id === filter.id);

  return isSelected ? currentFilters.filter((current) => current.id !== filter.id) : [...currentFilters, filter];
}
