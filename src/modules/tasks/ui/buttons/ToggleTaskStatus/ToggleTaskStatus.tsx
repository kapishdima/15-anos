import { Button } from '@/components';
import React from 'react';

type ToggleTaskStatusProps = {
  onClick: () => void;
  isCompleted: boolean;
};

export const ToggleTaskStatus: React.FC<ToggleTaskStatusProps> = ({ onClick, isCompleted }) => {
  return (
    <Button onClick={onClick} variant={isCompleted ? 'error' : 'success'}>
      {isCompleted ? 'Mark as not completed' : 'Mark as completed'}
    </Button>
  );
};
