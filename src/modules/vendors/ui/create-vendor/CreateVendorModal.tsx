import React from "react";

import { useTranslation } from "react-i18next";
import { FieldValues, UseFormReset } from "react-hook-form";

import { Dialog } from "@/components";
import { CreateVendorForm } from "./CreateVendorForm";

type CreateVendorModalProps = {
  id: string;
  taskId?: string;
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
  taskId,
  initialValues,
  loading,
  validation,
  onSubmit,
  hasDeleteButton,
  actions,
  hasConfirmButton = true,
}) => {
  const { t } = useTranslation();

  const submit = (values: any, reset?: UseFormReset<FieldValues>) => {
    onSubmit(values);
    if (reset) {
      reset();
    }
  };

  //   const onDelete = () => {
  //     if (!taskId) {
  //       return;
  //     }
  //     removeTask(taskId);
  //     fetchTasks(/*force*/ true);
  //   };

  return (
    <Dialog
      id={id}
      title={t("Vendor details")}
      confirmButtonText={t("Save the task")}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}
      //   actions={
      //     <>
      //       {hasDeleteButton ? (
      //         <Button variant="error" onClick={onDelete}>
      //           {t("Delete")}
      //         </Button>
      //       ) : null}
      //       {actions}
      //     </>
      //   }
      hasConfirmButton={hasConfirmButton}
    >
      <CreateVendorForm />
    </Dialog>
  );
};
