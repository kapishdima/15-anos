import { Form, TextField, SelectField } from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  date: new Date(),
  payable: '0',
  paid: '0',
};

const statuses = [
  { value: 'invited', label: 'Invited' },
  { value: 'wont_come', label: "Wont't come" },
  { value: 'confirmed', label: 'Confirmed participation' },
];

type CreateGuestFormProps = {
  initialValues?: any;
};

export const CreateGuestForm: React.FC<CreateGuestFormProps> = ({ initialValues }) => {
  const { t } = useTranslation();
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues || defaultValues}>
      <TextField name="name" label={t('Guest name')} placeholder={t('Enter guest name')} />
      <SelectField
        name="status"
        label="Set guest status"
        options={statuses}
        placeholder="Set guest status"
      />
      <TextField
        name="extra_guests"
        type="number"
        label={'Set the number of extra guests'}
        placeholder={'0'}
      />
      <TextField name="kids" type="number" label={'Set the number of kids'} placeholder={'0'} />
    </Form>
  );
};
