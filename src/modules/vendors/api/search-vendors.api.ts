import { Collections } from "@app/constants/collections";
import { getSnapshotCollection } from "@/modules/firebase/firestore";

import { SearchedVendor } from "../store/vendors.types";
import { getPosition } from "@/modules/map/api/map";
import { where } from "firebase/firestore";

import { orderBy } from "lodash";
import intersectionby from "lodash.intersectionby";

const GEOLOCATION_RADIUS = 0.5;

export const searchVendorByPosition = async (
  categoryId: string
): Promise<SearchedVendor[]> => {
  const geolocation = getPosition();

  const vendorsInLat = await getSnapshotCollection<SearchedVendor[]>(
    Collections.SEARCH_VENDORS,
    [],
    [
      where("latitude", ">=", geolocation.lat - GEOLOCATION_RADIUS),
      where("latitude", "<=", geolocation.lat + GEOLOCATION_RADIUS),
      where("categoryId", "==", categoryId),
    ]
  );

  const vendorsInLng = await getSnapshotCollection<SearchedVendor[]>(
    Collections.SEARCH_VENDORS,
    [],
    [
      where("longitude", ">=", geolocation.lng - GEOLOCATION_RADIUS),
      where("longitude", "<=", geolocation.lng + GEOLOCATION_RADIUS),
      where("categoryId", "==", categoryId),
    ]
  );

  const vendors = intersectionby(vendorsInLat, vendorsInLng, "id");
  orderBy(vendors, "popularity", "desc");

  return vendors;
};
