import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { AppRoutes } from "@/app/router/routes";
import { ArrowRight, ListTitle, Slider } from "@/components";
import { useManualShoppingStore } from "@/modules/purchases/store/manual_shopping_list";

import { CreatePurchase } from "../../buttons/CreatePurchase";
import { ProductManualCard } from "../ProductManualCard";

export const ManualShopingList: React.FC = () => {
  const { t } = useTranslation();
  const fetchManualShoppingList = useManualShoppingStore(
    (state) => state.fetchManualShoppingList
  );
  const products = useManualShoppingStore((state) => state.products);

  useEffect(() => {
    fetchManualShoppingList();
  }, []);

  return (
    <div className="manual-shopping-list">
      <div className="manual-list__header">
        <ListTitle>{t("My shopping list")}</ListTitle>
      </div>

      {!products.length ? (
        <div className="empty-list">
          <h4 className="empty-list__title">
            {t("Your shopping list is empty now.")} <br />
            {t("Add new items to it from Best Ideas or manually.")}
          </h4>
          <CreatePurchase as="button" />
        </div>
      ) : (
        <div className="products-manual-list">
          {products.slice(0, 3).map((product) => (
            <ProductManualCard product={product} type="shopping" />
          ))}
          {products.length >= 3 && (
            <Link
              to={`${AppRoutes.MANUAL_PURCHAES_LIST}?type=shopping`}
              className="manual-list__link"
            >
              {t("Show more")}
              <ArrowRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
