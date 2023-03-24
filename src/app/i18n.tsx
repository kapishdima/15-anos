import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import en from './locales/en.json';

export const createI18n = () => {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};
