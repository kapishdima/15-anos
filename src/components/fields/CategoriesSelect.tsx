import React, { useEffect } from 'react';
import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';
import { useCategoriesStore } from '@/modules/categories';
// import { useFormContext } from 'react-hook-form';

type CategoriesSelectProps = BaseInputProps & {
  placeholder?: string | null;
};

export const CategoriesSelect: React.FC<CategoriesSelectProps> = ({ name, label, placeholder }) => {
  const categoriesStore = useCategoriesStore();
  // const { setValue } = useFormContext();

  const options = categoriesStore?.categories.map((category) => ({
    value: category.id,
    label: typeof category.title === 'string' ? category.title : category.title['en'],
  }));

  // useEffect(() => {
  //   setValue(name, options[0]?.value);
  // }, [options]);

  if (!options) {
    return null;
  }

  return (
    <SelectField name={name} label={label} placeholder={placeholder || ''} options={options} />
  );
};
