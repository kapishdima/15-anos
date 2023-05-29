import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { addShoppingProduct, getPurchases } from '../api/purchases.api';
import { Timestamp } from 'firebase/firestore';

export type Product = {
  favourites: number;
  views: number;
  visits: number;
  purchased: number;
  addedDate: Timestamp;
  colors: string[];
  delivery: boolean;
  offer: boolean;
  returns: boolean;
  tailor: boolean;
  description: string;
  group: string;
  image: string;
  imageSmall: string;
  images: string[];
  initialDescription: string;
  initialId: string;
  initialTitle: string;
  market: string[];
  number: number;
  popularity: number;
  price: number;
  ratio: string;
  title: string;
  url: string;
};

export type ProductViewModal = Product & {
  addedData: Date;
};

export interface ShoppingStore {
  products: ProductViewModal[];
  loading: boolean;
  fetchProducts: (force?: boolean) => Promise<void>;
  addProduct: (payload: any) => Promise<void>;
}

export const useShoppingStore = create<ShoppingStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        loading: false,
        fetchProducts: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheProducts = get().products;

          const hasCachedProducts = Boolean(cacheProducts);

          const paymentDetails = hasCachedProducts && !force ? cacheProducts : await getPurchases();

          set(() => ({
            paymentDetails,
            loading: false,
          }));
        },
        addProduct: async (values: any) => {
          try {
            set(() => ({ loading: true }));
            await addShoppingProduct(values);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
      }),
      {
        name: 'shopping',
        partialize: (state) => ({
          products: state.products,
        }),
      },
    ),
  ),
);
