import React from 'react';

import { BackIcon } from '@components/index';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="back-button" onClick={onClick}>
      <BackIcon />
      <div className="back-button__title">Back</div>
    </div>
  );
};
