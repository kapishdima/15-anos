import { VendorsStore } from "./vendors.store";
import { SearchedVendor } from "./vendors.types";

export const isVendorLiked = (id: string, state: VendorsStore) => {
  return state.vendors.find((vendor) => vendor.id === id);
};

export const groupByCategory = (state: VendorsStore) => {
  return state.vendors.reduce((acc, vendor) => {
    const key = vendor.categoryId;

    acc[key] = [...(acc[key] || []), vendor];

    return acc;
  }, {} as { [key: string]: SearchedVendor[] });
};
