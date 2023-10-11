import { Collections } from "@app/constants/collections";
import { getSnapshotCollection } from "@/modules/firebase/firestore";

import { ProductsCategory } from "../store/purcheses.types";
import { orderBy, where } from "firebase/firestore";

export const getRecommendedShoppingList = async (): Promise<
  ProductsCategory[]
> => {
  const shoppingList = await getSnapshotCollection<ProductsCategory[]>(
    Collections.RECOMMENDED_SHOPING_LIST,
    [],
    [orderBy("popularity", "desc")]
  );

  return shoppingList || [];
};
