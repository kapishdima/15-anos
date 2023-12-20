import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  pushData,
  toDate,
} from "@/modules/firebase/firestore";
import { getEventId } from "@/modules/event";

import { Product, ProductViewModal } from "../store/purcheses.types";
import { uploadToPath } from "@/modules/firebase/firestorage";

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

export const createManualWishProduct = async (
  productData: any
): Promise<void> => {
  const eventId = getEventId();

  const registryCode = eventId.substring(eventId.length, eventId.length - 7);

  const uploadPath = `registry/shared/${registryCode}/${productData.title}.jpg`;
  const image = await uploadToPath(uploadPath, productData.image);

  const productPayloadData = {
    ...productData,
    image,
  };

  return pushData(
    Collections.EVENTS,
    [eventId, Collections.MANUAL_WISH_LIST, productPayloadData.title],
    productPayloadData
  );
};
