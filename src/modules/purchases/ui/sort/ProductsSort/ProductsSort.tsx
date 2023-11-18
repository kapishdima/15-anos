import React, { useRef, useState } from "react";

import { Button, Popover } from "@/components";
import { useProductsStore } from "@/modules/purchases/store/products";

import SortIcon from "@image/icons/sort.svg";
import { useTranslation } from "react-i18next";

export const ProductsSort: React.FC = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sortProducts = useProductsStore((state) => state.sortProducts);

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  const sort = (type: "asc" | "desc", by: string) => {
    sortProducts(type, by);
    setOpened(false);
  };

  return (
    <Popover
      ref={triggerRef}
      opened={opened}
      onClickOutside={() => setOpened(false)}
      placement="bottom-end"
      triggerElement={
        <Button ref={triggerRef} variant="text" onClick={toogleOpened}>
          <img src={SortIcon} alt="" />
          {t("Sorting")}
        </Button>
      }
    >
      <div className="sort-item" onClick={() => sort("asc", "price")}>
        {t("Price: Low to High")}
      </div>
      <div className="sort-item" onClick={() => sort("desc", "price")}>
        {t("Price: High to Low")}
      </div>
      <div className="sort-item" onClick={() => sort("desc", "popularity")}>
        {t("Popularity: High to Low")}
      </div>
    </Popover>
  );
};
