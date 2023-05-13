import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@components/index';

import { useTasksStore } from '../../../store/tasks';

export const ToggleVisibilityCompleted: React.FC = () => {
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
        {completedVisible ? 'Hide completed tasks' : 'Show completed tasks'}
      </Button>
    </div>
  );
};
