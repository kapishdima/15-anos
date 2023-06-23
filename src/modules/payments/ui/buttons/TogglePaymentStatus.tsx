import { Button } from '@/components';
import React from 'react';

type TogglePaymentStatusProps = {
  onClick: () => void;
  isCompleted: boolean;
};

export const TogglePaymentStatus: React.FC<TogglePaymentStatusProps> = ({
  onClick,
  isCompleted,
}) => {
  return (
    <Button onClick={onClick} variant={isCompleted ? 'error' : 'success'}>
      {isCompleted ? 'Mark as not paid' : 'Mark as paid'}
    </Button>
  );
};
