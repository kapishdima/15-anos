import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SearchedVendor } from "./vendors.types";
import {
  addManualVendor,
  deleteVendor,
  getManualVendors,
} from "../api/vendors.api";

export interface VendorsStore {
  vendors: SearchedVendor[];
  loading: boolean;
  actionLoading: boolean;
  actionId: string | null;
  saveVendor: (vendor: SearchedVendor) => void;
  getVendor: () => SearchedVendor;
  clearVendor: () => void;
  addVendor: (vendor: SearchedVendor) => void;
  likeVendor: (vendor: SearchedVendor) => void;
  dislikeVendor: (id: string) => void;
  fetchManualVendor: (force?: boolean) => Promise<void>;
}

export const useVendorsStore = create<VendorsStore>()(
  devtools(
    persist(
      (set, get) => ({
        vendors: [],
        actionLoading: false,
        actionId: null,
        loading: false,
        saveVendor: (vendor: SearchedVendor) => {
          window.localStorage.setItem("vendor", JSON.stringify(vendor));
        },
        getVendor: () => {
          const vendor = window.localStorage.getItem("vendor");

          if (!vendor) {
            return null;
          }

          return JSON.parse(vendor);
        },
        clearVendor: () => {
          window.localStorage.removeItem("vendor");
        },
        addVendor: async (vendor: SearchedVendor) => {
          set(() => ({ loading: true }));
          await addManualVendor(vendor);
          set(() => ({ loading: false }));
        },
        likeVendor: async (vendor: SearchedVendor) => {
          set(() => ({ actionLoading: true, actionId: vendor.id }));
          await addManualVendor(vendor);
          set(() => ({ actionLoading: false, actionId: null }));
        },
        dislikeVendor: async (id: string) => {
          set(() => ({ actionLoading: true, actionId: id }));
          await deleteVendor(id);
          set(() => ({ actionLoading: false, actionId: null }));
        },
        fetchManualVendor: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cacheVendors = get().vendors;

          const hasCachedVendors = Boolean(cacheVendors && cacheVendors.length);

          const vendors =
            hasCachedVendors && !force
              ? cacheVendors
              : await getManualVendors();

          set(() => ({
            vendors,
            loading: false,
          }));
        },
      }),
      {
        name: "manual_vendors",
        partialize: (state) => ({
          vendors: state.vendors,
        }),
      }
    )
  )
);
