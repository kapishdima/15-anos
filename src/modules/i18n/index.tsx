import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import en from '../../app/locales/en.json';
import ru from '../../app/locales/ru.json';
import ua from '../../app/locales/ru.json';

export const createI18nClient = () => {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
        ua: { translation: ua },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};
