import React from 'react';

import { PlusIcon } from '@components/icons';
import { Button, IconButton, useModal } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { CreatePurchaseModal } from '../create-purchase/CreatePurchaseModal';
import { useShoppingStore } from '../../store/shopping';

const CREATE_PURCHASE_MODAL = 'create_purchase';

type CreatePurchaseProps = {
  as?: 'button' | 'icon';
};

export const CreatePurchase: React.FC<CreatePurchaseProps> = ({ as = 'icon' }) => {
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
      {as === 'icon' ? (
        <IconButton appearance="filled" variant="white" onClick={onClick}>
          <PlusIcon />
        </IconButton>
      ) : (
        <Button variant="text" appearance="ghost" onClick={onClick}>
          Add manually
        </Button>
      )}
      <CreatePurchaseModal id={CREATE_PURCHASE_MODAL} onSubmit={createPurchase} loading={loading} />
    </Protected>
  );
};
