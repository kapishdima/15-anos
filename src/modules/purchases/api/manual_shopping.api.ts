import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  pushData,
  toDate,
} from "@/modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import { Product, ProductViewModal } from "../store/purcheses.types";

export const getManualShoppingList = async (): Promise<ProductViewModal[]> => {
  const eventId = getEventId();

  const manualShoppingList = await getSnapshotCollection<Product[]>(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_SHOPPING_LIST]
    // [orderBy('addedDate')],
  );

  console.log(manualShoppingList);

  if (!manualShoppingList) {
    return [];
  }

  return manualShoppingList.map((product) => ({
    ...product,
    addedData: new Date(toDate(product.addedDate)),
  }));
};
