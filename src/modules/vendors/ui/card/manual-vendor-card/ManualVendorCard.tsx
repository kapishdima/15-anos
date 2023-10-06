import React from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components";
import { AppRoutes } from "@/app/router/routes";
import { getCategoryImage } from "@/app/utils/category-icon";

import { SearchedVendor } from "@/modules/vendors/store/vendors.types";
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
  const navigate = useNavigate();

  const setCurrentVendor = useVendorsStore((state) => state.setCurrentVendor);
  const removeVendor = useVendorsStore((state) => state.removeManualVendor);
  const fetchManualVendors = useVendorsStore(
    (state) => state.fetchManualVendor
  );
  const actionId = useVendorsStore((state) => state.actionId);
  const actionLoading = useVendorsStore((state) => state.actionLoading);

  const onOpen = () => {
    setCurrentVendor(vendor);
    navigate(AppRoutes.UPDATE_VENDOR);
  };

  const onDelete = (id: string) => {
    removeVendor(id);
    fetchManualVendors(/*force*/ true);
  };

  return (
    <Card
      id={id}
      title={title}
      icon={getCategoryImage(categoryId as any)}
      color={color}
      removal={isRemoval}
      extra={<ContactViewer contacts={contacts} />}
      hasVisibleIcon={false}
      loading={actionLoading && actionId === id}
      onOpen={onOpen}
      onDelete={onDelete}
    />
  );
};
