import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  pushData,
  toDate,
} from "@modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import { Product, ProductViewModal } from "../store/purcheses.types";
import { orderBy } from "firebase/firestore";

export const getManualWishList = async (): Promise<ProductViewModal[]> => {
  const eventId = getEventId();

  const manualWishList = await getSnapshotCollection<Product[]>(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_WISH_LIST]
  );

  if (!manualWishList) {
    return [];
  }

  return manualWishList.map((product) => ({
    ...product,
    addedData: new Date(toDate(product.addedDate)),
  }));
};
