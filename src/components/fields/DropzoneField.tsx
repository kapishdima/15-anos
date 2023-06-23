import React from 'react';
import { BaseInputProps, Input } from './Input';
import { Dropzone } from '../dropzone/Dropzone';
import { useFormContext } from 'react-hook-form';

type DropzoneFieldProps = BaseInputProps & {};

export const DropzoneField: React.FC<DropzoneFieldProps> = ({ name, label }) => {
  const { setValue } = useFormContext();

  const onAccept = (files: File[]) => {
    setValue(name, files);
  };

  return (
    <Input name={name}>
      {() => (
        <div className="form-field__container">
          {label && (
            <label htmlFor={name} className="form-field__label">
              {label}
            </label>
          )}
          <Dropzone onAccept={onAccept} />
        </div>
      )}
    </Input>
  );
};
