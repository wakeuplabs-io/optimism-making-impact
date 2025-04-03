import { Category } from '@optimism-making-impact/schemas';
import { createContext } from 'react';

interface CategoriesContextType {
  categories: Category[];
  categoriesLoading: boolean;
  selectedCategory?: Category;
  handleCategoryAdd(name: string, icon: string, roundId: number): void;
  handleCategorySelect(category: Category): void;
  handleCategoryEdit(name: string, icon: string): void;
  handleCategoryDelete(categoryId: number): void,

}

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);
