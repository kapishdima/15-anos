import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@components/index';

import { useTasksStore } from '../../../store/tasks';
import { useTranslation } from 'react-i18next';

export const ToggleVisibilityCompleted: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [completedVisible, setCompletedVisible] = useState(true);

  const showCompleted = useTasksStore((state) => state.showCompleted);
  const hideCompleted = useTasksStore((state) => state.hideCompleted);

  const onClick = () => {
    searchParams.set('showCompleted', JSON.stringify(!completedVisible));

    setSearchParams(searchParams);
    setCompletedVisible((_completedVisible) => !_completedVisible);
  };

  useEffect(() => {
    const showCompleted = JSON.parse(searchParams.get('showCompleted') || 'true');
    setCompletedVisible(showCompleted);
  }, []);

  useEffect(() => {
    if (completedVisible) {
      showCompleted();
    } else {
      hideCompleted();
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
