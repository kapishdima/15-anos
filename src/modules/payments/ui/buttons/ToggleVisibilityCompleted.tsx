import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@components/index';

import { usePaymentsStore } from '../../store/payments';
import { useTranslation } from 'react-i18next';

export const ToggleVisibilityCompleted: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [completedVisible, setCompletedVisible] = useState(true);
  const tasksStore = usePaymentsStore();

  const { t } = useTranslation();

  const onClick = () => {
    if (completedVisible) {
      searchParams.set('showCompleted', 'false');

      setSearchParams(searchParams);
      setCompletedVisible(false);
    } else {
      searchParams.set('showCompleted', 'true');

      setSearchParams(searchParams);
      setCompletedVisible(true);
    }
  };

  useEffect(() => {
    const showCompleted = JSON.parse(searchParams.get('showCompleted') || 'true');
    setCompletedVisible(showCompleted);
  }, []);

  useEffect(() => {
    if (completedVisible) {
      tasksStore.showCompleted();
    } else {
      tasksStore.hideCompleted();
    }
  }, [completedVisible]);

  return (
    <div className="toggle-visibility">
      <Button appearance="ghost" variant="success" onClick={onClick}>
        {completedVisible ? t('Hide completed tasks') : t('Show completed tasks')}
      </Button>
    </div>
  );
};
