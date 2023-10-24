import React from "react";
import { AngleRightIcon, TrashIcon } from "../icons";
import { IconButton } from "../button/IconButton/IconButton";
import { Modal } from "../modal/Modal";
import { useModal } from "../modal/useModal";
import { useTranslation } from "react-i18next";

type CardRemoveButtonProps = {
  id: string;
  removal?: boolean;
  loading?: boolean;
  shown?: boolean;
  onDelete: () => void;
};

export const CardRemoveButton: React.FC<CardRemoveButtonProps> = ({
  id,
  removal,
  loading,
  onDelete,
  shown = true,
}) => {
  const confirmationModalId = `${id}_remove_modal`;
  const { t } = useTranslation();
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

  if (!shown) {
    return null;
  }

  return (
    <>
      <div className="card__icon-button">
        {!removal ? (
          <AngleRightIcon />
        ) : (
          <IconButton
            variant="error"
            classes="card__remove-button"
            onClick={openConfirmationModal}
            loading={loading}
            propagateEvent={false}
          >
            <TrashIcon />
          </IconButton>
        )}
      </div>
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
