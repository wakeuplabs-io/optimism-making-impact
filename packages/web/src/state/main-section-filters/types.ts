import { Attribute, Keyword, StrengthItem } from '@/types';

export interface FiltersState {
  strengths: StrengthItem[];
  selectedStrengths: StrengthItem[];
  keywords: Keyword[];
  selectedKeywords: Keyword[];
  attributes: Attribute[];
  selectedAttributes: Attribute[];
}

export interface FiltersActions {
  setKeywords: (keywords: Keyword[]) => void;
  setAttributes: (attributeFilters: Attribute[]) => void;
  setSelectedStrengths: (strenght: StrengthItem) => void;
  setSelectedKeywords: (keyword: Keyword) => void;
  setSelectedAttributes: (attribute: Attribute) => void;
  clearSelectedFilters: () => void;
}

export type FiltersStore = FiltersState & FiltersActions;
