import { Collections } from '@app/constants/collections';
import {
  deleteDocument,
  fromDate,
  getSnapshotCollection,
  pushData,
  toDate,
  updateDocument,
} from '@modules/firebase/firestore';
import { getEventId } from '@/modules/event';

import { Product, ProductViewModal } from '../store/shopping';

export const getPurchases = async (): Promise<ProductViewModal[]> => {
  const eventId = getEventId();
  const purchases = await getSnapshotCollection<Product[]>(Collections.EVENTS, [
    eventId,
    Collections.SHOPPING_LIST,
  ]);

  console.log(purchases);

  if (!purchases) {
    return [];
  }

  return purchases.map((purchase) => ({
    ...purchase,
    addedData: new Date(toDate(purchase.addedDate)),
  }));
};

export const addShoppingProduct = async (productData: any): Promise<void> => {
  const eventId = getEventId();

  return pushData(
    Collections.EVENTS,
    [eventId, Collections.SHOPPING_LIST, productData.title],
    productData,
  );
};

// export const getPaymentDetails = async (): Promise<PaymentDetails | null> => {
//   const eventId = getEventId();
//   const paymentDetails = await getSnapshotCollection<PaymentDetails[]>(Collections.EVENTS, [
//     eventId,
//     Collections.PROFILE_DETAILS,
//   ]);

//   if (!paymentDetails) {
//     return null;
//   }

//   return paymentDetails[0];
// };

// export const removePayment = async (id: string) => {
//   const eventId = getEventId();
//   return deleteDocument(Collections.EVENTS, [eventId, Collections.PAYMENTS, id]);
// };

// export const updatePayment = async (id: string, payload: any) => {
//   const eventId = getEventId();
//   return updateDocument(Collections.EVENTS, [eventId, Collections.PAYMENTS, id], payload);
// };

// export const createPayment = async (payload: any) => {
//   const eventId = getEventId();

//   const paymentData = {
//     ...payload,
//     wasPaid: false,
//     status: 'undone',
//     completed: fromDate(payload.date),
//     date: fromDate(payload.date),
//     vendorId: 'none',
//     referencedShoppingItem: '',
//   };
//   return pushData(Collections.EVENTS, [eventId, Collections.PAYMENTS, payload.title], paymentData);
// };

// export const updatePaymentStatus = async (id: string, pay: number) => {
//   const updatePaidStatusData = {
//     pay,
//     paid: pay,
//     completed: fromDate(new Date()),
//     wasPaid: true,
//   };

//   return await updatePayment(id, updatePaidStatusData);
// };
