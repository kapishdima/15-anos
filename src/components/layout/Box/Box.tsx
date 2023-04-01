import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

type BoxProps = PropsWithChildren & {
  classes?: string;
  maxWidth?: string;
  minWidth?: string;
};

export const Box: React.FC<BoxProps> = ({ classes, children, maxWidth, minWidth }) => {
  return (
    <div className={classNames('box', classes)} style={{ maxWidth, minWidth }}>
      {children}
    </div>
  );
};
