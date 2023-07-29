import { Button } from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

type TogglePaymentStatusProps = {
  onClick: () => void;
  isCompleted: boolean;
};

export const TogglePaymentStatus: React.FC<TogglePaymentStatusProps> = ({
  onClick,
  isCompleted,
}) => {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} variant={isCompleted ? 'error' : 'success'}>
      {isCompleted ? t('Mark as not paid') : t('Mark as paid')}
    </Button>
  );
};
