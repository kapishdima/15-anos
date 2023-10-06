import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { sendEmptyStatus } from "../api/vendors.api";

export interface EmptyVendorsStore {
  searchTiers: number;
  setSearchTiers: () => void;
  clearSearchTiers: () => void;
  sendEmptyRequest: (categoryId: string) => void;
}

export const useEmptyVendorsStore = create<EmptyVendorsStore>()(
  devtools(
    persist(
      (set, get) => ({
        searchTiers: 0,
        setSearchTiers: () => {
          const storedSearchTiers = get().searchTiers;
          set(() => {
            return {
              searchTiers: storedSearchTiers + 1,
            };
          });
        },
        clearSearchTiers: () => {
          set(() => {
            return {
              searchTiers: 0,
            };
          });
        },
        sendEmptyRequest: async (categoryId: string) => {
          const storedSearchTiers = get().searchTiers;

          if (storedSearchTiers >= 2) {
            return;
          }

          await sendEmptyStatus(categoryId);
        },
      }),
      {
        name: "empty_vendors",
        partialize: (state) => ({
          searchTiers: state.searchTiers,
        }),
      }
    )
  )
);
