import { RecommendedShoppingStore } from './shopping_recommended';
import { ShoppingStore } from './manual_shopping_list';
import { WishStore } from './manual_wish_list';

export const getShoppingCategory = (id: string = '', state: RecommendedShoppingStore) => {
  return state.products.find((product) => product.id === id);
};

export const isLikedProduct = (id: string, state: ShoppingStore | WishStore) => {
  return state.products.find((product) => product.id === id);
};
