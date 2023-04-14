import React from 'react';
import { Spinner } from '../Loader/Spinner';

export const AppLoader: React.FC = () => {
  return (
    <div className="app-loader">
      <Spinner />
    </div>
  );
};
