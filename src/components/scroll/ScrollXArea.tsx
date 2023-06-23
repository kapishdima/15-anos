import React, { useRef } from 'react';
import classNames from 'classnames';

import { AngleLeftIcon } from '../icons/AngleLeftIcon';
import { AngleRightIcon } from '../icons';
import { useScroll } from './useScroll';

export const ScrollXArea: React.FC<React.PropsWithChildren> = ({ children }) => {
  const scrollableContainer = useRef<HTMLDivElement | null>(null);
  const scroll = useScroll(scrollableContainer);

  return (
    <div className="scroll-x-area">
      <div
        className={classNames('scroll-left scroll-button', {
          hidden: !scroll?.hasPrev,
        })}
        onClick={scroll?.prev}>
        <AngleLeftIcon />
      </div>
      <div
        className="scroll-x-area__container"
        ref={scrollableContainer}
        onScroll={scroll?.onChangePosition}>
        {children}
      </div>
      <div
        className={classNames('scroll-right scroll-button', {
          hidden: !scroll?.hasNext,
        })}
        onClick={scroll?.next}>
        <AngleRightIcon />
      </div>
    </div>
  );
};
