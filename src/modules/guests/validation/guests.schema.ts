import { number, object, string } from 'yup';
import {
  FIELD_REQUIRED,
  MAX_KID_AMOUNT,
  MIN_KID_AMOUNT,
} from '../../../app/constants/validation-messages';

export const createGuestSchemaValidation = object({
  name: string().required(FIELD_REQUIRED),
  status: string().required(FIELD_REQUIRED),
  kids: number().min(0, MIN_KID_AMOUNT).max(9, MAX_KID_AMOUNT),
});
