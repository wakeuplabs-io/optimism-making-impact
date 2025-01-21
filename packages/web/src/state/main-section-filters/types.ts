import { Keyword, StrengthEnum } from '@/types';

export interface CardFiltersState {
  strengths: StrengthEnum[];
  selectedStreghts: StrengthEnum[];
  keywords: Keyword[];
  selectedKeywords: number[];
}

export interface CardFiltersActions {
  setKeywords: (keywordFilters: Keyword[]) => void;
  setSelectedStrengths: (strenght: StrengthEnum) => void;
  setSelectedKeywords: (keywordId: number) => void;
  clear: () => void;
}

export type CardFiltersStore = CardFiltersState & CardFiltersActions;
