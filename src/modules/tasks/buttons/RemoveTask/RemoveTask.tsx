import React from 'react';
import { TrashIcon } from '../../../../components/icons';
import { Button } from '../../../../components/button/Button/Button';

export const RemoveTask: React.FC = () => {
  return (
    <Button appearance="ghost" variant="error">
      Remove tasks
      <TrashIcon />
    </Button>
  );
};
