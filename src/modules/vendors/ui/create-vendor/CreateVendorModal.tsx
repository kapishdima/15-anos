import React from "react";

import { useTranslation } from "react-i18next";
import { FieldValues, UseFormReset } from "react-hook-form";

import { Button, Dialog, useModal } from "@/components";
import { CreateVendorForm } from "./CreateVendorForm";
import { useVendorsStore } from "../../store/vendors.store";

type CreateVendorModalProps = {
  id: string;
  vendorId?: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
  actions?: JSX.Element | null;
  hasDeleteButton?: boolean;
  hasConfirmButton?: boolean;
};

const defaultValues = {
  categoryId: "Artists",
  notes: "",
  title: "",
  contacts: {},
};

export const CreateVendorModal: React.FC<CreateVendorModalProps> = ({
  id,
  vendorId,
  initialValues,
  loading,
  validation,
  onSubmit,
  hasDeleteButton,
  actions,
  hasConfirmButton = true,
}) => {
  const { t } = useTranslation();
  const { close } = useModal();

  const removeManualVendor = useVendorsStore(
    (state) => state.removeManualVendor
  );
  const fetchManualVendors = useVendorsStore(
    (state) => state.fetchManualVendor
  );
  const submit = (values: any, reset?: UseFormReset<FieldValues>) => {
    onSubmit(values);
    if (reset) {
      reset();
    }
  };

  const onDelete = () => {
    if (!vendorId) {
      return;
    }
    close(id);
    removeManualVendor(vendorId);
    fetchManualVendors(/*force*/ true);
  };

  return (
    <Dialog
      id={id}
      title={t("Vendor details")}
      confirmButtonText={t("Save the vendor")}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}
      actions={
        <>
          {hasDeleteButton ? (
            <Button variant="error" onClick={onDelete}>
              {t("Delete")}
            </Button>
          ) : null}
          {actions}
        </>
      }
      hasConfirmButton={hasConfirmButton}
    >
      {/* <CreateVendorForm /> */}
    </Dialog>
  );
};
