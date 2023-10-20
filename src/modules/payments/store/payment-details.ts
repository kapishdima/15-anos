import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getPaymentDetails } from "../api/payments.api";

export type PaymentDetails = {
  budget: number;
  currency: string;
  guests: number;
};

export interface PaymentDetailsStore {
  paymentDetails: PaymentDetails | null;
  loading: boolean;
  fetchPaymentDetails: () => Promise<void>;
}

export const usePaymentDetailsStore = create<PaymentDetailsStore>()(
  devtools((set, get) => ({
    paymentDetails: null,
    loading: false,
    fetchPaymentDetails: async (force?: boolean) => {
      set(() => ({
        loading: true,
      }));

      const paymentDetails = await getPaymentDetails();

      set(() => ({
        paymentDetails,
        loading: false,
      }));
    },
  }))
);
