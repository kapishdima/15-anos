import React from 'react';

import { ColorResult, SketchPicker } from 'react-color';
import { Input } from './Input';
import { useFormContext } from 'react-hook-form';

type ColorPickerFieldProps = {
  name: string;
};

export const ColorPickerField: React.FC<ColorPickerFieldProps> = ({ name }) => {
  const { setValue } = useFormContext();

  const onColorChange = (color: ColorResult) => {
    setValue(name, color.hex);
  };

  return (
    <Input name={name}>
      {({ field }) => <SketchPicker color={field.value} onChange={onColorChange} />}
    </Input>
  );
};
