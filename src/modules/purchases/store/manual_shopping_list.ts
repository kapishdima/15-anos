import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProductViewModal } from './purcheses.types';
import { getManualShoppingList } from '../api/manual_shopping.api';

export interface ShoppingStore {
  products: ProductViewModal[];
  loading: boolean;
  fetchManualShoppingList: (force?: boolean) => Promise<void>;
}

export const useManualShoppingStore = create<ShoppingStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchManualShoppingList: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().products;

          const hasCachedProducts = Boolean(cacheProducts && cacheProducts.length);

          const products =
            hasCachedProducts && !force ? cacheProducts : await getManualShoppingList();

          set(() => ({
            products,
            loading: false,
          }));
        },
      }),
      {
        name: 'manual_shopping_list',
        partialize: (state) => ({
          products: state.products,
        }),
      },
    ),
  ),
);
