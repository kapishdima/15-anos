import React from 'react';
import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';
import { useCategoriesStore } from '@/modules/categories';

type CategoriesSelectProps = BaseInputProps & {
  placeholder?: string | null;
};

export const CategoriesSelect: React.FC<CategoriesSelectProps> = ({ name, label, placeholder }) => {
  const categoriesStore = useCategoriesStore();

  if (!categoriesStore.categories.length) {
    return null;
  }

  const options = categoriesStore.categories.map((category) => ({
    value: category.id,
    label: typeof category.title === 'string' ? category.title : category.title['en'],
  }));

  return (
    <SelectField name={name} label={label} placeholder={placeholder || ''} options={options} />
  );
};
