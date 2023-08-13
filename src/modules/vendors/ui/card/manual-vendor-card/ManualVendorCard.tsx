import React from "react";
import { useTranslation } from "react-i18next";

import { getCategoryImage } from "@/app/utils/category-icon";
import { Button, Card, useModal } from "@/components";
import { SearchedVendor } from "@/modules/vendors/store/vendors.types";

import { CreateVendorModal } from "../../create-vendor/CreateVendorModal";

import { useVendorsStore } from "@/modules/vendors/store/vendors.store";

type ManualVendorCardProps = SearchedVendor & { color: string };

export const ManualVendorCard: React.FC<ManualVendorCardProps> = ({
  color,
  ...vendor
}) => {
  const { id, title, categoryId } = vendor;

  const UPDATE_VENDOR_MODAL_ID = `vendor-modal-${id}`;

  const { t } = useTranslation();
  const { open, close } = useModal();

  const updateVendor = useVendorsStore((state) => state.updateVendor);
  const fetchManualVendors = useVendorsStore(
    (state) => state.fetchManualVendor
  );

  const onOpen = () => {
    open(UPDATE_VENDOR_MODAL_ID);
  };

  const updateVendorOnClick = async (values: any) => {
    await updateVendor(id, values);
    close(UPDATE_VENDOR_MODAL_ID);
    fetchManualVendors(true);
  };

  return (
    <>
      <Card
        id={id}
        title={title}
        icon={getCategoryImage(categoryId as any)}
        color={color}
        extra={<Button variant="success">{t("Contact")}</Button>}
        onOpen={onOpen}
        onDelete={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <CreateVendorModal
        id={UPDATE_VENDOR_MODAL_ID}
        onSubmit={updateVendorOnClick}
        initialValues={vendor}
      />
    </>
  );
};
