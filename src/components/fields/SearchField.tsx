import React, { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import { TextField } from "./TextField";

import { ClearIcon } from "../icons/ClearIcon";
import { SearchIcon } from "../icons/SearchIcon";

type SearchFieldProps = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

export const SearchField: React.FC<SearchFieldProps> = ({
  onSearch,
  placeholder,
}) => {
  const { setValue } = useFormContext();

  const onClear = () => {
    setValue("search", "");
    onSearch("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };

  return (
    <TextField
      name="search"
      placeholder={placeholder}
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
