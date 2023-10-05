import React, { useEffect } from "react";

import { VendorCard } from "../card/vendor-card/VendorCard";
import { useVendorCategories } from "../../store/categories-vendors";
import { useSearchVendorStore } from "../../store/search-vendors.store";
import { Spinner } from "@/components";

export const SearchVendorList: React.FC = () => {
  const vendors = useSearchVendorStore((state) => state.vendorsForView);
  const loading = useSearchVendorStore((state) => state.loading);
  const selectedCategoryId = useVendorCategories(
    (state) => state.selectedCategoryId
  );

  const searchVendorByPosition = useSearchVendorStore(
    (state) => state.searchVendor
  );

  useEffect(() => {
    if (!selectedCategoryId) {
      return;
    }

    searchVendorByPosition(selectedCategoryId, /*force*/ true);
  }, [selectedCategoryId]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (loading) {
    return (
      <div className="search-vendors-list--loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="search-vendors-list">
      {vendors.map((vendor) => (
        <VendorCard {...vendor} />
      ))}
    </div>
  );
};
