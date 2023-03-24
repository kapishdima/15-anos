import React from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useFormContext,
} from 'react-hook-form';

type Children = ({
  field,
  fieldState,
  formState,
}: {
  field: ControllerRenderProps<FieldValues, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}) => JSX.Element;

export type BaseInputProps = {
  name: string;
};

type InputProps = BaseInputProps & {
  children: Children;
};

export const Input: React.FC<InputProps> = ({ name, children }) => {
  const { control } = useFormContext();
  return <Controller name={name} control={control} render={children} />;
};
