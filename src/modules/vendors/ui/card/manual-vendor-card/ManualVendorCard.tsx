import React from "react";
import { useTranslation } from "react-i18next";

import { getCategoryImage } from "@/app/utils/category-icon";
import { Button, Card, useModal } from "@/components";
import { SearchedVendor } from "@/modules/vendors/store/vendors.types";

import { CreateVendorModal } from "../../create-vendor/CreateVendorModal";

import { useVendorsStore } from "@/modules/vendors/store/vendors.store";
import { ContactViewer } from "../../contacts/viewer/ContactsViewer";

type ManualVendorCardProps = SearchedVendor & {
  color: string;
  isRemoval: boolean;
};

export const ManualVendorCard: React.FC<ManualVendorCardProps> = ({
  color,
  isRemoval,
  ...vendor
}) => {
  const { id, title, categoryId, contacts } = vendor;

  const UPDATE_VENDOR_MODAL_ID = `vendor-modal-${id}`;

  const { t } = useTranslation();
  const { open, close } = useModal();

  const updateVendor = useVendorsStore((state) => state.updateVendor);
  const removeVendor = useVendorsStore((state) => state.removeManualVendor);
  const fetchManualVendors = useVendorsStore(
    (state) => state.fetchManualVendor
  );
  const actionId = useVendorsStore((state) => state.actionId);
  const actionLoading = useVendorsStore((state) => state.actionLoading);

  const onOpen = () => {
    open(UPDATE_VENDOR_MODAL_ID);
  };

  const onDelete = (id: string) => {
    removeVendor(id);
    fetchManualVendors(/*force*/ true);
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
        extra={<ContactViewer contacts={contacts} />}
        onOpen={onOpen}
        onDelete={onDelete}
        hasVisibleIcon={false}
        removal={isRemoval}
        loading={actionLoading && actionId === id}
      />
      <CreateVendorModal
        id={UPDATE_VENDOR_MODAL_ID}
        onSubmit={updateVendorOnClick}
        initialValues={vendor}
      />
    </>
  );
};
