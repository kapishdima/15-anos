import React from "react";
import { AppLayout, Form, PageHeader, SearchField } from "@/components";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { CreateVendor } from "../ui/button/CreateVendor/CreateVendor";
import { RemoveVendor } from "../ui/button/RemoveVendor/RemoveVendor";
import { ManualVendorsList } from "../ui/vendors-list/ManualVendorsList";
import { SearchVendorIntoMap } from "../ui/button/SearchVendorIntoMap/SearchVendorIntoMap";
import { useVendorsStore } from "../store/vendors.store";

export const VendorsIndex: React.FC = () => {
  const { t } = useTranslation();

  let [searchParams, setSearchParams] = useSearchParams();

  const searchVendors = useVendorsStore((state) => state.searchVendor);

  const onSearch = (value: string) => {
    searchParams.set("q", value);
    setSearchParams(searchParams);
    searchVendors();
  };

  return (
    <AppLayout>
      <PageHeader
        title={t("Vendors")}
        hasBackButton={false}
        actions={
          <>
            <RemoveVendor />
            <CreateVendor />
          </>
        }
      />

      <div className="vendors-page-container">
        <Form
          onSubmit={() => {}}
          initialValues={{ search: searchParams.get("q") || "" }}
          classes="vendors-page__search-form"
        >
          <SearchField
            onSearch={onSearch}
            placeholder="Search by title, name, contact"
          />
        </Form>
        <ManualVendorsList />
        <SearchVendorIntoMap />
      </div>
    </AppLayout>
  );
};
