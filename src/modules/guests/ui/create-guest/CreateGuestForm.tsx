import {
  Form,
  TextField,
  SelectField,
  ConfirmedIcon,
  InvitedIcon,
  WontComeIcon,
} from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  date: new Date(),
  payable: '0',
  paid: '0',
};

const statuses = [
  { value: 'invited', label: 'Invited', icon: <InvitedIcon /> },
  { value: 'wont_come', label: "Wont't come", icon: <WontComeIcon /> },
  { value: 'confirmed', label: 'Confirmed participation', icon: <ConfirmedIcon /> },
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
        label={t('Set guest status')}
        options={statuses}
        placeholder={t('Set guest status') || ''}
      />
      <TextField
        name="extra_guests"
        type="number"
        label={t('Set the number of extra guests')}
        placeholder={'0'}
      />
      <TextField name="kids" type="number" label={t('Set the number of kids')} placeholder={'0'} />
    </Form>
  );
};
