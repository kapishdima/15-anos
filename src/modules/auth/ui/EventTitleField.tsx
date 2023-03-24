import React from 'react';
import { TextField } from '../../../components/fields/TextField';
import { useEventTitleField } from '../hook/useEventTitleField';
import { useTranslation } from 'react-i18next';

export const EventTitleField: React.FC = () => {
  const shown = useEventTitleField();
  const { t } = useTranslation();

  if (!shown) {
    return null;
  }

  return <TextField placeholder={t('event_title_placeholder')} name="eventTitle" />;
};
