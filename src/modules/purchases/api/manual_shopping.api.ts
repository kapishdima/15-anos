import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  pushData,
  toDate,
} from "@/modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import {
  Product,
  ProductTypes,
  ProductViewModal,
} from "../store/purcheses.types";
import { upload } from "@/modules/firebase/firestorage";

export const getManualShoppingList = async (): Promise<ProductViewModal[]> => {
  const eventId = getEventId();

  const manualShoppingList = await getSnapshotCollection<Product[]>(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_SHOPPING_LIST]
  );

  if (!manualShoppingList) {
    return [];
  }

  return manualShoppingList.map((product) => ({
    ...product,
    addedData: new Date(toDate(product.addedDate)),
  }));
};

export const createManualShoppingProduct = async (
  productData: any
): Promise<void> => {
  const eventId = getEventId();

  const image = await upload(
    Collections.MANUAL_SHOPPING_LIST,
    `${productData.title}.jpg`,
    productData.image
  );

  const productPayloadData = {
    ...productData,
    image,
  };

  return pushData(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_SHOPPING_LIST, productPayloadData.title],
    productPayloadData
  );
};
