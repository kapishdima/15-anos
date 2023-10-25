import { format, isSameDay, addDays, subDays } from "date-fns";
import { t } from "i18next";
import i18n from "@/modules/i18n";

import es from "date-fns/locale/es";
import pt from "date-fns/locale/pt";
import en from "date-fns/locale/en-US";

const locales = { es, pt, en };

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

  const locale =
    !i18n.language || i18n.language === "ru" ? "en" : i18n.language;

  if (today) {
    return t("Today");
  }

  if (nextDay) {
    return t("Tomorrow");
  }

  if (lastDay) {
    return t("Yesterday");
  }

  // @ts-ignore
  return format(date, "EEEE, dd MMMM yyyy", { locale: locales[locale] });
};

export const toMonthYearDate = (date: Date) => {
  const locale =
    !i18n.language || i18n.language === "ru" ? "en" : i18n.language;

  // @ts-ignore
  return format(date, "MMMM, yyyy", { locale: locales[locale] });
};
