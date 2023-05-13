import { number, object, ref, string } from 'yup';
import { FIELD_REQUIRED, PAID_SHOULD_LESS } from '../../../app/constants/validation-messages';

export const createPaymentSchemaValidation = object({
  title: string().required(FIELD_REQUIRED),
  categoryId: string().required(FIELD_REQUIRED),
  paid: number().max(ref('pay'), PAID_SHOULD_LESS),
  pay: number(),
});
