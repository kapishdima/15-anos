import React from "react";

import { AppLayout, PageHeader } from "@/components";
import { PurchaseProduct } from "../ui/purchase-product/PurchaseProduct";

import { useProductsStore } from "../store/products";

export const SinglePurchasePage: React.FC = () => {
  const getProduct = useProductsStore((state) => state.getProduct);

  return (
    <AppLayout fullWidth>
      <PageHeader hasBackButton />
      <PurchaseProduct product={getProduct()} />
    </AppLayout>
  );
};
