import React from 'react';
import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';
import { useCategoriesStore } from '@/modules/categories';

type CategoriesSelectProps = BaseInputProps & {
  placeholder?: string | null;
};

export const CategoriesSelect: React.FC<CategoriesSelectProps> = ({ name, label, placeholder }) => {
  const categoriesStore = useCategoriesStore();

  const options = categoriesStore.categories.length
    ? categoriesStore.categories.map((category) => ({
        value: category.title['en'],
        label: category.title['en'],
      }))
    : [];

  return (
    <SelectField name={name} label={label} placeholder={placeholder || ''} options={options} />
  );
};
