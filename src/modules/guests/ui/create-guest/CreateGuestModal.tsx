import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/components';
import { CreateGuestForm } from './CreateGuestForm';
import { UseFormReset, FieldValues } from 'react-hook-form';
import { useGuestsStore } from '../../store/guests';

type CreateGuestModalProps = {
  id: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
  guestId?: string;
  hasDeleteButton?: boolean;
};

const defaultValues = {
  name: '',
  status: 'none',
};

export const CreateGuestModal: React.FC<CreateGuestModalProps> = ({
  id,
  guestId,
  initialValues,
  onSubmit,
  loading,
  validation,
  hasDeleteButton,
}) => {
  const { t } = useTranslation();
  const removeGuest = useGuestsStore((state) => state.removeGuest);
  const fetchGuests = useGuestsStore((state) => state.fetchGuests);

  const submit = (values: any, reset?: UseFormReset<FieldValues>) => {
    onSubmit(values);
    if (reset) {
      reset();
    }
  };

  const onDelete = () => {
    if (!guestId) {
      return;
    }
    removeGuest(guestId);
    fetchGuests(/*force*/ true);
  };

  return (
    <Dialog
      id={id}
      title={t('Guest')}
      confirmButtonText={t('Add guests')}
      minWidth="50vw"
      minHeight="90vh"
      onSubmit={submit}
      initialValues={initialValues || defaultValues}
      loading={loading}
      validation={validation}
      actions={
        hasDeleteButton ? (
          <Button variant="error" onClick={onDelete}>
            Delete guest
          </Button>
        ) : null
      }>
      <CreateGuestForm />
    </Dialog>
  );
};
