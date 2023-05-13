import React from 'react';
import { TrashIcon } from '@components/icons';
import { CheckIcon, IconButton } from '@components/index';

import { Protected, RoleActions } from '@modules/roles';
import { usePaymentsStore } from '@modules/payments';

type RemovePaymentProps = {
  removal: boolean;
};

export const RemovePayment: React.FC<RemovePaymentProps> = ({ removal }) => {
  const togglePaymentRemoval = usePaymentsStore((state) => state.togglePaymentRemoval);

  return (
    <Protected action={RoleActions.DELETE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={togglePaymentRemoval}>
        {removal ? <CheckIcon /> : <TrashIcon />}
      </IconButton>
    </Protected>
  );
};
