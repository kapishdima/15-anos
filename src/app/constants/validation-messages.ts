import { MIN_PASSWORD, MIN_EVENT_TITLE } from './validation-constants';

export const MIN_PASSWORD_ERROR = `Password must have at least ${MIN_PASSWORD} characters`;
export const MIN_EVENT_TITLE_ERROR = `Event title must have at least ${MIN_EVENT_TITLE} characters`;
export const FIELD_REQUIRED = 'Is a required field';

export const PAID_SHOULD_LESS = 'Pay should be less than paid';

export const MAX_KID_AMOUNT = 'Maximum number of children 9';
export const MIN_KID_AMOUNT = 'Minimum number of children 0';

export const MIN_GUEST_AMOUNT = 'Minimum number of guests 0';
export const MAX_GUEST_AMOUNT = 'Maximum number of guests 0';

export const NO_LEADING_ZERO = 'Leading zero is not allowed';
