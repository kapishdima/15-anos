import { number, object, string } from 'yup';
import {
  FIELD_REQUIRED,
  MAX_GUEST_AMOUNT,
  MAX_KID_AMOUNT,
  MIN_GUEST_AMOUNT,
  MIN_KID_AMOUNT,
  NO_LEADING_ZERO,
} from '@/app/constants/validation-messages';
import { noLeadingZero } from '@/app/utils/validation';

export const createGuestSchemaValidation = object({
  name: string().required(FIELD_REQUIRED),
  status: string().required(FIELD_REQUIRED),
  guests: number()
    .positive()
    .min(0, MIN_GUEST_AMOUNT)
    .max(9, MAX_GUEST_AMOUNT)
    .test('no-leading-zero', NO_LEADING_ZERO, noLeadingZero),
  kids: number()
    .positive()
    .min(0, MIN_KID_AMOUNT)
    .max(9, MAX_KID_AMOUNT)
    .test('no-leading-zero', NO_LEADING_ZERO, noLeadingZero),
});
