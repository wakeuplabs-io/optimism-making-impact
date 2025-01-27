import { Attribute, Keyword, StrengthEnum } from '@/types';

export interface CardFiltersState {
  strengths: StrengthEnum[];
  selectedStrengths: StrengthEnum[];
  keywords: Keyword[];
  selectedKeywords: Keyword[];
  attributes: Attribute[];
  selectedAttributes: Attribute[];
}

export interface CardFiltersActions {
  setKeywords: (keywordFilters: Keyword[]) => void;
  setSelectedStrengths: (strenght: StrengthEnum) => void;
  setSelectedKeywords: (keyword: Keyword) => void;
  setSelectedAttributes: (attribute: Attribute) => void;
  clear: () => void;
}

export type CardFiltersStore = CardFiltersState & CardFiltersActions;
