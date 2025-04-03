import { CategoriesContext } from '@/contexts/categories/categories-context';
import { useContext } from 'react';

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}
