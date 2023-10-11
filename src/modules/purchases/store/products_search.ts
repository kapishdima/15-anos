import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  isActiveColor,
  isActivePrice,
} from "./selectors/product_search.selector";

export type PriceRange = {
  from: number;
  to: number;
  title: string;
};

export interface ProductSearchStore {
  prices: PriceRange[];
  colors: string[];
  setPrice: (price: PriceRange) => void;
  setColor: (color: string) => void;
}

export const useProductsSearch = create<ProductSearchStore>()(
  devtools(
    persist(
      (set, get) => ({
        prices: [],
        colors: [],
        setPrice: (range: PriceRange) => {
          const prices = get().prices;
          if (isActivePrice(get(), range)) {
            set(() => ({
              prices: prices.filter((price) => price.title !== range.title),
            }));
          } else {
            set(() => ({
              prices: [...prices, range],
            }));
          }
        },
        setColor: (color: string) => {
          const colors = get().colors;
          if (isActiveColor(get(), color)) {
            set(() => ({
              colors: colors.filter((_color) => _color !== color),
            }));
          } else {
            set(() => ({
              colors: [...colors, color],
            }));
          }
        },
      }),
      {
        name: "products_search",
      }
    )
  )
);
