import { object, string } from 'yup';
import { FIELD_REQUIRED } from '../../../app/constants/validation-messages';

export const createTaskSchemaValidation = object({
  title: string().required(FIELD_REQUIRED),
});
