import React from 'react';
import { useTranslation } from 'react-i18next';
import { addWeeks } from 'date-fns';

import {
  Form,
  TextField,
  Button,
  DatepickerField,
  CurrencyField,
  CountrySelect,
  LanguagesSelect,
  CurrencySelect,
} from '@components/index';

import { useCreateProfile } from '../hook/useCreateProfile';
import { CreateProfileCredentials } from '../@types';

const date = new Date();
date.setFullYear(new Date().getFullYear() + 1);
date.setHours(12);
date.setMinutes(0);

const minDate = addWeeks(new Date(), 2);

const initialValues = {
  date: new Date(date),
  budget: '0',
  country: '',
  guests: '0',
  language: '',
  currency: '',
};

export const CreateProfileForm: React.FC = () => {
  const { t } = useTranslation();
  const { createProfile, isLoading } = useCreateProfile();

  const onSubmit = async (values: CreateProfileCredentials) => {
    await createProfile(values);
  };

  return (
    <Form onSubmit={onSubmit} classes="create-profile__form" initialValues={initialValues}>
      <DatepickerField
        min={minDate}
        name="date"
        label={t('When is your Quinceañera?')}
        defaultValue={initialValues.date}
      />
      <CurrencyField name="budget" label={t('What is the budget approximately?')} />
      <TextField
        name="guests"
        label={t('How many guests are you expecting?')}
        type="number"
        color="#2ecc71"
      />
      <CountrySelect
        name="country"
        label={t('Where will be your Quinceañera?')}
        placeholder="Select country"
      />
      <LanguagesSelect
        name="language"
        label={t('What language do you prefer?')}
        placeholder="Select language"
      />
      <CurrencySelect
        name="currency"
        label={t('What currency do you use?')}
        placeholder="Select currency"
      />
      <Button type="submit" loading={isLoading}>
        {t('Create profile')}
      </Button>
    </Form>
  );
};
