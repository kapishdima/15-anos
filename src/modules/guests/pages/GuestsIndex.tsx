import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLayout, Form, PageHeader, TextField } from '@components/index';

import { CreateGuest } from '../ui/buttons/CreateGuest';
import { useGuestsStore } from '../store/guests';
import { GuestList } from '../ui/guest-list/GuestsLists';
import { GuestProgress } from '../ui/guest-progress/GuestProgress';

import { sortedByNameAlphabet } from '../store/guests.selector';
import { RemoveGuest } from '../ui/buttons/RemoveGuest';
import { ToggleVisibilityConfirmed } from '../ui/buttons/ToggleVisibilityCompleted';
import { useSearchParams } from 'react-router-dom';
import { SearchField } from '@/components/fields/SearchField';

export const GuestsIndex: React.FC = () => {
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();

  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const searchGuest = useGuestsStore((state) => state.searchGuest);
  const guests = useGuestsStore((state) => sortedByNameAlphabet(state));
  const loading = useGuestsStore((state) => state.loading);
  const isRemoval = useGuestsStore((state) => state.isRemoval);

  const onSearch = (value: string) => {
    searchParams.set('q', value);
    setSearchParams(searchParams);
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
            <Form onSubmit={() => {}} initialValues={{ search: searchParams.get('q') || '' }}>
              <SearchField onSearch={onSearch} />
            </Form>
            <ToggleVisibilityConfirmed />
            <GuestList guests={guests} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};
