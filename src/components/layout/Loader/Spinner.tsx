import classNames from 'classnames';
import React from 'react';

type SpinnerProps = {
  variant?: 'white' | 'accent';
};

export const Spinner: React.FC<SpinnerProps> = ({ variant = 'accent' }) => {
  return <div className={classNames('loader', `loader--${variant}`)}></div>;
};
