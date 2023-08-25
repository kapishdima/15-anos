import { ProfileStore } from "../profile";

export const getCountyCode = (state: ProfileStore) => {
  return state.profile?.country.split(";")[0];
};

export const getCurrencyCode = (state: ProfileStore) => {
  return state.profile?.currency.split(";")[0];
};

export const getCurrencySymbol = (state: ProfileStore) => {
  return state.profile?.currency.split(":")[1];
};
