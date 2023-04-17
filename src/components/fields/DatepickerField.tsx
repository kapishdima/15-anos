import React from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { BaseInputProps, Input } from './Input';

type DatepickerFieldProps = BaseInputProps & {
  placeholder?: string | null;
  defaultValue?: Date;
  min?: Date;
};

export const DatepickerField: React.FC<DatepickerFieldProps> = ({ name, min, label }) => {
  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container">
          {label && (
            <label htmlFor={name} className="form-field__label">
              {label}
            </label>
          )}
          <DatePicker
            selected={field.value}
            showTimeSelect
            onChange={(date: any) => field.onChange(date)}
            timeFormat="HH:mm"
            dateFormat="MMMM d yyyy - HH:mm"
            minDate={min ? new Date(min) : null}
          />

          {fieldState.error && <div className="form-field__error">{fieldState.error.message}</div>}
        </div>
      )}
    </Input>
  );
};