import { useProductParameters } from "../store/products_parameters";

export const usePopular = (favorites: number) => {
  const purchaseParamets = useProductParameters((state) => state.parameters);

  if (!purchaseParamets) {
    return false;
  }

  return favorites >= purchaseParamets?.popularChoice;
};
