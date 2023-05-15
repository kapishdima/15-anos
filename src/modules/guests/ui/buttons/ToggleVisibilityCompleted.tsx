import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@components/index';
import { useGuestsStore } from '../../store/guests';

export const ToggleVisibilityConfirmed: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmedVisible, setCompletedVisible] = useState(true);

  const showConfirmed = useGuestsStore((state) => state.showConfirmed);
  const hideConfirmed = useGuestsStore((state) => state.hideConfirmed);

  const onClick = () => {
    if (confirmedVisible) {
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
    if (confirmedVisible) {
      showConfirmed();
    } else {
      hideConfirmed();
    }
  }, [confirmedVisible]);

  return (
    <div className="toggle-visibility">
      <Button appearance="ghost" variant="success" onClick={onClick}>
        {confirmedVisible ? 'Hide confirmed guests' : 'Show confirmed guests'}
      </Button>
    </div>
  );
};
