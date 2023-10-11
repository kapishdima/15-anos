import { PriceRange, ProductSearchStore } from "../products_search";

export const isActivePrice = (state: ProductSearchStore, range: PriceRange) => {
  return Boolean(state.prices.find((price) => price.title === range.title));
};

export const isActiveColor = (state: ProductSearchStore, color: string) => {
  return Boolean(state.colors.find((_color) => _color === color));
};
