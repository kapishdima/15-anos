import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductViewModal } from "./purcheses.types";
import {
  createManualShoppingProduct,
  getManualShoppingList,
} from "../api/manual_shopping.api";

export interface ShoppingStore {
  products: ProductViewModal[];
  loading: boolean;
  createLoading: boolean;
  fetchManualShoppingList: (force?: boolean) => Promise<void>;
  createManualShoppingProduct: (values: any) => void;
}

export const useManualShoppingStore = create<ShoppingStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        createLoading: false,
        fetchManualShoppingList: async (force?: boolean) => {
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
              : await getManualShoppingList();

          set(() => ({
            products,
            loading: false,
          }));
        },
        createManualShoppingProduct: async (values: any) => {
          try {
            set(() => ({ createLoading: true }));
            await createManualShoppingProduct(values);
            set(() => ({ createLoading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ createLoading: false }));
          }
        },
      }),
      {
        name: "manual_shopping_list",
        partialize: (state) => ({
          products: state.products,
        }),
      }
    )
  )
);
