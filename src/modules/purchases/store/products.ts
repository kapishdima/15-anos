import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ProductTypes, ProductViewModal } from './purcheses.types';
import { addManualProduct, deleteProduct, getProductsByCategory } from '../api/products.api';

export interface ProductsStore {
  products: ProductViewModal[];
  loading: boolean;

  addProduct: (type: ProductTypes, payload: any) => Promise<void>;
  deleteProduct: (type: ProductTypes, id: string) => Promise<void>;
  getProduct: () => ProductViewModal;
  saveProduct: (product: ProductViewModal) => void;
  clearProduct: () => void;
  fetchProductsByCategory: (id: string, type: ProductTypes, force?: boolean) => Promise<void>;
}

export const useProductsStore = create<ProductsStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchProductsByCategory: async (id: string, type: ProductTypes, force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().products;

          const hasCachedProducts = Boolean(cacheProducts && cacheProducts.length);

          const products =
            hasCachedProducts && !force ? cacheProducts : await getProductsByCategory(id, type);

          set(() => ({
            products,
            loading: false,
          }));
        },
        saveProduct: (product) => {
          window.localStorage.setItem('product', JSON.stringify(product));
        },
        clearProduct: () => {
          window.localStorage.removeItem('product');
        },
        getProduct: () => {
          const productJson = window.localStorage.getItem('product');

          if (!productJson) {
            return null;
          }

          return JSON.parse(productJson);
        },
        addProduct: async (type: ProductTypes, values: any) => {
          try {
            set(() => ({ loading: true }));
            await addManualProduct(type, values);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
        deleteProduct: async (type: ProductTypes, id: string) => {
          try {
            set(() => ({ loading: true }));
            await deleteProduct(id, type);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
      }),
      {
        name: 'products',
        partialize: (state) => ({
          products: state.products,
        }),
      },
    ),
  ),
);
