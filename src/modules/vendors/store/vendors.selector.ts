import sortBy from "lodash.sortby";
import { VendorsStore } from "./vendors.store";
import { SearchedVendor } from "./vendors.types";

export const isVendorLiked = (id: string, state: VendorsStore) => {
  return state.vendors.find((vendor) => vendor.id === id);
};

export const groupByCategory = (state: VendorsStore) => {
  const sorted = sortBy(state.vendorsForView, (vendor) =>
    vendor.categoryId.toLowerCase()
  );

  return sorted.reduce((acc, vendor) => {
    const key = vendor.categoryId;

    acc[key] = [...(acc[key] || []), vendor];

    return acc;
  }, {} as { [key: string]: SearchedVendor[] });
};
