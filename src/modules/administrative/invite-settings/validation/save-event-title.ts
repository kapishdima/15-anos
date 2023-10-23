import { object, string } from "yup";
import {
  MIN_EVENT_TITLE_ERROR,
  MAX_EVENT_TITLE_ERROR,
} from "@app/constants/validation-messages";

export const saveEventTitleValidation = object({
  eventTitle: string()
    .min(5, MIN_EVENT_TITLE_ERROR)
    .max(25, MAX_EVENT_TITLE_ERROR),
});
