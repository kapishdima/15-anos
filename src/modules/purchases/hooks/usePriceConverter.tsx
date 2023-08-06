import { useProfileStore } from "@/modules/profile/store/profile";
import { useEffect } from "react";
import { useProductParameters } from "../store/products_parameters";

export const usePriceConverter = (price: number) => {
  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );
  const fetchPurchaseParametrs = useProductParameters(
    (state) => state.fetchProductsParameters
  );

  const profile = useProfileStore((state) => state.profile);
  const purchaseParamets = useProductParameters((state) => state.parameters);

  useEffect(() => {
    fetchPurchaseParametrs();
    fetchProfileDetails();
  }, []);

  console.log("profile", profile);
  console.log("purchaseParamets", purchaseParamets);
};
