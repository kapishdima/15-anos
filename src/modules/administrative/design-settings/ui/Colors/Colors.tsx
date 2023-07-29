import React from 'react';
import { ColorField } from '../ColorField/ColorField';
import { ScrollXArea } from '@/components';
import { useTranslation } from 'react-i18next';

export const Colors: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="colors">
      <label className="colors-label">{t('Theme colors')}</label>
      <ScrollXArea>
        <ColorField name={`countdown`} label="Countdown" />
        <ColorField name={`countdown`} label="Countdown" />
        <ColorField name={`countdown`} label="Countdown" />
        <ColorField name={`upper_bar`} label="Upper bar" />
        <ColorField name={`upper_bar`} label="Upper bar" />
        <ColorField name={`lower_bar`} label="Lower bar" />
        <ColorField name={`lower_bar`} label="Lower bar" />
        <ColorField name={`lower_bar`} label="Lower bar" />
        <ColorField name={`invitation`} label="Invitation" />
        <ColorField name={`invitation`} label="Invitation" />
        <ColorField name={`invitation`} label="Invitation" />
        <ColorField name={`invitation_text`} label="Invitation text" />
      </ScrollXArea>
    </div>
  );
};
