import React, { useState } from "react";
import { Button } from "@/components";
import { ProductFilters } from "../../filters/ProductFilters";
import { ProductsCategory } from "@/modules/purchases/store/purcheses.types";

import FilterIcon from "@image/icons/filter.png";
import { ProductsSort } from "../../sort/ProductsSort/ProductsSort";
import { useTranslation } from "react-i18next";

type ProductActionsProps = {
  category?: ProductsCategory;
};

export const ProductActions: React.FC<ProductActionsProps> = ({ category }) => {
  const { t } = useTranslation();
  const [filtersOpened, setFiltersOpened] = useState(false);

  const toggleFiltersOpened = () => {
    setFiltersOpened((_opened) => !_opened);
  };

  const hasFilters = category?.price && category?.colors;

  return (
    <>
      <div className="product-actions">
        <div className="product-actions__content">
          {hasFilters && (
            <Button
              variant="text"
              style={{ color: "#83dd8b" }}
              onClick={toggleFiltersOpened}
            >
              <img src={FilterIcon} alt="" /> {t("Filters")}
            </Button>
          )}
          {hasFilters && <ProductsSort />}
        </div>
      </div>
      {hasFilters && (
        <ProductFilters category={category} opened={filtersOpened} />
      )}
    </>
  );
};
