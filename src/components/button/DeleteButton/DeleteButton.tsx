import React from "react";
import { Modal } from "@/components/modal/Modal";
import { Button } from "../Button/Button";
import { useTranslation } from "react-i18next";
import { useModal } from "@/components/modal/useModal";
import { IconButton } from "../IconButton/IconButton";
import { TrashIcon } from "@/components/icons";

type DeleteButtonProps = {
  id: string;
  onDelete: () => void;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const { t } = useTranslation();
  const confirmationModalId = `${id}_remove_modal`;

  const { open, close } = useModal();

  const openConfirmationModal = () => {
    open(confirmationModalId);
  };

  const onConfirm = () => {
    close(confirmationModalId);
    onDelete();
  };

  const onCancel = () => {
    close(confirmationModalId);
  };

  return (
    <>
      <IconButton
        variant="error"
        onClick={openConfirmationModal}
        propagateEvent={false}
      >
        <TrashIcon />
      </IconButton>
      <Modal
        id={confirmationModalId}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title={t("Are you sure you want to delete?")}
        confirmButtonText={t("Yes")}
        cancelButtonText={t("No")}
        hasCloseIconButton={false}
        confirmButtonColor="error"
        cancelButtonColor="success"
      />
    </>
  );
};
