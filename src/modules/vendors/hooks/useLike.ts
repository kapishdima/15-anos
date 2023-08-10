import { isVendorLiked } from "../store/vendors.selector";

import { useVendorsStore } from "../store/vendors.store";
import { SearchedVendor } from "../store/vendors.types";

export const useLike = (vendor: SearchedVendor) => {
  const loading = useVendorsStore((state) => state.actionLoading);
  const actionId = useVendorsStore((state) => state.actionId);
  const liked = useVendorsStore((state) => isVendorLiked(vendor.id, state));

  const sendLikedVendor = useVendorsStore((state) => state.likeVendor);
  const sendDisslikedVendor = useVendorsStore((state) => state.dislikeVendor);

  const fetchManualVendor = useVendorsStore((state) => state.fetchManualVendor);

  const likeVendor = async () => {
    await sendLikedVendor(vendor);
    fetchManualVendor(/*force*/ true);
  };

  const disslikeVendor = async () => {
    await sendDisslikedVendor(vendor.id);
    fetchManualVendor(/*force*/ true);
  };

  return {
    liked,
    loading: loading && actionId === vendor.id,
    likeVendor,
    disslikeVendor,
  };
};
