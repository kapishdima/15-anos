import React from "react";

type PasswordItemProps = {
  role: string;
  description: string;
  password: string;
  loading?: boolean;
};

export const PasswordItem: React.FC<PasswordItemProps> = ({
  role,
  description,
  password,
  loading,
}) => {
  return (
    <div className="password-item">
      <div className="password-row">
        <div className="password-role">{role}</div>
        <div className="password-value">
          <span className="password-value__label">password:</span>{" "}
          <span className="password-value__text">{password}</span>
        </div>
      </div>
      <p className="password-description">{description}</p>
    </div>
  );
};
