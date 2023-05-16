import { number, object, ref, string } from 'yup';
import {
  FIELD_REQUIRED,
  NO_LEADING_ZERO,
  PAID_SHOULD_LESS,
} from '@/app/constants/validation-messages';
import { noLeadingZero } from '@/app/utils/validation';

export const createPaymentSchemaValidation = object({
  title: string().required(FIELD_REQUIRED),
  categoryId: string().required(FIELD_REQUIRED),
  paid: number()
    .max(ref('pay'), PAID_SHOULD_LESS)
    .test('no-leading-zero', NO_LEADING_ZERO, noLeadingZero),
  pay: number().test('no-leading-zero', NO_LEADING_ZERO, noLeadingZero),
});
