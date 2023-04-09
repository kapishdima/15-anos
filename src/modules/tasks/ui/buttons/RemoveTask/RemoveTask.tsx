import React from 'react';
import { TrashIcon } from '../../../../../components/icons';
import { IconButton } from '../../../../../components/button/IconButton/IconButton';

export const RemoveTask: React.FC = () => {
  return (
    <IconButton appearance="filled" variant="white">
      <TrashIcon />
    </IconButton>
  );
};
