import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { ProductTypes, ProductViewModal } from "./purcheses.types";
import {
  addManualProduct,
  deleteProduct,
  getProductsByCategory,
} from "../api/products.api";
import { PriceRange } from "./products_search";
import orderBy from "lodash/orderBy";

type ProductsFilters = {
  prices: PriceRange[];
  colors: string[];
};
export interface ProductsStore {
  productsForView: ProductViewModal[];
  products: ProductViewModal[];
  loading: boolean;
  actionLoading: boolean;

  addProduct: (type: ProductTypes, payload: any) => Promise<void>;
  deleteProduct: (type: ProductTypes, id: string) => Promise<void>;
  getProduct: () => ProductViewModal;
  saveProduct: (product: ProductViewModal) => void;
  clearProduct: () => void;
  fetchProductsByCategory: (
    id: string,
    type: ProductTypes,
    force?: boolean
  ) => Promise<void>;
  searchProducts: (filters: ProductsFilters) => void;
  sortProducts: (type: "asc" | "desc", by: string) => void;
}

export const useProductsStore = create<ProductsStore>()(
  devtools(
    persist(
      (set, get) => ({
        productsForView: [],
        products: [],
        loading: false,
        actionLoading: false,
        fetchProductsByCategory: async (
          id: string,
          type: ProductTypes,
          force?: boolean
        ) => {
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
              : await getProductsByCategory(id, type);

          set(() => ({
            products,
            productsForView: products,
            loading: false,
          }));
        },
        searchProducts: (filters: ProductsFilters) => {
          const products = get().products;

          const filteredProducts = products.filter((product) => {
            const withPrice = filters.prices.some((price, index) => {
              if (index === filters.prices.length - 1) {
                return product.price >= price.from;
              }
              return product.price >= price.from && product.price <= price.to;
            });

            const withColors = product.colors?.some((color) =>
              filters.colors.includes(color)
            );

            return withPrice && withColors;
          });
          set(() => ({
            productsForView: filteredProducts,
            loading: false,
          }));
        },
        sortProducts: (type: "asc" | "desc", by: string) => {
          const products = get().products;

          set(() => ({
            productsForView: orderBy<any>(products, by, type),
            loading: false,
          }));
        },
        saveProduct: (product) => {
          window.localStorage.setItem("product", JSON.stringify(product));
        },
        clearProduct: () => {
          window.localStorage.removeItem("product");
        },
        getProduct: () => {
          const productJson = window.localStorage.getItem("product");

          if (!productJson) {
            return null;
          }

          return JSON.parse(productJson);
        },
        addProduct: async (type: ProductTypes, values: any) => {
          try {
            set(() => ({ actionLoading: true }));
            await addManualProduct(type, values);
            set(() => ({ actionLoading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ actionLoading: false }));
          }
        },
        deleteProduct: async (type: ProductTypes, id: string) => {
          try {
            set(() => ({ actionLoading: true }));
            await deleteProduct(id, type);
            set(() => ({ actionLoading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ actionLoading: false }));
          }
        },
      }),
      {
        name: "products",
        partialize: (state) => ({
          products: state.products,
        }),
      }
    )
  )
);
