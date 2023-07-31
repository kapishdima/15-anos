import { CategoriesStore } from './categories';

export const getCategoryById = (state: CategoriesStore, id: string) => {
  return state.categories.find((category) => category.id === id);
};
