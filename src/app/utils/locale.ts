import i18n from "@/modules/i18n";

export type Translated = { [key: string]: string } | string;

export const translated = (text: string | Translated) => {
  if (typeof text === "string") {
    return text;
  }

  console.log("[i18n.language]:", i18n.language);
  console.log("[translation]:", text[i18n.language || "en"]);

  const locale =
    !i18n.language || i18n.language === "ru" ? "en" : i18n.language;

  return text[locale];
};
