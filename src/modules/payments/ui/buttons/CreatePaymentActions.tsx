import React, { useEffect, useState } from 'react';
import { EventEmitter, Events } from '@/app/transport/event-bus';
import { TogglePaymentStatus } from './TogglePaymentStatus';
import { Button } from '@/components';

type CreatePaymentActionsProps = {
  modalId: string;
  isCompleted: boolean;
  updatePaymentStatus: () => void;
};

export const CreatePaymentActions: React.FC<CreatePaymentActionsProps> = ({
  modalId,
  isCompleted,
  updatePaymentStatus,
}) => {
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    EventEmitter.subscribe(Events.FORM_MODIFY, ({ isDirty, id }) => {
      if (id === modalId) {
        setShowConfirmButton(isDirty);
      }
    });
  }, []);
  return (
    <>
      {!showConfirmButton ? (
        <TogglePaymentStatus onClick={updatePaymentStatus} isCompleted={Boolean(isCompleted)} />
      ) : null}
      {showConfirmButton ? (
        <Button
          aria-label="Close this dialog window"
          variant="success"
          // loading={loading}
          type="submit">
          Confirm
        </Button>
      ) : null}
    </>
  );
};
