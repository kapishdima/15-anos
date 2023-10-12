import React from "react";

import { AppLayout, PageHeader } from "@/components";
import { PurchaseProduct } from "../ui/purchase-product/PurchaseProduct";

import { useProductsStore } from "../store/products";
import { useSearchParams } from "react-router-dom";
import { useRecommendedShoppingStore } from "../store/shopping_recommended";
import { getShoppingCategory } from "../store/shopping.selector";

export const SinglePurchasePage: React.FC = () => {
  const getProduct = useProductsStore((state) => state.getProduct);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const shoppingCategory = useRecommendedShoppingStore((state) =>
    getShoppingCategory(categoryId || "", state)
  );

  console.log(shoppingCategory);

  return (
    <AppLayout fullWidth>
      <PageHeader hasBackButton />
      <PurchaseProduct
        product={getProduct()}
        ratio={shoppingCategory?.ratio || 1}
      />
    </AppLayout>
  );
};
