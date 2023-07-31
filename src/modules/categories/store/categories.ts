import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Translated } from '@/app/utils/locale';
import { getCategories } from '../api/categories.api';

export type Category = {
  id: string;
  color: string;
  icon: string;
  title: Translated;
};

export interface CategoriesStore {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
}

export const getCategoryById = (categories: Category[], id: string) => {
  return categories.find((category) => category.id === id);
};

export const useCategoriesStore = create<CategoriesStore>()(
  persist(
    (set, get) => ({
      categories: [],
      loading: false,
      fetchCategories: async () => {
        set(() => ({
          loading: true,
        }));

        const cachedCategories = get().categories;
        const hasCacheCategories = Boolean(cachedCategories && cachedCategories.length);
        const categories = hasCacheCategories ? cachedCategories : await getCategories();

        console.log(categories);

        set(() => ({ categories, loading: false }));
      },
    }),
    { name: 'categories' },
  ),
);
