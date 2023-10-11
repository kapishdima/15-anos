import React, { useState } from "react";
import { Button } from "@/components";
import { ProductFilters } from "../../filters/ProductFilters";
import { ProductsCategory } from "@/modules/purchases/store/purcheses.types";

import FilterIcon from "@image/icons/filter.png";
import { ProductsSort } from "../../sort/ProductsSort/ProductsSort";

type ProductActionsProps = {
  category?: ProductsCategory;
};

export const ProductActions: React.FC<ProductActionsProps> = ({ category }) => {
  const [filtersOpened, setFiltersOpened] = useState(false);

  const toggleFiltersOpened = () => {
    setFiltersOpened((_opened) => !_opened);
  };

  const hasFilters = category?.price && category?.colors;

  return (
    <>
      <div className="product-actions">
        {hasFilters && (
          <Button variant="text" onClick={toggleFiltersOpened}>
            <img src={FilterIcon} alt="" /> Filters
          </Button>
        )}
        {hasFilters && <ProductsSort />}
      </div>
      {hasFilters && (
        <ProductFilters category={category} opened={filtersOpened} />
      )}
    </>
  );
};
