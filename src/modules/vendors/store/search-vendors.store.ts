import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SearchedVendor } from "./vendors.types";
import { searchVendorByPosition } from "../api/search-vendors.api";

export interface VendorCategoriesStore {
  vendors: { [key: string]: SearchedVendor[] } | null;
  vendorsForView: SearchedVendor[];
  loading: boolean;
  searchVendor: (categoryId: string, force?: boolean) => Promise<void>;
  clearVendors: () => void;
}

export const useSearchVendorStore = create<VendorCategoriesStore>()(
  devtools(
    persist(
      (set, get) => ({
        vendors: null,
        vendorsForView: [],
        loading: false,
        searchVendor: async (categoryId: string, force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheVendors = get().vendors;

          const hasCachedVendors = Boolean(
            cacheVendors && cacheVendors[categoryId]
          );
          const vendors =
            hasCachedVendors && !force
              ? cacheVendors!
              : {
                  ...cacheVendors,
                  [categoryId]: await searchVendorByPosition(categoryId),
                };

          set(() => ({
            vendors,
            vendorsForView: vendors[categoryId],
            loading: false,
          }));
        },
        clearVendors: () => {
          set(() => ({
            vendors: null,
            vendorsForView: [],
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
