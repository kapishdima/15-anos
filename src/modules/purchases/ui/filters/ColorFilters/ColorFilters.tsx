import React from "react";

import { useProductParameters } from "@/modules/purchases/store/products_parameters";
import { useProductsSearch } from "@/modules/purchases/store/products_search";
import { isActiveColor } from "@/modules/purchases/store/selectors/product_search.selector";
import classNames from "classnames";

type ColorFiltersProps = {
  colorsForFilter: string[];
};

type ColorFilterItemProps = {
  color: { label: string; value: string | undefined };
};

export const ColorFilters: React.FC<ColorFiltersProps> = ({
  colorsForFilter,
}) => {
  const parameters = useProductParameters((state) => state.parameters);
  const colors = colorsForFilter.map((color) => ({
    label: color,
    value: parameters?.colors[color].color,
  }));

  return (
    <div className="color-filters">
      <h3 className="color-filters__title">Colors</h3>

      <div className="color-filters__list">
        {colors.map((color) => (
          <ColorFilterItem color={color || ""} />
        ))}
      </div>
    </div>
  );
};

const ColorFilterItem: React.FC<ColorFilterItemProps> = ({ color }) => {
  const setColor = useProductsSearch((state) => state.setColor);
  const onClick = () => {
    setColor(color.label);
  };

  const isActive = useProductsSearch((state) =>
    isActiveColor(state, color.label)
  );

  return (
    <div
      className={classNames("color-filters__item", { active: isActive })}
      style={{
        backgroundColor: `#${color.value}`,
        //@ts-ignore
        "--color": `#${color.value === "ffffff" ? "000000" : color.value}`,
      }}
      onClick={onClick}
    ></div>
  );
};
