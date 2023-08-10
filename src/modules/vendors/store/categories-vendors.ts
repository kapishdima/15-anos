import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Category } from "./vendors.types";
import { getVendorCategories } from "../api/categories-vendor.api";

export interface VendorCategoriesStore {
  categories: Category[];
  selectedCategoryId: string | null;
  loading: boolean;
  selectCategory: (id: string) => void;
  fetchVendorCategories: (force?: boolean) => Promise<void>;
}

export const useVendorCategories = create<VendorCategoriesStore>()(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        selectedCategoryId: null,
        loading: false,
        fetchVendorCategories: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheVendorCategories = get().categories;

          const hasCachedCategories = Boolean(
            cacheVendorCategories && cacheVendorCategories.length
          );

          const categories =
            hasCachedCategories && !force
              ? cacheVendorCategories
              : await getVendorCategories();

          set(() => ({
            categories,
            selectedCategoryId: categories[0].id,
            loading: false,
          }));
        },
        selectCategory: (id: string) => {
          set(() => ({
            selectedCategoryId: id,
          }));
        },
      }),
      {
        name: "vendor_categories",
        partialize: (state) => ({
          categories: state.categories,
        }),
      }
    )
  )
);
