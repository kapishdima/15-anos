import { Collections } from "@app/constants/collections";
import {
  getSnapshotCollection,
  pushData,
  toDate,
} from "@/modules/firebase/firestore";

import { Category } from "../store/vendors.types";
import { orderBy } from "firebase/firestore";

export const getVendorCategories = async (): Promise<Category[]> => {
  const categories = await getSnapshotCollection<Category[]>(
    Collections.VENDOR_GROUP_CATEGORIES,
    [],
    [orderBy("number")]
  );

  console.log(categories);

  return categories || [];
};
