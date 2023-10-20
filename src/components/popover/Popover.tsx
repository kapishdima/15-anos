import React, { useRef } from "react";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { useOnClickOutside } from "usehooks-ts";

type PopoverProps = {
  opened: boolean;
  placement: Placement;
  triggerElement: JSX.Element;
  onClickOutside: () => void;
  className?: string;
};

export const Popover = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<PopoverProps>
>(
  (
    { children, placement, opened, triggerElement, className, onClickOutside },
    referenceElement
  ) => {
    const containerElement = useRef(null);
    const popperElement = useRef<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(
      // @ts-ignore
      referenceElement?.current,
      popperElement.current,
      {
        placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      }
    );

    useOnClickOutside<HTMLDivElement>(containerElement, onClickOutside);

    return (
      <div ref={containerElement}>
        {triggerElement}
        <div
          id="tooltip"
          className={className}
          data-show={opened}
          ref={popperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
        </div>
      </div>
    );
  }
);
