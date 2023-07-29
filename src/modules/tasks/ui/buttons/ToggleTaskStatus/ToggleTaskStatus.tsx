import { Button } from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ToggleTaskStatusProps = {
  onClick: () => void;
  isCompleted: boolean;
};

export const ToggleTaskStatus: React.FC<ToggleTaskStatusProps> = ({ onClick, isCompleted }) => {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} variant={isCompleted ? 'error' : 'success'}>
      {isCompleted ? t('Mark as not completed') : t('Mark as completed')}
    </Button>
  );
};
