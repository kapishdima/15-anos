import { format, isSameDay, addDays, subDays } from 'date-fns';
import { t } from 'i18next';

export const isNextDay = (date: Date) => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const isNextDay = isSameDay(date, tomorrow);

  return isNextDay;
};

export const isLastDay = (date: Date) => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const isLastDay = isSameDay(date, yesterday);

  return isLastDay;
};

export const toRelativeDate = (date: Date) => {
  const nextDay = isNextDay(date);
  const lastDay = isLastDay(date);
  const today = isSameDay(date, new Date());

  if (today) {
    return t('Today');
  }

  if (nextDay) {
    return t('Tomorrow');
  }

  if (lastDay) {
    return t('Yesterday');
  }

  return format(date, 'EEEE, dd MMMM yyyy');
};
