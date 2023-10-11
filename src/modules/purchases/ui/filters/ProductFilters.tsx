import React, { useState } from "react";
import { ColorFilters } from "./ColorFilters/ColorFilters";
import { ProductsCategory } from "../../store/purcheses.types";
import { PriceFilters } from "./PricesFilters/PricesFilters";
import { useProfileStore } from "@/modules/profile/store/profile";
import { getCurrencyCode } from "@/modules/profile/store/selector/profile.selector";
import { Button } from "@/components";
import { useProductsStore } from "../../store/products";
import { useProductsSearch } from "../../store/products_search";

type ProductFiltersProps = {
  category?: ProductsCategory;
  opened: boolean;
};

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  category,
  opened,
}) => {
  const currency = useProfileStore(getCurrencyCode);
  const searchProducts = useProductsStore((state) => state.searchProducts);
  const prices = useProductsSearch((state) => state.prices);
  const colors = useProductsSearch((state) => state.colors);

  console.log(category);

  if (!opened) {
    return null;
  }

  return (
    <div className="product-filters">
      <div className="product-filters__container">
        {category?.price && (
          <PriceFilters
            priceStep={category?.prices[currency] || category?.prices["USD"]}
          />
        )}
        {category?.colors && (
          <ColorFilters colorsForFilter={category?.colors || []} />
        )}
        <div className="product-filters__actions">
          <Button
            variant="success"
            onClick={() => searchProducts({ prices, colors })}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
