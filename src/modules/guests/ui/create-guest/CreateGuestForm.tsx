import React from 'react';
import {
  TextField,
  SelectField,
  ConfirmedIcon,
  InvitedIcon,
  WontComeIcon,
  QuestionIcon,
} from '@/components';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

const statuses = [
  { value: 'none', label: 'Not Invited', icon: <QuestionIcon /> },
  { value: 'invited', label: 'Invited', icon: <InvitedIcon /> },
  { value: 'declined', label: "Wont't come", icon: <WontComeIcon /> },
  { value: 'confirmed', label: 'Confirmed participation', icon: <ConfirmedIcon /> },
];

export const CreateGuestForm: React.FC = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const hasNameGuest = Boolean(getValues('nameGuest'));
  const hasGuestsGuest = Boolean(getValues('guestsGuest'));
  const hasKidsGuest = Boolean(getValues('kidsGuest'));

  return (
    <>
      <TextField
        name={hasNameGuest ? 'nameGuest' : 'name'}
        label={t('Guest name')}
        placeholder={t('Enter guest name')}
      />
      <SelectField
        name="status"
        label={t('Set guest status')}
        options={statuses}
        placeholder={t('Set guest status') || ''}
      />
      <TextField
        name={hasGuestsGuest ? 'guestGuest' : 'guests'}
        type="number"
        label={t('Set the number of extra guests')}
        placeholder={'0'}
      />
      <TextField
        name={hasKidsGuest ? 'kidsGuest' : 'kids'}
        type="number"
        label={t('Set the number of kids')}
        placeholder={'0'}
      />
    </>
  );
};
