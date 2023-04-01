import React from 'react';
import { PlusIcon } from '../../../../components/icons';
import { Button } from '../../../../components/button/Button/Button';

export const CreateTask: React.FC = () => {
  return (
    <Button appearance="ghost" variant="text">
      Create task
      <PlusIcon />
    </Button>
  );
};
