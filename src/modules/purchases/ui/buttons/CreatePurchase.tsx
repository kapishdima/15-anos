import React from 'react';

import { PlusIcon } from '@components/icons';
import { IconButton, useModal } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { CreatePurchaseModal } from '../create-purchase/CreatePurchaseModal';

const CREATE_PURCHASE_MODAL = 'create_purchase';

export const CreatePurchase: React.FC = () => {
  const { open } = useModal();

  const onClick = () => {
    open(CREATE_PURCHASE_MODAL);
  };

  return (
    <Protected action={RoleActions.CREATE_PURCHASE}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreatePurchaseModal id={CREATE_PURCHASE_MODAL} />
    </Protected>
  );
};
