import React, { useEffect } from "react";
import { useEmptyVendorsStore } from "../../store/empty-vendors.store";
import { useVendorCategories } from "../../store/categories-vendors";
import { useTranslation } from "react-i18next";

export const EmptyVendorsList: React.FC = () => {
  const { t } = useTranslation();
  const selectedCategoryId = useVendorCategories(
    (state) => state.selectedCategoryId
  );
  const sendEmptyVendors = useEmptyVendorsStore(
    (state) => state.sendEmptyRequest
  );
  const setSearchTiers = useEmptyVendorsStore((state) => state.setSearchTiers);

  useEffect(() => {
    if (!selectedCategoryId) {
      return;
    }

    sendEmptyVendors(selectedCategoryId);
    setSearchTiers();
  }, []);

  return (
    <div className="empty-vendors-list">
      <span className="empty-vendors-list__emoji">🥺</span>
      <h1 className="empty-vendors-list__title heading1">
        {t("We are very sorry :(")}
      </h1>
      <p className="empty-vendors-list__text subtitle">
        {t(
          `Unfortunately, we need more time to add vendors from this category for your city. Share the app with your friends, because the more requests we get from your city, the sooner we will add vendors!`
        )}
      </p>
    </div>
  );
};
