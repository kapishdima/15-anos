import React from 'react';
import { Spinner } from './Spinner';

export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <Spinner />
    </div>
  );
};
