import { Attribute, Keyword, Strength } from '@/types';

export interface FiltersState {
  strengths: Strength[];
  selectedStrengths: Strength[];
  keywords: Keyword[];
  selectedKeywords: Keyword[];
  attributes: Attribute[];
  selectedAttributes: Attribute[];
}

export interface FiltersActions {
  setKeywords: (stepId: number) => void;
  setAttributes: (attributeFilters: Attribute[]) => void;
  setSelectedStrengths: (strenght: Strength) => void;
  setSelectedKeywords: (keyword: Keyword) => void;
  setSelectedAttributes: (attribute: Attribute) => void;
  deleteKeyword: (keywordId: number) => void;
  clear: () => void;
}

export type FiltersStore = FiltersState & FiltersActions;
