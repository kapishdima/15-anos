import React from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { BaseInputProps, Input } from './Input';
import { useTranslation } from 'react-i18next';

type DatepickerFieldProps = BaseInputProps & {
  placeholder?: string | null;
  defaultValue?: Date;
  min?: Date;
  showTimeSelect?: boolean;
};

export const DatepickerField: React.FC<DatepickerFieldProps> = ({
  name,
  min,
  label,
  showTimeSelect = true,
}) => {
  const { t } = useTranslation();

  return (
    <Input name={name}>
      {({ field, fieldState }) => {
        return (
          <div className="form-field__container">
            {label && (
              <label htmlFor={name} className="form-field__label">
                {t(label)}
              </label>
            )}
            <DatePicker
              selected={field.value}
              showTimeSelect={showTimeSelect}
              onChange={(date: any) => field.onChange(date)}
              timeFormat="HH:mm"
              dateFormat={showTimeSelect ? 'MMMM d yyyy - HH:mm' : 'MMMM d yyyy'}
              minDate={min ? new Date(min) : null}
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
