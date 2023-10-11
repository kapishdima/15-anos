import { useProfileStore } from "@/modules/profile/store/profile";
import { useProductParameters } from "../store/products_parameters";
import {
  getCurrencyCode,
  getCurrencySymbol,
} from "@/modules/profile/store/selector/profile.selector";

export const usePrice = (price = 0) => {
  const purchaseParamets = useProductParameters((state) => state.parameters);

  const symbol = useProfileStore(getCurrencySymbol);
  const code = useProfileStore(getCurrencyCode);
  const rate = purchaseParamets?.rates[code || "USD"];

  const convertedPrice =
    code === "USD" ? price : parseFloat((price * rate).toFixed(2));

  const convert = (price: number) => {
    const rate = purchaseParamets?.rates[code || "USD"];

    return code === "USD" ? price : parseFloat((price * rate).toFixed(2));
  };

  return {
    symbol,
    convertedPrice,
    convert,
  };
};
