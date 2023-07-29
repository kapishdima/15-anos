import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProductViewModal } from './purcheses.types';
import { getManualWishList } from '../api/manual_wish.api';

export interface WishStore {
  products: ProductViewModal[];
  loading: boolean;
  fetchManualWishList: (force?: boolean) => Promise<void>;
}

export const useManualWishList = create<WishStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchManualWishList: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().products;

          const hasCachedProducts = Boolean(cacheProducts && cacheProducts.length);

          const products = hasCachedProducts && !force ? cacheProducts : await getManualWishList();

          set(() => ({
            products,
            loading: false,
          }));
        },
      }),
      {
        name: 'manual_wish_list',
        partialize: (state) => ({
          products: state.products,
        }),
      },
    ),
  ),
);
