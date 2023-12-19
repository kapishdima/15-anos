import { getFunctions, httpsCallable } from "firebase/functions";
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
import { languages } from "@/app/data/languages";
import { useModal } from "@/components";
import { CREATE_PROFILE_INDICATOR } from "../ui/CreateProfileForm";

export const useCreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { handleError, detectCanCreateProfile } = useError();
  const location = useUserLocation();
  const navigate = useNavigate();
  const { close } = useModal();

  const toCreateProfilePayload = (values: CreateProfileCredentials) => {
    const formatedDate = format(new Date(values.date), "yyyy-MM-dd-HH:mm");

    const country = countries.find(
      (country) => country.code === values.country
    );
    const currency = currensies.find(
      (currency) => currency.code === values.currency
    );

    const language = languages.find(
      (language) => language.code === values.language
    );

    return {
      ...values,
      country: `${country?.code};${country?.emoji}:${country?.name}`,
      currency: `${currency?.code};${currency?.symbol}:${currency?.symbol_native}`,
      language: `${language?.code};${language?.flag}:${language?.name}`,
      guests: parseInt(values.guests),
      budget: parseInt(values.budget),
      date: formatedDate,
      timezone: getTimezoneOffset(location?.timezone || ""),
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

    // await forceRefreshUser();

    auth.onAuthStateChanged(async () => {
      if (auth.currentUser) {
        forceRefreshUser().then(() => navigate(AppRoutes.ROOT));
      }
    });
  };

  const createProfile = async (values: any) => {
    setLoading(true);
    if (!detectCanCreateProfile()) {
      setLoading(false);
      close(CREATE_PROFILE_INDICATOR);
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

      const callCreateProfile = httpsCallable<
        CreateProfileRequest,
        CloutFunctionResponse
      >(getFunctions(), CloudFunctionsRoutes.CREATE_PROFILE);

      const response = await callCreateProfile(toCreateProfilePayload(values));

      if (response?.data.error) {
        setLoading(false);
        return handleError(response?.data.error);
      }

      saveSuccessAccountCreation();
      onSuccessCreation(response?.data);
      setLoading(false);

      return response?.data;
    });
  };

  return {
    createProfile,
    isLoading: loading,
  };
};
