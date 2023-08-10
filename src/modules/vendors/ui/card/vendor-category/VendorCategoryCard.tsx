import { Translated, translated } from "@/app/utils/locale";
import { useVendorCategories } from "@/modules/vendors/store/categories-vendors";
import { useSearchVendorStore } from "@/modules/vendors/store/search-vendors.store";
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

  const onClick = () => {
    selectCategory(id);
    searchVendors(id, /* force */ true);
  };

  return (
    <div className="vendor-category-card" onClick={onClick}>
      <div className="vendor-category-card__image">
        <img src={image} alt={translated(title)} />
      </div>
      <h4 className="vendor-category-card__title">{translated(title)}</h4>
    </div>
  );
};
