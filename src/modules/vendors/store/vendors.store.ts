import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SearchedVendor } from "./vendors.types";
import {
  addManualVendor,
  addVendorAction,
  deleteVendor,
  disslikeVendor,
  getManualVendors,
  likeVendor,
  sendVendorViewed,
  updateVendor,
} from "../api/vendors.api";
import { translated } from "@/app/utils/locale";

export interface VendorsStore {
  currentVendor: SearchedVendor | null;
  vendors: SearchedVendor[];
  vendorsForView: SearchedVendor[];
  loading: boolean;
  actionLoading: boolean;
  actionId: string | null;
  isRemoval: boolean;
  saveVendor: (vendor: SearchedVendor) => void;
  getVendor: () => SearchedVendor;
  clearVendor: () => void;
  addVendor: (vendor: SearchedVendor) => void;
  likeVendor: (vendor: SearchedVendor) => void;
  dislikeVendor: (id: string) => void;
  fetchManualVendor: (force?: boolean) => Promise<void>;
  removeManualVendor: (id: string) => Promise<void>;
  updateVendor: (id: string, vendor: any) => Promise<void>;
  toggleVendorsRemoval: () => void;
  setVendorViewed: (id: string) => void;
  searchVendor: () => void;
  sendVendorAction: (vendorId: string, action: string) => void;
  setCurrentVendor: (vendor: SearchedVendor) => void;
  clearCurrentVendor: () => void;
}

export const useVendorsStore = create<VendorsStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentVendor: null,
        vendors: [],
        vendorsForView: [],
        actionLoading: false,
        actionId: null,
        loading: false,
        isRemoval: false,
        saveVendor: (vendor: SearchedVendor) => {
          window.localStorage.setItem("vendor", JSON.stringify(vendor));
        },
        toggleVendorsRemoval: () => {
          set((state) => {
            return { isRemoval: !state.isRemoval };
          });
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
          await likeVendor(vendor.id);
          set(() => ({ actionLoading: false, actionId: null }));
        },
        dislikeVendor: async (id: string) => {
          set(() => ({ actionLoading: true, actionId: id }));
          await deleteVendor(id);
          await disslikeVendor(id);
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
            vendorsForView: vendors,
            loading: false,
          }));
        },
        updateVendor: async (id: string, vendor: any) => {
          set(() => ({ actionLoading: true, actionId: vendor.id }));
          await updateVendor(id, vendor);
          set(() => ({ actionLoading: false, actionId: null }));
        },
        removeManualVendor: async (id: string) => {
          set(() => ({ actionLoading: true, actionId: id }));
          await deleteVendor(id);
          set(() => ({ actionLoading: false, actionId: null }));
        },
        setVendorViewed: async (id: string) => {
          await sendVendorViewed(id);
        },
        searchVendor: () => {
          set((state) => {
            const query =
              new URLSearchParams(window.location.search).get("q") || "";

            const filteredVendors = state.vendors.filter(
              (vendor) =>
                translated(vendor.title)
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                vendor.contacts.some(
                  (contact) =>
                    contact.contact
                      .toLowerCase()
                      .includes(query.toLowerCase()) ||
                    contact.person?.toLowerCase().includes(query.toLowerCase())
                )
            );

            return {
              vendorsForView: filteredVendors,
            };
          });
        },
        sendVendorAction: async (vendorId: string, action: string) => {
          await addVendorAction(vendorId, action);
        },
        setCurrentVendor: (vendor) => {
          set(() => {
            return {
              currentVendor: vendor,
            };
          });
        },
        clearCurrentVendor: () => {
          set(() => {
            return {
              currentVendor: null,
            };
          });
        },
      }),
      {
        name: "manual_vendors",
        partialize: (state) => ({
          vendors: state.vendors,
          currentVendor: state.currentVendor,
        }),
      }
    )
  )
);
