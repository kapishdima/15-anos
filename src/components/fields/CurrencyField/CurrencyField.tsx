import React, { useState } from 'react';

import { BaseInputProps, Input } from '../Input';
import { MaskedField } from '../MasketField';
import { useCurrencyField } from './useCurrencyField';

type CurrencyFieldProps = BaseInputProps & {
  placeholder?: string | null;
};

export const CurrencyField: React.FC<CurrencyFieldProps> = ({ name, placeholder, label, type }) => {
  const [mask, setMask] = useState({
    name: 'num USD',
    blocks: {
      num: { mask: Number, thousandsSeparator: ' ', min: 0, signed: false },
    },
  });

  useCurrencyField((value) => {
    setMask({
      name: `num ${value}`,
      blocks: {
        num: { mask: Number, thousandsSeparator: ' ', min: 0, signed: false },
      },
    });
  });

  return (
    <Input name={name}>
      {({ field, fieldState }) => (
        <div className="form-field__container">
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
