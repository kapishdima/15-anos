import React from 'react';
import { BaseInputProps, Input } from './Input';
import { Option, Select } from '../select/Select';

type SelectFieldProps = BaseInputProps & {
  options: Option[];
  placeholder?: string;
  onSelect?: (value: string) => void;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  options,
  label,
  name,
  placeholder,
  onSelect,
}) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => {
        return (
          <div className="form-field__container">
            {label && (
              <label htmlFor={name} className="form-field__label">
                {label}
              </label>
            )}

            <Select
              defaultSelected={field.value}
              placeholder={placeholder}
              options={options}
              onSelect={(value: string) => {
                if (onSelect) {
                  onSelect(value);
                }
                field.onChange(value);
              }}
            />
            {fieldState.error && (
              <div className="form-field__error">{fieldState.error.message}</div>
            )}
          </div>
        );
      }}
    </Input>
  );
};
