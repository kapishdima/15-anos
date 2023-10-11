import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getRecommendedShoppingList } from "../api/shopping_recommended.api";

import { ProductsCategory } from "./purcheses.types";

export interface RecommendedShoppingStore {
  products: ProductsCategory[];

  loading: boolean;
  fetchRecommendedShoppingList: (force?: boolean) => Promise<void>;
}

export const useRecommendedShoppingStore = create<RecommendedShoppingStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchRecommendedShoppingList: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().products;

          const hasCachedProducts = Boolean(
            cacheProducts && cacheProducts.length
          );

          const products =
            hasCachedProducts && !force
              ? cacheProducts
              : await getRecommendedShoppingList();

          set(() => ({
            products,
            loading: false,
          }));
        },
      }),
      {
        name: "recommended_shopping",
        partialize: (state) => ({
          products: state.products,
        }),
      }
    )
  )
);
