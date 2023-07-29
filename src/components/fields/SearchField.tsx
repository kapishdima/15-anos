import React, { ChangeEvent } from 'react';

import { TextField } from './TextField';

import { useFormContext } from 'react-hook-form';
import { ClearIcon } from '../icons/ClearIcon';
import { SearchIcon } from '../icons/SearchIcon';

type SearchFieldProps = {
  onSearch: (value: string) => void;
};

export const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const { setValue } = useFormContext();

  const onClear = () => {
    setValue('search', '');
    onSearch('');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };

  return (
    <TextField
      name="search"
      label="Search by name"
      placeholder="Enter guest name"
      iconBefore={<SearchIcon />}
      iconAfter={
        <div className="clear-icon" onClick={onClear}>
          <ClearIcon />
        </div>
      }
      onChange={onChange}
    />
  );
};
