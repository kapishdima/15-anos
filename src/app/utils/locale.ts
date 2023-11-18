import i18n from "@/modules/i18n";

export type Translated = { [key: string]: string } | string;

export const translated = (text: string | Translated) => {
  if (!text) {
    return "";
  }
  if (typeof text === "string") {
    return text;
  }

  const locale =
    !i18n.language || i18n.language === "ru" ? "en" : i18n.language;

  return text[locale];
};
