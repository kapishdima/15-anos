import React, { useEffect } from "react";
import { useVendorCategories } from "../../store/categories-vendors";
import { VendorCategoryCard } from "../card/vendor-category/VendorCategoryCard";
import { ScrollXArea } from "@/components";

export const VendorCategoriesList: React.FC = () => {
  const fetchVendorCategories = useVendorCategories(
    (state) => state.fetchVendorCategories
  );
  const categories = useVendorCategories((state) => state.categories);

  useEffect(() => {
    fetchVendorCategories();
  }, []);

  return (
    <div className="vendor-categories__list">
      <ScrollXArea>
        {categories.map((category) => (
          <VendorCategoryCard {...category} />
        ))}
      </ScrollXArea>
    </div>
  );
};