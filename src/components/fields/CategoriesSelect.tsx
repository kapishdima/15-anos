import React, { useEffect } from 'react';
import { SelectField } from './SelectField';
import { BaseInputProps } from './Input';
import { useCategoriesStore } from '@/modules/categories';
import { getCategoryImage } from '@/modules/tasks/ui/tasks-list/TaskImage';
// import { useFormContext } from 'react-hook-form';

type CategoriesSelectProps = BaseInputProps & {
  placeholder?: string | null;
};

export const CategoriesSelect: React.FC<CategoriesSelectProps> = ({ name, label, placeholder }) => {
  const categoriesStore = useCategoriesStore();

  const options = categoriesStore?.categories.map((category) => {
    console.log(category.color);
    return {
      value: category.id,
      label: typeof category.title === 'string' ? category.title : category.title['en'],
      icon: (
        <div className="category-select-icon" style={{ backgroundColor: `#${category.color}` }}>
          <img src={getCategoryImage(category.id as any)} alt="" />
        </div>
      ),
    };
  });

  if (!options) {
    return null;
  }

  return (
    <SelectField name={name} label={label} placeholder={placeholder || ''} options={options} />
  );
};
