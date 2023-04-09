import React from 'react';
import { PlusIcon } from '../../../../../components/icons';
import { IconButton } from '../../../../../components/button/IconButton/IconButton';

export const CreateTask: React.FC = () => {
  return (
    <IconButton appearance="filled" variant="white">
      <PlusIcon />
    </IconButton>
  );
};
