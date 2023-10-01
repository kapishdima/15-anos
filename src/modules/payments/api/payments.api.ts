import { Collections } from "@app/constants/collections";
import {
  deleteDocument,
  fromDate,
  getSnapshotCollection,
  pushData,
  toDate,
  updateDocument,
} from "@/modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import { Payment, PaymentViewModal } from "../store/payments";
import { PaymentDetails } from "../store/payment-details";

export type PaidStatus = "paid" | "not_paid";

export const getPayments = async (): Promise<PaymentViewModal[]> => {
  const eventId = getEventId();
  const payments = await getSnapshotCollection<Payment[]>(Collections.EVENTS, [
    eventId,
    Collections.PAYMENTS,
  ]);

  if (!payments) {
    return [];
  }

  console.log(payments);

  return payments.map((payment) => {
    console.log("was paid", payment.title, payment.wasPaid);

    return {
      ...payment,
      isCompleted: payment.wasPaid,
      date: new Date(toDate(payment.date)),
      completed: new Date(toDate(payment.completed)),
    };
  });
};

export const getPaymentDetails = async (): Promise<PaymentDetails | null> => {
  const eventId = getEventId();
  const paymentDetails = await getSnapshotCollection<PaymentDetails[]>(
    Collections.EVENTS,
    [eventId, Collections.PROFILE_DETAILS]
  );

  if (!paymentDetails) {
    return null;
  }

  return paymentDetails[0];
};

export const removePayment = async (id: string) => {
  const eventId = getEventId();
  return deleteDocument(Collections.EVENTS, [
    eventId,
    Collections.PAYMENTS,
    id,
  ]);
};

export const updatePayment = async (id: string, payload: any) => {
  const eventId = getEventId();
  return updateDocument(
    Collections.EVENTS,
    [eventId, Collections.PAYMENTS, id],
    payload
  );
};

export const createPayment = async (payload: any) => {
  const eventId = getEventId();

  const paymentData = {
    ...payload,
    wasPaid: false,
    status: "undone",
    completed: fromDate(payload.date),
    date: fromDate(payload.date),
    vendorId: "none",
    referencedShoppingItem: "",
  };
  return pushData(
    Collections.EVENTS,
    [eventId, Collections.PAYMENTS, payload.title],
    paymentData
  );
};

export const updatePaymentStatus = async (
  id: string,
  pay: number,
  status: PaidStatus
) => {
  const updatePaidStatusData =
    status === "paid" ? createPaidData(pay) : createNotPaidData(pay);

  return await updatePayment(id, updatePaidStatusData);
};

const createPaidData = (pay: number) => {
  return {
    pay,
    paid: pay,
    completed: fromDate(new Date()),
    wasPaid: true,
  };
};

const createNotPaidData = (pay: number) => {
  return {
    pay,
    paid: 0,
    completed: fromDate(new Date()),
    wasPaid: false,
  };
};
