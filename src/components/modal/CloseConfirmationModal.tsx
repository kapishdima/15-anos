import React from 'react';
import { Modal } from './Modal';
import { useTranslation } from 'react-i18next';

export const CLOSE_CONFIRMATION_MODAL = 'close_confirmation';

type CloseConfirmationModalProps = {
  onConfirmedClose: () => void;
  onCancelClose: () => void;
  id: string;
};

export const CloseConfirmationModal: React.FC<CloseConfirmationModalProps> = ({
  id,
  onCancelClose,
  onConfirmedClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id={`${id}_${CLOSE_CONFIRMATION_MODAL}`}
      title={t('Are you sure you want to exit without saving the changes?')}
      hasCloseIconButton={false}
      confirmButtonText={t('Yes')}
      cancelButtonText={t('No')}
      confirmButtonColor="error"
      cancelButtonColor="success"
      onCancel={onCancelClose}
      onConfirm={onConfirmedClose}
    />
  );
};
