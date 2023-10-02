import React, { useRef } from "react";
import classNames from "classnames";

import { AngleLeftIcon } from "../icons/AngleLeftIcon";
import { AngleRightIcon } from "../icons";
import { useScroll } from "./useScroll";

type ScrollXAreaProps = {
  scrollWhenClick?: boolean;
  containerStyle?: React.CSSProperties;
};

export const ScrollXArea: React.FC<
  React.PropsWithChildren<ScrollXAreaProps>
> = ({ children, containerStyle, scrollWhenClick = false }) => {
  const scrollableContainer = useRef<HTMLDivElement | null>(null);
  const scroll = useScroll(scrollableContainer);

  return (
    <div className="scroll-x-area" style={containerStyle}>
      <div
        className={classNames("scroll-left scroll-button", {
          hidden: !scroll?.hasPrev,
        })}
        onClick={scroll?.prev}
      >
        <AngleLeftIcon />
      </div>
      <div
        className="scroll-x-area__container"
        ref={scrollableContainer}
        onScroll={scroll?.onChangePosition}
      >
        {scrollWhenClick
          ? React.Children.map(children, (child) => (
              <div onClick={scroll?.scrollIntoElement}>{child}</div>
            ))
          : children}
      </div>
      <div
        className={classNames("scroll-right scroll-button", {
          hidden: !scroll?.hasNext,
        })}
        onClick={scroll?.next}
      >
        <AngleRightIcon />
      </div>
    </div>
  );
};
