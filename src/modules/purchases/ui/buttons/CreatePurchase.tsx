import React from 'react';

import { PlusIcon } from '@components/icons';
import { IconButton, useModal } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { CreatePurchaseModal } from '../create-purchase/CreatePurchaseModal';
import { useShoppingStore } from '../../store/shopping';

const CREATE_PURCHASE_MODAL = 'create_purchase';

export const CreatePurchase: React.FC = () => {
  const { open, close } = useModal();

  const addPurches = useShoppingStore((state) => state.addProduct);
  const fetchProducts = useShoppingStore((state) => state.fetchProducts);
  const loading = useShoppingStore((state) => state.loading);

  const onClick = () => {
    open(CREATE_PURCHASE_MODAL);
  };

  const createPurchase = async (values: any) => {
    await addPurches(values);
    close(CREATE_PURCHASE_MODAL);
    fetchProducts(/*force*/ true);
  };

  return (
    <Protected action={RoleActions.CREATE_PURCHASE}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        <PlusIcon />
      </IconButton>
      <CreatePurchaseModal id={CREATE_PURCHASE_MODAL} onSubmit={createPurchase} loading={loading} />
    </Protected>
  );
};
