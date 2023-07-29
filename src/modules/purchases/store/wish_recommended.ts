import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ProductsCategory } from './purcheses.types';
import { getRecommendedWishList } from '../api/wish_recommended.api';

export interface ShoppingStore {
  products: ProductsCategory[];
  loading: boolean;
  fetchRecommendedWishList: (force?: boolean) => Promise<void>;
}

export const useRecommendedWishStore = create<ShoppingStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchRecommendedWishList: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().products;

          const hasCachedProducts = Boolean(cacheProducts && cacheProducts.length);

          console.log(hasCachedProducts && !force);
          const products =
            hasCachedProducts && !force ? cacheProducts : await getRecommendedWishList();

          set(() => ({
            products,
            loading: false,
          }));
        },
      }),
      {
        name: 'recommended_wish',
        partialize: (state) => ({
          products: state.products,
        }),
      },
    ),
  ),
);
