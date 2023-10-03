import { getFunctions } from "firebase/functions";
import { useHttpsCallable } from "react-firebase-hooks/functions";
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

export const useLogin = () => {
  const [exucute, isLoading, error] = useHttpsCallable<
    LoginPayload,
    CloutFunctionResponse
  >(getFunctions(), CloudFunctionsRoutes.LOGIN);
  const { canLogin, detectCanLogin, handleError } = useError();
  const navigate = useNavigate();

  const login = async (values: LoginCredentials) => {
    /**
      The user has 3 attempts to log in. 
      After 3 attempts the user must wait 10 * (number of attempts) seconds 
      before he can log in again 
     * */

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

      const response = await exucute(toLoginPayload(values));

      if (response?.data.error) {
        return handleError(response?.data.error);
      }

      clearInvalidAttempts();
      onSuccessLogin(response?.data);

      return response?.data;
    });
  };

  const onSuccessLogin = async (eventDetails: EventDetails) => {
    window.localStorage.setItem(EVENT_DETAILS, JSON.stringify(eventDetails));

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

  return {
    login,
    isLoading,
    error,
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
