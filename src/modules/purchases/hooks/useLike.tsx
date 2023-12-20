import { useManualShoppingStore } from "../store/manual_shopping_list";
import { useManualWishList } from "../store/manual_wish_list";
import { useProductsStore } from "../store/products";
import { isLikedProduct } from "../store/shopping.selector";
import { ProductTypes, ProductViewModal } from "../store/purcheses.types";
import { useSearchParams } from "react-router-dom";

export const useLike = (product: ProductViewModal) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as ProductTypes;

  const isShoppingSelected = useManualShoppingStore((state) =>
    isLikedProduct(product.id, state)
  );
  const isWishSelected = useManualWishList((state) =>
    isLikedProduct(product.id, state)
  );

  const loading = useProductsStore((state) => state.actionLoading);
  const actionId = useProductsStore((state) => state.actionProductId);

  const addProduct = useProductsStore((state) => state.addProduct);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);

  const fetchManualShoppingList = useManualShoppingStore(
    (state) => state.fetchManualShoppingList
  );
  const fetchManualWishList = useManualWishList(
    (state) => state.fetchManualWishList
  );

  const liked = type === "registry" ? isWishSelected : isShoppingSelected;

  const likeProduct = async () => {
    await addProduct(type, product);
    fetchManualShoppingList(/*force*/ true);
    fetchManualWishList(/*force*/ true);
  };

  const disslikeProduct = async () => {
    await deleteProduct(type, product.id);
    fetchManualShoppingList(/*force*/ true);
    fetchManualWishList(/*force*/ true);
  };

  return {
    liked,
    loading: loading && actionId === (product.id || product.title),
    likeProduct,
    disslikeProduct,
  };
};
