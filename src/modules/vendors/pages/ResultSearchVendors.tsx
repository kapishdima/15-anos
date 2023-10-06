import React from "react";
import { AppLayout, PageHeader } from "@/components";
import { VendorCategoriesList } from "../ui/vendors-list/VendorCategoriesList";
import { SearchVendorList } from "../ui/vendors-list/SearchVendorList";
import { ChangePosition } from "../ui/button/ChangePosition/ChangePosition";
import { AppRoutes } from "@/app/router/routes";

export const ResultSearchVendors: React.FC = () => {
  return (
    <AppLayout>
      <PageHeader title="Vendors" hasBackButton backURL={AppRoutes.VENDORS} />
      <div className="vendors-list-page">
        <VendorCategoriesList />
        <ChangePosition />
        <SearchVendorList />
      </div>
    </AppLayout>
  );
};
