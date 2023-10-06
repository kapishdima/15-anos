import React, { useEffect } from "react";

import { VendorCard } from "../card/vendor-card/VendorCard";
import { useVendorCategories } from "../../store/categories-vendors";
import { useSearchVendorStore } from "../../store/search-vendors.store";
import { Spinner } from "@/components";
import { EmptyVendorsList } from "./EmptyVendorsList";
import { useEmptyVendorsStore } from "../../store/empty-vendors.store";

export const SearchVendorList: React.FC = () => {
  const vendors = useSearchVendorStore((state) => state.vendorsForView);
  const loading = useSearchVendorStore((state) => state.loading);
  const selectedCategoryId = useVendorCategories(
    (state) => state.selectedCategoryId
  );

  const clearSearchTiers = useEmptyVendorsStore(
    (state) => state.clearSearchTiers
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

  useEffect(() => {
    if (vendors && vendors.length) {
      clearSearchTiers();
    }
  }, []);

  if (loading) {
    return (
      <div className="search-vendors-list--loading">
        <Spinner />
      </div>
    );
  }

  if (!vendors || !vendors.length) {
    return <EmptyVendorsList />;
  }

  return (
    <div className="search-vendors-list">
      {vendors.map((vendor) => (
        <VendorCard {...vendor} />
      ))}
    </div>
  );
};
