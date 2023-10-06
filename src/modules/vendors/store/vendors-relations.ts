import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { TaskViewModal } from "@/modules/tasks/store/tasks";
import { PaymentViewModal } from "@/modules/payments";
import {
  getVendorPayments,
  getVendorTasks,
} from "../api/vendors-relations.api";

export interface EmptyVendorsStore {
  tasks: TaskViewModal[];
  payments: PaymentViewModal[];
  loading: boolean;
  fetchVendorTasks: (vendorId: string) => void;
  fetchVendorPayments: (vendorId: string) => void;
}

export const useVendorsRelations = create<EmptyVendorsStore>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        payments: [],
        loading: false,
        fetchVendorTasks: async (vendorId: string) => {
          set(() => {
            return {
              loading: true,
            };
          });
          const tasks = await getVendorTasks(vendorId);
          set(() => {
            return {
              loading: false,
              tasks,
            };
          });
        },
        fetchVendorPayments: async (vendorId: string) => {
          set(() => {
            return {
              loading: true,
            };
          });
          const payments = await getVendorPayments(vendorId);
          set(() => {
            return {
              payments,
              loading: false,
            };
          });
        },
      }),
      {
        name: "vendors_relations",
        partialize: (state) => ({
          task: state.tasks,
          payments: state.payments,
        }),
      }
    )
  )
);
