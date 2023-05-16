import { AnyObject, TestContext } from 'yup';

export const noLeadingZero = (value?: number, context?: TestContext<AnyObject>) => {
  if (!context?.originalValue) {
    return true;
  }

  const startsWithZero =
    context.originalValue.toString().length > 1
      ? !context.originalValue?.toString().startsWith('0')
      : true;

  return startsWithZero;
};
