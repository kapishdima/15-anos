import React, { useEffect } from "react";
import { ArrowRight, ListTitle, Slider } from "@/components";
import { CreatePurchase } from "../../buttons/CreatePurchase";
import { useManualWishList } from "@/modules/purchases/store/manual_wish_list";
import { ProductManualCard } from "../ProductManualCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";

export const ManualWishList: React.FC = () => {
  const { t } = useTranslation();
  const fetchManualWishList = useManualWishList(
    (state) => state.fetchManualWishList
  );
  const products = useManualWishList((state) => state.products);

  useEffect(() => {
    fetchManualWishList();
  }, []);

  return (
    <div className="manual-shopping-list">
      <div className="manual-list__header">
        <ListTitle>{t("My wishlist")}</ListTitle>
        {products.length >= 3 && (
          <Link
            to={`${AppRoutes.MANUAL_PURCHAES_LIST}?type=registry`}
            className="manual-list__link"
          >
            All products
            <ArrowRight />
          </Link>
        )}
      </div>
      {!products.length ? (
        <div className="empty-list">
          <h4 className="empty-list__title">
            {t("This wishlist is empty now.")} <br />
            {t("Add new items to it from Best Ideas or manually.")}
          </h4>
          <CreatePurchase as="button" />
        </div>
      ) : (
        <div className="products-list">
          {products.splice(0, 3).map((product) => (
            <ProductManualCard product={product} type="registry" />
          ))}
          {/* <Slider
            slidesPerView={3}
            spaceBetween={10}
            breakpoints={{ 768: { slidesPerView: 3 } }}
            className="products-list"
          >
            {products.splice(0, 3).map((product) => (
              <ProductManualCard product={product} type="registry" />
            ))}
          </Slider> */}
        </div>
      )}
    </div>
  );
};
