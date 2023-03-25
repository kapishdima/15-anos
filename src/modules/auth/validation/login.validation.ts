import { object, string } from 'yup';
import {
  FIELD_REQUIRED,
  MIN_EVENT_TITLE_ERROR,
  MIN_PASSWORD_ERROR,
} from '../../../app/contants/validation-messages';
import { MIN_EVENT_TITLE, MIN_PASSWORD } from '../../../app/contants/validation-constants';

export const loginSchemaValidation = object({
  password: string().min(MIN_PASSWORD, MIN_PASSWORD_ERROR).required(FIELD_REQUIRED),
  eventTitle: string().min(MIN_EVENT_TITLE, MIN_EVENT_TITLE_ERROR),
});
