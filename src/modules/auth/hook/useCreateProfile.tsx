import { getFunctions, httpsCallable } from "firebase/functions";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";

import { CloutFunctionResponse } from "@app/http/http";
import { useUserLocation } from "@app/location/useUserLocation";
import { currensies } from "@app/data/currencies";
import { getTimezoneOffset } from "@app/location/getTimezone";
import {
  EVENT_DETAILS,
  SUCCESS_ACCOUNT_CREATION,
} from "@app/constants/local-storage-keys";
import { CloudFunctionsRoutes } from "@app/constants/cloud-functions";

import { authAnonymously, forceRefreshUser } from "@/modules/firebase/auth";
import { auth } from "@/modules/firebase";

import { useError } from "./useError";
import {
  CreateProfileCredentials,
  CreateProfileRequest,
  EventDetails,
} from "../@types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { countries } from "@/app/data/countries";
import { useState } from "react";

export const useCreateProfile = () => {
  // const [exucute, isLoading, error] = useHttpsCallable<
  // CreateProfileRequest,
  // CloutFunctionResponse
  // >(getFunctions(), CloudFunctionsRoutes.CREATE_PROFILE);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { handleError, detectCanCreateProfile } = useError();
  const location = useUserLocation();
  const navigate = useNavigate();

  const toCreateProfilePayload = (values: CreateProfileCredentials) => {
    const formatedDate = format(new Date(values.date), "yyyy-MM-dd-HH:mm");

    const country = countries.find(
      (country) => country.code === values.country
    );
    const currency = currensies.find(
      (currency) => currency.code === values.currency
    );

    return {
      ...values,
      country: `${country?.code};${country?.emoji}:${country?.name}`,
      currency: `${currency?.code};${currency?.symbol}:${currency?.symbol_native}`,
      guests: parseInt(values.guests),
      budget: parseInt(values.budget),
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

  const onSuccessCreation = async (eventDetails: EventDetails) => {
    if (eventDetails) {
      window.localStorage.setItem(EVENT_DETAILS, JSON.stringify(eventDetails));
    }

    /**
     In order for the data of an anonymous user to be successfully updated, 
     you need to do force get user token 
     * */

    await forceRefreshUser();

    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        navigate(AppRoutes.ROOT);
      }
    });
  };

  const createProfile = async (values: any) => {
    setLoading(true);
    if (!detectCanCreateProfile()) {
      setLoading(false);
      return toast.error(
        t(
          "You cannot create a new profile because you have already created 3 profiles"
        )
      );
    }

    await authAnonymously();

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const callLogin = httpsCallable<
        CreateProfileRequest,
        CloutFunctionResponse
      >(getFunctions(), CloudFunctionsRoutes.CREATE_PROFILE);
      const response = await callLogin(toCreateProfilePayload(values));

      // const response = await exucute(toCreateProfilePayload(values));
      if (response?.data.error) {
        setLoading(false);
        return handleError(response?.data.error);
      }

      saveSuccessAccountCreation();
      onSuccessCreation(response?.data);
      setLoading(true);

      return response?.data;
    });
  };

  return {
    createProfile,
    isLoading: loading,
  };
};
