import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Timestamp } from "firebase/firestore";

import {
  PaidStatus,
  createPayment,
  getPayments,
  removePayment,
  updatePayment,
  updatePaymentStatus,
} from "../api/payments.api";
import { exceptCompletedPayments } from "./payments.selectors";
import { translated } from "@/app/utils/locale";

export type Translations = { [key: string]: string };

export type Statuses = "done" | "undone";

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
  completed: Date | string;
  date: Date;
  notes: string;
  status: Statuses;
  suggestions: any[];
  title: any;
  vendorId: string;
  wasPaid: boolean;
  pay: number;
  paid: number;
  isCompleted: boolean;
};

export type GroupedPayments = { [key: string]: PaymentViewModal[] };

export interface PaymentsStore {
  currentPayment: PaymentViewModal | null;
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
  changePaymentStatus: (id: string, pay: number, status: PaidStatus) => void;
  setCurrentPayment: (payment: PaymentViewModal) => void;
  clearCurrentPayment: () => void;
}

export const usePaymentsStore = create<PaymentsStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentPayment: null,
        payments: [],
        paymentsForView: [],
        completed: 0,
        total: 0,
        loading: false,
        isRemoval: false,
        paymentInProcessing: "",
        fetchPayments: async (force?: boolean) => {
          set(() => ({
            loading: true,
          }));

          const cachedPayments = get().payments;
          const cachedPaymentsForView = get().paymentsForView;

          const hasCachePayments = Boolean(
            cachedPayments && cachedPayments.length
          );
          const hasCachedPaymentsForView = Boolean(
            cachedPaymentsForView && cachedPaymentsForView.length
          );

          const payments =
            hasCachePayments && !force ? cachedPayments : await getPayments();

          const total = payments.length;
          const completed = payments.filter(
            (payment) => payment.wasPaid
          ).length;

          const paymentsForView =
            hasCachedPaymentsForView && !force
              ? cachedPaymentsForView
              : payments;
          const showCompleted = JSON.parse(
            new URLSearchParams(window.location.search).get("showCompleted") ||
              "true"
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

        showCompleted: () =>
          set((state) => ({ paymentsForView: state.payments })),
        hideCompleted: () =>
          set((state) => ({
            paymentsForView: exceptCompletedPayments(state.payments),
          })),
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
                loading: false,
                paymentInProcessing: "",
              };
            });
          } catch (error) {
            set(() => ({ loading: false, paymentInProcessing: "" }));
          }
        },

        updatePayment: async (id: string, payload: any) => {
          try {
            set(() => ({ loading: true }));
            const payment = get().payments.find(
              (payment) => payment.id === id
            )!;

            const updatePaymentData = {
              ...payload,
              wasPaid:
                (payload.paid || payment.paid) === (payload.pay || payment.pay),
            };
            await updatePayment(id, updatePaymentData);

            set(() => ({ loading: false }));
          } catch (error) {
            set(() => ({ loading: false }));
          }
        },

        changePaymentStatus: async (
          id: string,
          pay: number,
          status: PaidStatus
        ) => {
          try {
            set(() => ({ loading: true, paymentInProcessing: id }));
            await updatePaymentStatus(id, pay, status);
            set(() => ({ loading: false, paymentInProcessing: "" }));
          } catch (error) {
            set(() => ({ loading: false, paymentInProcessing: "" }));
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
        setCurrentPayment: (payment: PaymentViewModal) => {
          set(() => {
            return {
              currentPayment: { ...payment, title: translated(payment.title) },
            };
          });
        },
        clearCurrentPayment: () => {
          set(() => {
            return {
              currentPayment: null,
            };
          });
        },
      }),
      {
        name: "payments",
        partialize: (state) => ({
          payments: state.payments,
          pamynetsForView: state.paymentsForView,
          currentPayment: state.currentPayment,
        }),
      }
    )
  )
);
