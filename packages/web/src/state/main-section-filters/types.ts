import { Attribute, Keyword, StrengthEnum } from '@/types';

export interface FiltersState {
  strengths: StrengthEnum[];
  selectedStrengths: StrengthEnum[];
  keywords: Keyword[];
  selectedKeywords: Keyword[];
  attributes: Attribute[];
  selectedAttributes: Attribute[];
}

export interface FiltersActions {
  setKeywords: (stepId: number) => void;
  setAttributes: (attributeFilters: Attribute[]) => void;
  setSelectedStrengths: (strenght: StrengthEnum) => void;
  setSelectedKeywords: (keyword: Keyword) => void;
  setSelectedAttributes: (attribute: Attribute) => void;
  clear: () => void;
}

export type FiltersStore = FiltersState & FiltersActions;
