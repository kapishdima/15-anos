import i18n from "@/modules/i18n";

export type Translated = { [key: string]: string } | string;

export const translated = (text: string | Translated) => {
  if (typeof text === "string") {
    return text;
  }

  return text[i18n.language || "en"];
};
