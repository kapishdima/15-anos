import { useProfileStore } from "@/modules/profile/store/profile";
import { useProductParameters } from "../store/products_parameters";
import { getCurrencySymbol } from "@/modules/profile/store/selector/profile.selector";

export const usePrice = (price: number) => {
  const profile = useProfileStore((state) => state.profile);
  const purchaseParamets = useProductParameters((state) => state.parameters);

  const symbol = useProfileStore(getCurrencySymbol);

  console.log("profile", profile);
  console.log("purchaseParamets", purchaseParamets);

  return {
    symbol,
  };
};
