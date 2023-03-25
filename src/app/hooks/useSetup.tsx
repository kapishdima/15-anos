import { createFirebaseClient } from '../../modules/firebase';
import { createI18nClient } from '../../modules/i18n';

export const useSetup = () => {
  createI18nClient();
  createFirebaseClient();
};
