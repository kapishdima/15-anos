import { create } from 'zustand';
import { getCategories } from '../api/categories.api';
import { EVENT_DETAILS } from '../../../app/constants/local-storage-keys';
import { persist } from 'zustand/middleware';

export type Translations = { [key: string]: string };

export type Category = {
  id: string;
  color: string;
  icon: string;
  title: Translations;
};

interface CategoriesStore {
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
        const cachedTasks = get().categories;
        if (cachedTasks && cachedTasks.length) {
          return;
        }

        set(() => ({
          loading: true,
        }));
        const eventDetails = JSON.parse(window.localStorage.getItem(EVENT_DETAILS) || '{}');
        const event = `event${eventDetails.eventNumber}`;
        const categories = await getCategories(event);

        set(() => ({ categories, loading: false }));
      },
    }),
    { name: 'categories' },
  ),
);
