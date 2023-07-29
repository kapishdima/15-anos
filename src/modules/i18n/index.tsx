import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import en from '../../app/locales/en.json';
import es from '../../app/locales/es.json';
import pt from '../../app/locales/pt.json';
import { toRelativeDate } from '@/app/utils/date';
import { isDate } from 'date-fns';

export const createI18nClient = () => {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        es: { translation: es },
        pt: { translation: pt },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
        format: (value) => {
          if (isDate(value)) {
            return toRelativeDate(value);
          }

          return value;
        },
      },
    });
};
