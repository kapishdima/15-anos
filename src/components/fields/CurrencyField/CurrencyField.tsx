import React, { useState } from 'react';

import { BaseInputProps, Input } from '../Input';
import { MaskedField } from '../MaskedField';
import { useCurrencyField } from './useCurrencyField';
import { useFormContext } from 'react-hook-form';

type CurrencyFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
};

export const CurrencyField: React.FC<CurrencyFieldProps> = ({ name, placeholder, label, type }) => {
  const { setValue, getValues } = useFormContext();
  const [mask, setMask] = useState({
    name: 'num USD',
    blocks: {
      num: { mask: Number, thousandsSeparator: ' ', min: 0, signed: false },
    },
  });

  useCurrencyField((value) => {
    setMask({
      name: `num ${value ? value.toString() : '0'}`,
      blocks: {
        num: { mask: Number, thousandsSeparator: ' ', min: 0, signed: false },
      },
    });
  });

  const onBlur = () => {
    const value = getValues(name);
    setValue(name, value || '0');
  };

  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container" onBlur={onBlur}>
          {label && (
            <label htmlFor={name} className="form-field__label">
              {label}
            </label>
          )}
          <div className="form-input__container">
            <MaskedField mask={mask.name} blocks={mask.blocks} {...field} />
          </div>
          {fieldState.error && <div className="form-field__error">{fieldState.error.message}</div>}
        </div>
      )}
    </Input>
  );
};
