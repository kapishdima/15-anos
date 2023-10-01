import { getFunctions } from "firebase/functions";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";

import { CloutFunctionResponse } from "@app/http/http";
import { useUserLocation } from "@app/location/useUserLocation";
import { currensies } from "@app/data/currencies";
import { getTimezoneOffset } from "@app/location/getTimezone";
import { SUCCESS_ACCOUNT_CREATION } from "@app/constants/local-storage-keys";
import { CloudFunctionsRoutes } from "@app/constants/cloud-functions";

import { authAnonymously } from "@/modules/firebase/auth";
import { auth } from "@/modules/firebase";

import { useError } from "./useError";
import { CreateProfileCredentials, CreateProfilePayload } from "../@types";

export const useCreateProfile = () => {
  const [exucute, isLoading, error] = useHttpsCallable<
    CreateProfilePayload,
    CloutFunctionResponse
  >(getFunctions(), CloudFunctionsRoutes.CREATE_PROFILE);
  const { t } = useTranslation();
  const { handleError, detectCanCreateProfile } = useError();
  const location = useUserLocation();

  const toCreateProfilePayload = (values: CreateProfileCredentials) => {
    const formatedDate = format(new Date(values.date), "yyyy-MM-dd-HH:mm");
    return {
      ...values,
      date: formatedDate,
      timezone: getTimezoneOffset(location?.timezone || ""),
      market:
        currensies.find(
          (currency) => currency.code === location?.country.toLowerCase()
        )?.code || "",
    };
  };

  /**
   A user can create a maximum of 3 accounts, so we need to store 
   the number of successfully created accounts. 
   
   If a user tries to create an account and 
   he already has 3 created accounts - we prohibit creating a new one
   * */

  const saveSuccessAccountCreation = () => {
    const successAccountCreations = JSON.parse(
      window.localStorage.getItem(SUCCESS_ACCOUNT_CREATION) || "0"
    );
    window.localStorage.setItem(
      SUCCESS_ACCOUNT_CREATION,
      successAccountCreations + 1
    );
  };

  const createProfile = async (values: any) => {
    if (!detectCanCreateProfile()) {
      return toast.error(
        t(
          "You cannot create a new profile because you have already created 3 profiles"
        )
      );
    }

    await authAnonymously();

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      const response = await exucute(toCreateProfilePayload(values));
      if (response?.data.error) {
        return handleError(response?.data.error);
      }

      saveSuccessAccountCreation();

      return response?.data;
    });
  };

  return {
    createProfile,
    isLoading,
    error,
  };
};
