import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { ProductsParameters } from "./purcheses.types";
import { getProductsParameters } from "../api/products.api";

export interface ProductsParametersStore {
  parameters: ProductsParameters | null;
  loading: boolean;
  fetchProductsParameters: (force?: boolean) => Promise<void>;
}

export const useProductParameters = create<ProductsParametersStore>()(
  devtools(
    persist(
      (set, get) => ({
        parameters: null,
        loading: false,
        fetchProductsParameters: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().parameters;
          console.log(cacheProducts);

          const hasCachedParameters = Boolean(cacheProducts);

          const parameters =
            hasCachedParameters && !force
              ? cacheProducts
              : await getProductsParameters();

          set(() => ({
            parameters,
            loading: false,
          }));
        },
      }),
      {
        name: "products_parameters",
        partialize: (state) => ({
          parameters: state.parameters,
        }),
      }
    )
  )
);
