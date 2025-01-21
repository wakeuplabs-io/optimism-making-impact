import { Keyword, StrengthEnum } from '@/types';

export interface CardFiltersState {
  strengths: StrengthEnum[];
  selectedStrengths: StrengthEnum[];
  keywords: Keyword[];
  selectedKeywords: Keyword[];
}

export interface CardFiltersActions {
  setKeywords: (keywordFilters: Keyword[]) => void;
  setSelectedStrengths: (strenght: StrengthEnum) => void;
  setSelectedKeywords: (keyword: Keyword) => void;
  clear: () => void;
}

export type CardFiltersStore = CardFiltersState & CardFiltersActions;
