import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useClickOutside } from '@components/index';
import { useTranslation } from 'react-i18next';

export type Option = {
  icon?: string;
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  defaultSelected?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder,
  defaultSelected,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value.toLowerCase() === defaultSelected?.toLowerCase()) || null,
  );
  const [opened, setOpened] = useState(false);
  const select = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpened((_opened) => !_opened);
  };

  const close = () => {
    setOpened(false);
  };

  const onOptionClick = (option: Option) => {
    setSelected(option);
    onSelect(option.value);
    close();
  };

  useClickOutside(select, close);

  useEffect(() => {
    if (selected?.value === defaultSelected) {
      return;
    }

    setSelected(
      options.find((option) => option.value.toLowerCase() === defaultSelected?.toLowerCase()) ||
        null,
    );
  }, [defaultSelected]);

  return (
    <div className={classNames('select', { opened })} ref={select}>
      <div className="select-field" onClick={toggle}>
        {selected ? (
          <div className="select-value">
            <div className="select-value__icon">{selected.icon}</div>
            <div className="select-value__text">{selected.label}</div>
          </div>
        ) : (
          <div className="select-placeholder">{placeholder}</div>
        )}
      </div>
      <div className="select-dropdown">
        {options.length ? (
          options.map((option) => (
            <div className="select-option" onClick={() => onOptionClick(option)}>
              {option.icon && <div className="select-option-icon">{option.icon}</div>}
              <div className="select-option-label">{option.label}</div>
            </div>
          ))
        ) : (
          <div className="select-dropdown__empty">{t('Empty')}</div>
        )}
      </div>
    </div>
  );
};
