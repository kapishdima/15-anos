import React from "react";

export const FormContent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="app-form__content">{children}</div>;
};
