import React from 'react';

import { PlusIcon } from '@components/icons';
import { IconButton, useModal } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { CreatePaymentModal } from '../create-payment/CreatePaymentModal';

const CREATE_TASK_MODAL = 'create_task';

export const CreatePayment: React.FC = () => {
  const { open } = useModal();

  const onClick = () => {
    open(CREATE_TASK_MODAL);
  };

  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreatePaymentModal id={CREATE_TASK_MODAL} />
    </Protected>
  );
};
