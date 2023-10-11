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
        className={classNames("button", variant, appearance)}
        disabled={disabled}
        onClick={handleClick}
        {...attrs}
      >
        {loading ? <Spinner variant="white" /> : children}
      </button>
    );
  }
);
