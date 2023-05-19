import React, { ChangeEvent, KeyboardEvent } from 'react';
import { BaseInputProps, Input } from './Input';
import classNames from 'classnames';
import { ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';

type NumberFieldProps = BaseInputProps & {
  placeholder?: string | null;
  color?: string;
  iconBefore?: string;
  onChange?: (event: ChangeEvent) => void;
  max?: number;
};

export const NumberField: React.FC<NumberFieldProps> = ({
  name,
  placeholder,
  label,
  suffix,
  color,
  iconBefore,
  onChange,
  max,
}) => {
  const { setValue } = useFormContext();

  const setDefaultValue = (field: ControllerRenderProps<FieldValues, any>) => {
    setValue(name, field.value || '0');
  };

  const handleChange = (event: ChangeEvent, onChange: (event: ChangeEvent) => void) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (max && parseInt(value) > max) {
      return event.preventDefault();
    }

    onChange(event);
  };

  const acceptOnlyDigits = (evt: KeyboardEvent) =>
    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault();

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
            <div
              className={classNames('form-input__container', { 'with-icon': Boolean(iconBefore) })}>
              {iconBefore ? (
                <img className="form-input__before-icon" src={iconBefore} alt="" />
              ) : null}
              <input
                id={name}
                type={'number'}
                placeholder={placeholder || ''}
                className={classNames('form-field', 'text-form-field', {
                  'form-field--error': fieldState.error,
                })}
                name={field.name}
                value={field.value}
                onChange={(event) => handleChange(event, field.onChange)}
                onBlur={() => setDefaultValue(field)}
                ref={field.ref}
                style={{ color }}
                onKeyDown={acceptOnlyDigits}
              />
              {suffix && <div className="form-input__suffix">{suffix}</div>}
            </div>
            {fieldState.error && (
              <div className="form-field__error">{fieldState.error.message}</div>
            )}
          </div>
        );
      }}
    </Input>
  );
};
