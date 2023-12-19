import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";

import { CloutFunctionResponse } from "@app/http/http";
import {
  EVENT_DETAILS,
  INVALID_LOGIN_ATTEMPT,
} from "@app/constants/local-storage-keys";
import { AppRoutes } from "@app/router/routes";
import { CloudFunctionsRoutes } from "@app/constants/cloud-functions";
import {
  EventDetails,
  LoginCredentials,
  LoginPayload,
  UserRoles,
} from "../@types";
import { authAnonymously, forceRefreshUser } from "../../firebase/auth";
import { auth } from "../../firebase";
import { useError } from "./useError";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { canLogin, detectCanLogin, handleError } = useError();
  const navigate = useNavigate();

  const login = async (values: LoginCredentials) => {
    /**
      The user has 3 attempts to log in. 
      After 3 attempts the user must wait 10 * (number of attempts) seconds 
      before he can log in again 
     * */
    setLoading(true);

    const hasMaxAttempts = detectCanLogin();

    if (hasMaxAttempts) {
      return;
    }

    /**
     Since all users in firebase are anonymous - before login, 
     we need to create an anonymous user session 
     * */

    await authAnonymously();

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      const callLogin = httpsCallable<LoginPayload, CloutFunctionResponse>(
        getFunctions(),
        CloudFunctionsRoutes.LOGIN
      );
      const response = await callLogin(toLoginPayload(values));

      if (response?.data.error) {
        setLoading(false);
        return handleError(response?.data.error);
      }

      clearInvalidAttempts();
      onSuccessLogin(response?.data);
      setLoading(false);

      return response?.data;
    });
  };

  const onSuccessLogin = async (eventDetails: EventDetails) => {
    if (eventDetails) {
      window.localStorage.setItem(EVENT_DETAILS, JSON.stringify(eventDetails));
    }

    /**
     In order for the data of an anonymous user to be successfully updated, 
     you need to do force get user token 
     * */

    auth.onAuthStateChanged(async () => {
      if (auth.currentUser) {
        forceRefreshUser().then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 500);
          navigate(AppRoutes.ROOT);
        });
      }
    });

    // auth.onAuthStateChanged(() => {
    //   if (auth.currentUser) {
    //     navigate(AppRoutes.ROOT);
    //   }
    // });
  };

  return {
    login,
    isLoading: loading,
    canLogin,
  };
};

/**
  Returns the user's role.
  
  The last character is a capital letter - owner
  The last character is a small letter - assintant
  All the rest - viewer
 
 * */

const getUserRole = (password: string): UserRoles => {
  const isOwner = /.*[A-Z]$/gm.test(password);
  const isAssistant = /.*[a-z]$/gm.test(password);

  return isOwner ? "owner" : isAssistant ? "assistant" : "viewer";
};

const toLoginPayload = (values: LoginCredentials): LoginPayload => {
  const role = getUserRole(values.password);

  return {
    role,
    password: values.password,
    eventTitle: values.eventTitle,
  };
};

const clearInvalidAttempts = () => {
  window.localStorage.removeItem(INVALID_LOGIN_ATTEMPT);
};
