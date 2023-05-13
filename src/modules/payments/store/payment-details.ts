import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getPaymentDetails } from '../api/payments.api';

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
  devtools(
    persist(
      (set, get) => ({
        paymentDetails: null,
        loading: false,
        fetchPaymentDetails: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedPaymentDetails = get().paymentDetails;

          const hasCachedPaymentDetails = Boolean(cachedPaymentDetails);

          await getPaymentDetails();
          const paymentDetails =
            hasCachedPaymentDetails && !force ? cachedPaymentDetails : await getPaymentDetails();

          set(() => ({
            paymentDetails,
            loading: false,
          }));
        },
      }),
      {
        name: 'payments-details',
        partialize: (state) => ({
          paymentDetails: state.paymentDetails,
        }),
      },
    ),
  ),
);
