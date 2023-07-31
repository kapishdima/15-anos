import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import { toRelativeDate } from '@/app/utils/date';
import { isDate } from 'date-fns';

import en from '../../app/locales/en.json';
import es from '../../app/locales/es.json';
import pt from '../../app/locales/pt.json';

export const locales = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: locales,
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

export default i18n;
