import React from "react";

export const FormActions: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="app-form__actions">{children}</div>;
};
