import { ShoppingStore } from './shopping';

export const paymentsVM = (state: ShoppingStore) => {
  return state.products.map((product) => {
    return {
      ...product,
      date: new Date(product.addedData),
    };
  });
};
