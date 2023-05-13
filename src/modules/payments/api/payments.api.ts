import { Collections } from '@app/constants/collections';
import {
  deleteDocument,
  fromDate,
  getSnapshot,
  pushData,
  toDate,
  updateDocument,
} from '@modules/firebase/firestore';
import { getEventId } from '@/modules/event';

import { Payment, PaymentViewModal } from '../store/payments';
import { PaymentDetails } from '../store/payment-details';

export const getPayments = async (): Promise<PaymentViewModal[]> => {
  const eventId = getEventId();
  const payments = await getSnapshot<Payment[]>(Collections.EVENTS, [
    eventId,
    Collections.PAYMENTS,
  ]);

  if (!payments) {
    return [];
  }

  return payments.map((payment) => ({
    ...payment,
    isCompleted: payment.paid === payment.pay,
    date: new Date(toDate(payment.date)),
    completed: new Date(toDate(payment.completed)),
  }));
};

export const getPaymentDetails = async (): Promise<PaymentDetails | null> => {
  const eventId = getEventId();
  const paymentDetails = await getSnapshot<PaymentDetails>(Collections.EVENTS, [
    eventId,
    Collections.PROFILE_DETAILS,
  ]);

  if (!paymentDetails) {
    return null;
  }

  return paymentDetails;
};

export const removePayment = async (id: string) => {
  const eventId = getEventId();
  return deleteDocument(Collections.EVENTS, [eventId, Collections.PAYMENTS, id]);
};

export const updatePayment = async (id: string, payload: any) => {
  const eventId = getEventId();
  return updateDocument(Collections.EVENTS, [eventId, Collections.PAYMENTS, id], payload);
};

export const createPayment = async (payload: any) => {
  const eventId = getEventId();

  const paymentData = {
    ...payload,
    wasPaid: false,
    status: 'undone',
    completed: fromDate(payload.date),
    date: fromDate(payload.date),
    vendorId: 'none',
    referencedShoppingItem: '',
  };
  return pushData(Collections.EVENTS, [eventId, Collections.PAYMENTS, payload.title], paymentData);
};

export const updatePaymentStatus = async (id: string, pay: number) => {
  const updatePaidStatusData = {
    pay,
    paid: pay,
    completed: fromDate(new Date()),
    wasPaid: true,
  };

  return await updatePayment(id, updatePaidStatusData);
};
