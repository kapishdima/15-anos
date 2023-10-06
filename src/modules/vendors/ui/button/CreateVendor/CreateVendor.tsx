import React from "react";

import { AddFilledIcon, IconButton, useModal } from "@components/index";

import { Protected, RoleActions } from "@modules/roles";
import { CreateVendorModal } from "../../create-vendor/CreateVendorModal";
import { useVendorsStore } from "@/modules/vendors/store/vendors.store";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";

export const CREATE_VENDOR_MODAL = "create_vendor";

export const CreateVendor: React.FC = () => {
  const { open, close } = useModal();

  const loading = useVendorsStore((state) => state.loading);
  const addVendor = useVendorsStore((state) => state.addVendor);
  const fetchManualVendor = useVendorsStore((state) => state.fetchManualVendor);

  const onClick = () => {
    open(CREATE_VENDOR_MODAL);
  };

  const createVendor = async (values: any) => {
    await addVendor(values);
    close(CREATE_VENDOR_MODAL);
    fetchManualVendor(/*force*/ true);
  };

  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <Link to={AppRoutes.CREATE_VENDOR}>
        <IconButton appearance="filled" variant="white">
          <AddFilledIcon />
        </IconButton>
      </Link>
      {/* <CreateVendorModal
        id={CREATE_VENDOR_MODAL}
        onSubmit={createVendor}
        loading={loading}
      /> */}
    </Protected>
  );
};
