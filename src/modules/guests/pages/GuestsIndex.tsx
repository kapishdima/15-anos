import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLayout, Form, PageHeader, TextField } from '@components/index';

import { CreateGuest } from '../ui/buttons/CreateGuest';
import { useGuestsStore } from '../store/guests';
import { GuestList } from '../ui/guest-list/GuestsLists';
import { GuestProgress } from '../ui/guest-progress/GuestProgress';

import SearchIcon from '@image/icons/search.svg';
import { sortedByNameAlphabet } from '../store/guests.selector';
import { RemoveGuest } from '../ui/buttons/RemoveGuest';
import { ToggleVisibilityConfirmed } from '../ui/buttons/ToggleVisibilityCompleted';

export const GuestsIndex: React.FC = () => {
  const { t } = useTranslation();

  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const searchGuest = useGuestsStore((state) => state.searchGuest);
  const guests = useGuestsStore((state) => sortedByNameAlphabet(state));
  const loading = useGuestsStore((state) => state.loading);
  const isRemoval = useGuestsStore((state) => state.isRemoval);

  const onSearch = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    searchGuest(value);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <AppLayout loading={loading}>
      <div className="home-page">
        <PageHeader
          title={t('Guests list')}
          actions={
            <>
              <CreateGuest />
              <RemoveGuest removal={isRemoval} />
            </>
          }
        />

        {guests && (
          <div className="tasks-info guests-info">
            <GuestProgress />
            <Form onSubmit={() => {}}>
              <TextField
                name="search"
                label="Search by name"
                placeholder="Enter guest name"
                iconBefore={SearchIcon}
                onChange={onSearch}
              />
            </Form>
            <ToggleVisibilityConfirmed />
            <GuestList guests={guests} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};
