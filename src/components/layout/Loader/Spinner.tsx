import classNames from 'classnames';
import React from 'react';

type SpinnerProps = {
  variant?: 'white' | 'accent';
  size?: 'md' | 'sm';
};

export const Spinner: React.FC<SpinnerProps> = ({ variant = 'accent', size = 'md' }) => {
  return <div className={classNames('loader', `loader--${variant}`, `loader--${size}`)}></div>;
};
