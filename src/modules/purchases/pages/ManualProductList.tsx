import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AppLayout, PageHeader, PageBanner } from "@/components";

import { ProductsList } from "../ui/purchase-list/ProductsList";
import { ProductTypes } from "../store/purcheses.types";
import { useTranslation } from "react-i18next";
import { useManualShoppingStore } from "../store/manual_shopping_list";
import { useManualWishList } from "../store/manual_wish_list";

export const ManualProductList: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as ProductTypes;

  const fetchManualShoppingList = useManualShoppingStore(
    (state) => state.fetchManualShoppingList
  );
  const fetchManualWishList = useManualWishList(
    (state) => state.fetchManualWishList
  );

  const wishlist = useManualWishList((state) => state.products);
  const shopping = useManualShoppingStore((state) => state.products);

  useEffect(() => {
    if (type === "shopping") {
      fetchManualShoppingList();
    } else {
      fetchManualWishList();
    }
  }, []);

  return (
    <AppLayout>
      <div className="best-ideas">
        <PageHeader title={t("Manual list")} hasBackButton />
        {/* <PageBanner
          image={shoppingCategory?.imageHeader || ""}
          title={id || ""}
        /> */}

        <ProductsList
          products={type === "registry" ? wishlist : shopping}
          type={type}
        />
      </div>
    </AppLayout>
  );
};
