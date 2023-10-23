import React, { HTMLInputTypeAttribute } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useFormContext,
} from "react-hook-form";

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
  htmlName?: string;
  name: string;
  label?: string | null;
  suffix?: string;
  type?: HTMLInputTypeAttribute;
  variant?: "filled" | "outline";
  capitilizedInput?: boolean;
  capitilizedWords?: boolean;
  style?: React.CSSProperties;
  autoComplete?: string;
  autoFocus?: boolean;
};

type InputProps = BaseInputProps & {
  children: Children;
};

export const Input: React.FC<InputProps> = ({ name, children }) => {
  const { control } = useFormContext();
  return <Controller name={name} control={control} render={children} />;
};
