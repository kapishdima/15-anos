import React, { useEffect } from "react";
import { AppLayout, PageBanner, PageHeader } from "@/components";
import { useTranslation } from "react-i18next";

import { ProductsList } from "../ui/purchase-list/ProductsList";

import { useProductsStore } from "../store/products";
import { useParams, useSearchParams } from "react-router-dom";
import { useRecommendedShoppingStore } from "../store/shopping_recommended";
import { getShoppingCategory } from "../store/shopping.selector";
import { ProductTypes } from "../store/purcheses.types";
import { useProfileStore } from "@/modules/profile/store/profile";
import { useProductParameters } from "../store/products_parameters";

export const PurchaseBestIdeas: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type") as ProductTypes;

  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );
  const fetchProductsByCategory = useProductsStore(
    (state) => state.fetchProductsByCategory
  );
  const fetchPurchaseParametrs = useProductParameters(
    (state) => state.fetchProductsParameters
  );
  const clearProduct = useProductsStore((state) => state.clearProduct);

  const products = useProductsStore((state) => state.products);
  const shoppingCategory = useRecommendedShoppingStore((state) =>
    getShoppingCategory(id, state)
  );
  const loading = useProductsStore((state) => state.loading);

  useEffect(() => {
    if (!id) {
      return;
    }

    clearProduct();
    fetchPurchaseParametrs();
    fetchProfileDetails();
    fetchProductsByCategory(id, type, true);
  }, []);

  return (
    <AppLayout loading={loading}>
      <div className="best-ideas">
        <PageHeader title={t("Best ideas")} hasBackButton />
        <PageBanner
          image={shoppingCategory?.imageHeader || ""}
          title={id || ""}
        />

        <ProductsList products={products} type={type} />
      </div>
    </AppLayout>
  );
};
