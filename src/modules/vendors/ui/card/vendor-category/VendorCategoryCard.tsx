import { Translated, translated } from "@/app/utils/locale";
import { AspectRatio } from "@/components";
import { useVendorCategories } from "@/modules/vendors/store/categories-vendors";
import { useSearchVendorStore } from "@/modules/vendors/store/search-vendors.store";
import classNames from "classnames";
import React from "react";

type VendorCategoryCardProps = {
  id: string;
  title: Translated;
  image: string;
};

export const VendorCategoryCard: React.FC<VendorCategoryCardProps> = ({
  id,
  title,
  image,
}) => {
  const selectCategory = useVendorCategories((state) => state.selectCategory);
  const searchVendors = useSearchVendorStore((state) => state.searchVendor);
  const selectedCategoroId = useVendorCategories(
    (state) => state.selectedCategoryId
  );

  const onClick = () => {
    selectCategory(id);
    searchVendors(id);
  };

  return (
    <div
      className={classNames("vendor-category-card", {
        "vendor-category-card--selected": selectedCategoroId === id,
      })}
      onClick={onClick}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* <div className="vendor-category-card__image">
        
        <img
          src={image}
          alt={translated(title)}
          style={{ aspectRatio: "8/1" }}
        />
      </div> */}
      <h4 className="vendor-category-card__title">{translated(title)}</h4>
    </div>
  );
};
