import classNames from "classnames";
import React, { HTMLAttributes, PropsWithChildren, MouseEvent } from "react";

import { Spinner } from "@components/index";

type ButtonVariants = "primary" | "error" | "text" | "success" | "secondary";
type ButtonAppearance = "filled" | "ghost" | "outline";

type ButtonProps = PropsWithChildren &
  HTMLAttributes<HTMLButtonElement> & {
    type?: "submit" | "button";
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariants;
    appearance?: ButtonAppearance;
    propagateEvent?: boolean;
    onClick?: () => void;
  };

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      appearance = "filled",
      children,
      loading,
      disabled,
      className,
      onClick,
      propagateEvent = true,
      ...attrs
    },
    ref
  ) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!propagateEvent) {
        event.stopPropagation();
      }

      if (onClick) {
        onClick();
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classNames("button", variant, appearance, className)}
        disabled={disabled}
        onClick={handleClick}
        {...attrs}
      >
        <div className={classNames("button-children", { hide: loading })}>
          {children}
        </div>
        {loading && (
          <div className="button-loader">
            <Spinner variant="white" />
          </div>
        )}
      </button>
    );
  }
);
