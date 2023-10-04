import React, { useEffect } from "react";
import { VendorsListEmpty } from "./VendorsListEmpty";
import { useVendorsStore } from "../../store/vendors.store";
import { ManualVendorCard } from "../card/manual-vendor-card/ManualVendorCard";
import { groupByCategory } from "../../store/vendors.selector";
import { getCategoryById, useCategoriesStore } from "@/modules/categories";

export const ManualVendorsList: React.FC = () => {
  const fetchManualVendor = useVendorsStore((state) => state.fetchManualVendor);
  const groupedVendors = useVendorsStore(groupByCategory);
  const categoriesStore = useCategoriesStore();
  const isRemoval = useVendorsStore((state) => state.isRemoval);

  useEffect(() => {
    fetchManualVendor();
  }, []);

  if (!groupedVendors) {
    return <VendorsListEmpty />;
  }

  return (
    <div className="manual-vendors-list">
      {Object.keys(groupedVendors).map((group) => {
        const category = getCategoryById(categoriesStore.categories, group);
        return (
          <>
            <h4 className="manual-vendors-list__title">{group}</h4>
            {groupedVendors[group].map((vendor) => (
              <ManualVendorCard
                isRemoval={isRemoval}
                color={category?.color || "83dd8b"}
                {...vendor}
              />
            ))}
          </>
        );
      })}
    </div>
  );
};
