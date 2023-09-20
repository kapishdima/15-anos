import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SearchedVendor } from "./vendors.types";
import { searchVendorByPosition } from "../api/search-vendors.api";

export interface VendorCategoriesStore {
  vendors: SearchedVendor[];
  loading: boolean;
  searchVendor: (categoryId: string, force?: boolean) => Promise<void>;
  clearVendors: () => void;
}

export const useSearchVendorStore = create<VendorCategoriesStore>()(
  devtools(
    persist(
      (set, get) => ({
        vendors: [],
        loading: false,
        searchVendor: async (categoryId: string, force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheVendors = get().vendors;

          const hasCachedVendors = Boolean(cacheVendors && cacheVendors.length);
          const vendors =
            hasCachedVendors && !force
              ? cacheVendors
              : await searchVendorByPosition(categoryId);

          set(() => ({
            vendors,
            loading: false,
          }));
        },
        clearVendors: () => {
          set(() => ({
            vendors: [],
          }));
        },
      }),
      {
        name: "searched_vendors",
        partialize: (state) => ({
          vendors: state.vendors,
        }),
      }
    )
  )
);
