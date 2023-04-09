import { create } from 'zustand';
import { getCategories } from '../api/categories.api';
import { EVENT_DETAILS } from '../../../app/constants/local-storage-keys';

export type Translations = { [key: string]: string };

export type Category = {
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
  return categories.find((category) => category.title['en'] === id);
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  loading: false,
  fetchCategories: async () => {
    set(() => ({
      loading: true,
    }));
    const eventDetails = JSON.parse(window.localStorage.getItem(EVENT_DETAILS) || '{}');
    const event = `event${eventDetails.eventNumber}`;
    const categories = await getCategories(event);

    set(() => ({ categories, loading: false }));
  },
}));
