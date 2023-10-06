import React from "react";
import { useCategoriesStore } from "@/modules/categories";
import { getCategoryImage } from "@/app/utils/category-icon";

import { SelectField } from "./SelectField";
import { BaseInputProps } from "./Input";
import { translated } from "@/app/utils/locale";

type CategoriesSelectProps = BaseInputProps & {
  placeholder?: string | null;
};

export const CategoriesSelect: React.FC<CategoriesSelectProps> = ({
  name,
  label,
  placeholder,
  ...baseProps
}) => {
  const categoriesStore = useCategoriesStore();

  const options = categoriesStore?.categories.map((category) => {
    return {
      value: category.id,
      label: translated(category.title),
      icon: (
        <div
          className="category-select-icon"
          style={{ backgroundColor: `#${category.color}` }}
        >
          <img src={getCategoryImage(category.id as any)} alt="" />
        </div>
      ),
    };
  });

  if (!options || !options.length) {
    return null;
  }

  return (
    <SelectField
      name={name}
      label={label}
      placeholder={placeholder || ""}
      options={options}
      {...baseProps}
    />
  );
};
