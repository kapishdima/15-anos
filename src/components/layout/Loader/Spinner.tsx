import classNames from "classnames";
import React from "react";

export type SpinnerVariant = "white" | "accent";

type SpinnerProps = {
  variant?: SpinnerVariant;
  size?: "md" | "sm";
};

export const Spinner: React.FC<SpinnerProps> = ({
  variant = "accent",
  size = "md",
}) => {
  return (
    <div
      className={classNames("loader", `loader--${variant}`, `loader--${size}`)}
    ></div>
  );
};
