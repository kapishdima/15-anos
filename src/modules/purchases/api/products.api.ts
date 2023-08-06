import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  getSnapshotDocument,
  pushData,
  toDate,
  deleteDocument,
} from "@modules/firebase/firestore";

import {
  Product,
  ProductTypes,
  ProductViewModal,
  ProductsParameters,
} from "../store/purcheses.types";
import { orderBy, where } from "firebase/firestore";
import { getEventId } from "@/modules/event";
import { upload } from "@/modules/firebase/firestorage";

export const getProductsByCategory = async (
  id: string,
  type: ProductTypes
): Promise<ProductViewModal[]> => {
  const shoppingProducts = await getSnapshotCollection<Product[]>(
    type,
    /*params*/ [Collections.PRODUCTS_LIST],
    [
      where("group", "==", id),
      where("market", "array-contains-any", ["ww"]),
      orderBy("popularity", "desc"),
    ]
  );

  if (!shoppingProducts) {
    return [];
  }

  return shoppingProducts.map((product) => ({
    ...product,
    addedData: new Date(toDate(product.addedDate)),
  }));
};

export const getProductsParameters = async (): Promise<ProductsParameters> => {
  const eventId = getEventId();
  const productsParameters = await getSnapshotDocument(Collections.EVENTS, [
    eventId,
    Collections.PRODUCTS_PARAMETERS,
  ]);
  return productsParameters;
};

export const addManualProduct = async (
  type: ProductTypes,
  productData: any
): Promise<void> => {
  const eventId = getEventId();

  // const image = await upload(productData.image);

  // console.log(image);
  const productPayloadData = {
    ...productData,
    // image,
  };

  return pushData(
    Collections.EVENTS,
    [eventId, type, productPayloadData.id || productPayloadData.title],
    productPayloadData
  );
};

export const deleteProduct = (
  id: string,
  type: ProductTypes
): Promise<void> => {
  const eventId = getEventId();

  return deleteDocument(Collections.EVENTS, [eventId, type, id]);
};
