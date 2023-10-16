import format from "date-fns/format";
import { GroupedPayments, PaymentViewModal, PaymentsStore } from "./payments";

import sortBy from "lodash.sortby";
import { orderBy } from "lodash";
import { PaymentDetailsStore } from "./payment-details";

export const exceptCompletedPayments = (payments: PaymentViewModal[]) => {
  return payments.filter((payment) => !payment.wasPaid);
};

export const groupByMonth = (payments: PaymentViewModal[]) => {
  const groupedPayments = payments.reduce((acc, payment) => {
    const key = format(new Date(payment.date), "MMMM, yyyy");
    acc[key] = [...(acc[key] || []), payment];

    return acc;
  }, {} as GroupedPayments);

  return groupedPayments;
};

export const groupByCategory = (payments: PaymentViewModal[]) => {
  return payments.reduce((acc, payment) => {
    const key = payment.categoryId;

    acc[key] = [...(acc[key] || []), payment];

    return acc;
  }, {} as GroupedPayments);
};

export const paymentsVM = (state: PaymentsStore) => {
  return state.paymentsForView.map((payment) => {
    return {
      ...payment,
      date: new Date(payment.date),
    };
  });
};

export const sortedByDate = (payments: PaymentViewModal[]) => {
  const sorted = orderBy(payments, (payment) => new Date(payment.date), "asc");

  return groupByMonth(sorted);
};

export const sortedByCategoriesAlphabet = (
  payments: PaymentViewModal[]
): GroupedPayments => {
  const sorted = sortBy(payments, (payment) =>
    payment.categoryId.toLowerCase()
  );
  const orderByDate = orderBy(
    sorted,
    (payment) => new Date(payment.date),
    "asc"
  );

  return groupByCategory(orderByDate);
};

export const groupedByDate = (payments: PaymentViewModal[]) => {
  return payments.reduce((acc, payment) => {
    const key = format(new Date(payment.date), "EEEE, dd MMMM yyyy");
    acc[key] = [...(acc[key] || []), payment];

    return acc;
  }, {} as GroupedPayments);
};

export const scheduledPayments = (state: PaymentsStore) => {
  return state.payments.reduce((acc, value) => {
    const paymentBudget = value.pay - value.paid;
    acc += paymentBudget;

    return acc;
  }, 0);
};

export const alreadyPaid = (state: PaymentsStore) => {
  const paid = state.payments.reduce((acc, value) => {
    const paid =
      typeof value.paid === "string" ? parseInt(value.paid) : value.paid;
    acc += paid;

    return acc;
  }, 0);

  return paid > 0 ? paid : 0;
};

export const availableBudget = (
  state: PaymentDetailsStore,
  alreadyPaid: number
) => {
  if (!state.paymentDetails || !state.paymentDetails.budget) {
    return 0;
  }

  const paid = state.paymentDetails.budget - alreadyPaid;

  return paid > 0 ? paid : 0;
};

export const paymentsAmount = (state: PaymentsStore) => {
  return state.payments.reduce((acc, value) => {
    const pay = typeof value.pay === "string" ? parseInt(value.pay) : value.pay;
    acc += pay;

    return acc;
  }, 0);
};

export const perGuest = (
  state: PaymentDetailsStore,
  paymentsAmount: number
) => {
  const guests = state.paymentDetails?.guests;

  if (!guests || guests === 0) {
    return 0;
  }

  return Math.ceil(paymentsAmount / guests);
};
