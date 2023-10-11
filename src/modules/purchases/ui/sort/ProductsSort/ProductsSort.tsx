import React, { useRef, useState } from "react";

import { Button, Popover } from "@/components";
import { useProductsStore } from "@/modules/purchases/store/products";

import SortIcon from "@image/icons/sort.svg";

export const ProductsSort: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sortProducts = useProductsStore((state) => state.sortProducts);

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  const sort = (type: "asc" | "desc", by: string) => {
    sortProducts(type, by);
  };

  return (
    <Popover
      ref={triggerRef}
      opened={opened}
      onClickOutside={() => setOpened(false)}
      placement="bottom-start"
      triggerElement={
        <Button ref={triggerRef} variant="text" onClick={toogleOpened}>
          <img src={SortIcon} alt="" />
          Sort
        </Button>
      }
    >
      <div className="sort-item" onClick={() => sort("asc", "price")}>
        Price: Low to Hight
      </div>
      <div className="sort-item" onClick={() => sort("desc", "price")}>
        Price: Hight to Low
      </div>
      <div className="sort-item" onClick={() => sort("desc", "popularity")}>
        Popularity: Hight to Low
      </div>
    </Popover>
  );
};
