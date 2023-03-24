import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

type BoxProps = PropsWithChildren & {
  classes?: string;
  maxWidth?: string;
};

export const Box: React.FC<BoxProps> = ({ classes, children, maxWidth }) => {
  return (
    <div className={classNames('box', classes)} style={{ maxWidth }}>
      {children}
    </div>
  );
};
