import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Timestamp } from 'firebase/firestore';

import {
  createPayment,
  getPayments,
  removePayment,
  updatePayment,
  updatePaymentStatus,
} from '../api/payments.api';
import { exceptCompletedPayments } from './payments.selectors';

export type Translations = { [key: string]: string };

export type Statuses = 'done' | 'undone';

export type Payment = {
  id: string;
  categoryId: string;
  completed: Timestamp;
  date: Timestamp;
  notes: string;
  status: Statuses;
  suggestions: any[];
  title: Translations;
  vendorId: string;
  wasPaid: boolean;
  pay: number;
  paid: number;
};

export type PaymentViewModal = {
  id: string;
  categoryId: string;
  completed: Date;
  date: Date;
  notes: string;
  status: Statuses;
  suggestions: any[];
  title: Translations;
  vendorId: string;
  wasPaid: boolean;
  pay: number;
  paid: number;
  isCompleted: boolean;
};

export type GroupedPayments = { [key: string]: PaymentViewModal[] };

export interface PaymentsStore {
  payments: PaymentViewModal[];
  paymentsForView: PaymentViewModal[];
  total: number;
  completed: number;
  loading: boolean;
  isRemoval: boolean;
  paymentInProcessing: string;
  fetchPayments: (force?: boolean) => Promise<void>;
  togglePaymentRemoval: () => void;
  showCompleted: () => void;
  hideCompleted: () => void;
  removePayment: (id: string) => void;
  updatePayment: (id: string, payload: any) => void;
  addPayment: (payload: any) => void;
  changePaymentStatus: (id: string, pay: number) => void;
}

export const usePaymentsStore = create<PaymentsStore>()(
  devtools(
    persist(
      (set, get) => ({
        payments: [],
        paymentsForView: [],
        completed: 0,
        total: 0,
        loading: false,
        isRemoval: false,
        paymentInProcessing: '',
        fetchPayments: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedPayments = get().payments;
          const cachedPaymentsForView = get().paymentsForView;

          const hasCachePayments = Boolean(cachedPayments && cachedPayments.length);
          const hasCachedPaymentsForView = Boolean(
            cachedPaymentsForView && cachedPaymentsForView.length,
          );

          const payments = hasCachePayments && !force ? cachedPayments : await getPayments();

          const total = payments.length;
          const completed = payments.filter((payment) => payment.wasPaid).length;

          const paymentsForView =
            hasCachedPaymentsForView && !force ? cachedPaymentsForView : payments;
          const showCompleted = JSON.parse(
            new URLSearchParams(window.location.search).get('showCompleted') || 'true',
          );

          set(() => ({
            payments,
            paymentsForView: showCompleted
              ? paymentsForView
              : exceptCompletedPayments(paymentsForView),
            loading: false,
            total,
            completed,
          }));
        },

        showCompleted: () => set((state) => ({ paymentsForView: state.payments })),
        hideCompleted: () =>
          set((state) => ({ paymentsForView: exceptCompletedPayments(state.payments) })),
        togglePaymentRemoval: () =>
          set((state) => {
            return { isRemoval: !state.isRemoval };
          }),

        removePayment: async (id: string) => {
          try {
            set(() => ({ loading: true, paymentInProcessing: id }));
            await removePayment(id);

            set((state) => {
              return {
                paymentsForView: state.paymentsForView.filter((payment) => payment.id !== id),
                loading: false,
                paymentInProcessing: '',
              };
            });
          } catch (error) {
            set(() => ({ loading: false, paymentInProcessing: '' }));
          }
        },

        updatePayment: async (id: string, payload: any) => {
          try {
            set(() => ({ loading: true }));
            await updatePayment(id, payload);
            set(() => ({ loading: false }));
          } catch (error) {
            set(() => ({ loading: false }));
          }
        },

        changePaymentStatus: async (id: string, pay: number) => {
          try {
            set(() => ({ loading: true, paymentInProcessing: id }));
            await updatePaymentStatus(id, pay);
            set(() => ({ loading: false, paymentInProcessing: '' }));
          } catch (error) {
            set(() => ({ loading: false, paymentInProcessing: '' }));
          }
        },

        addPayment: async (payload: any) => {
          try {
            set(() => ({ loading: true }));
            await createPayment(payload);
            set(() => ({ loading: false }));
          } catch (error) {
            console.error(error);
            set(() => ({ loading: false }));
          }
        },
      }),
      {
        name: 'payments',
        partialize: (state) => ({
          payments: state.payments,
          pamynetsForView: state.paymentsForView,
        }),
      },
    ),
  ),
);
