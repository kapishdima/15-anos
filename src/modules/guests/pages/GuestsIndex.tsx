import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLayout, Form, PageHeader, TextField } from '@components/index';

import { CreateGuest } from '../ui/buttons/CreateGuest';
import { useGuestsStore } from '../store/guests';
import { GuestList } from '../ui/guest-list/GuestsLists';
import { GuestProgress } from '../ui/guest-progress/GuestProgress';

import SearchIcon from '@image/icons/search.svg';

export const GuestsIndex: React.FC = () => {
  const { t } = useTranslation();
  const guestStore = useGuestsStore();

  useEffect(() => {
    guestStore.fetchGuests();
  }, []);

  return (
    <AppLayout>
      <div className="home-page">
        <PageHeader
          title={t('Guests list')}
          actions={
            <>
              <CreateGuest />
            </>
          }
        />

        {guestStore.guestsForView && (
          <div className="tasks-info guests-info">
            <GuestProgress total={guestStore.total} confirmed={guestStore.confirmed} />
            <Form
              onSubmit={function (values: any): void {
                console.log(values);
              }}>
              <TextField
                name="search"
                label="Search by name"
                placeholder="Enter guest name"
                iconBefore={SearchIcon}
              />
            </Form>
            <GuestList guests={guestStore.guestsForView} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};
