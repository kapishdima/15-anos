import React from "react";
import { Button } from "@/components";
import { usePrice } from "@/modules/purchases";
import {
  PriceRange,
  useProductsSearch,
} from "@/modules/purchases/store/products_search";
import { isActivePrice } from "@/modules/purchases/store/selectors/product_search.selector";
import { useTranslation } from "react-i18next";

type PriceFiltersProps = {
  priceStep: number;
};

type PriceFilterItemProps = {
  range: PriceRange;
};

const STEPS_LIMIT = 4;

export const PriceFilters: React.FC<PriceFiltersProps> = ({ priceStep }) => {
  const { t } = useTranslation();
  const { symbol, convert } = usePrice();

  const prices = Array(STEPS_LIMIT)
    .fill(0)
    .reduce<PriceRange[]>((acc, value, index) => {
      const prevValue = convert(acc[index - 1]?.to || 0);
      const nextValue = convert(prevValue) + priceStep;

      acc.push({
        from: prevValue,
        to: nextValue,
        title:
          index === STEPS_LIMIT - 1
            ? `${symbol}${prevValue}+`
            : `${symbol}${prevValue} - ${symbol}${nextValue}`,
      });
      return acc;
    }, []);

  return (
    <div className="prices-filters">
      <h3 className="prices-filters__title">{t("Price range")}</h3>
      <div className="prices-filters__list">
        {prices.map((price) => (
          <PriceFilterItem range={price} />
        ))}
      </div>
    </div>
  );
};

const PriceFilterItem: React.FC<PriceFilterItemProps> = ({ range }) => {
  const setPrice = useProductsSearch((state) => state.setPrice);
  const onClick = () => {
    setPrice(range);
  };

  const isActive = useProductsSearch((state) => isActivePrice(state, range));

  return (
    <div className="prices-filters__item">
      <Button variant={isActive ? "primary" : "secondary"} onClick={onClick}>
        {range.title}
      </Button>
    </div>
  );
};
