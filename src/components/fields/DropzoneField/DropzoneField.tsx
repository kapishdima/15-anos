import React from "react";
import { BaseInputProps } from "../Input";
import { DefaultFileItem, Dropzone } from "../../dropzone/Dropzone";
import { useTranslation } from "react-i18next";

type DropzoneFieldProps = Omit<BaseInputProps, "name"> & {
  onUpload: (files: File) => void;
  name?: string;
  defaultFile?: DefaultFileItem;
  loading?: boolean;
};

export const DropzoneField: React.FC<DropzoneFieldProps> = ({
  name,
  label,
  defaultFile,
  loading,
  onUpload,
}) => {
  const { t } = useTranslation();

  return (
    <div className="form-field__container fileuploader__container">
      {label && (
        <label htmlFor={name} className="form-field__label">
          {t(label)}
        </label>
      )}
      <Dropzone
        onUpload={onUpload}
        defaultFile={defaultFile}
        loading={loading}
      />
    </div>
  );
};
