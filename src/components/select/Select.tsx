import React, { useEffect, useRef, useState, MouseEvent } from "react";

import classNames from "classnames";
import { useClickOutside } from "@components/index";
import { useTranslation } from "react-i18next";

export type Option = {
  icon?: string | JSX.Element;
  label: string;
  value: string;
  title?: string;
};

type SelectProps = {
  options: Option[];
  onSelect?: (value: string) => void;
  placeholder?: string;
  defaultSelected?: string;
  appearence?: "select" | "button";
  variant?: "filled" | "outline";
  invalid?: boolean;
  showSelectedValue?: boolean;
  className?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder,
  defaultSelected,
  invalid,
  className,
  showSelectedValue = true,
  appearence = "select",
  variant = "outline",
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Option | null>(
    options.find(
      (option) => option.value.toLowerCase() === defaultSelected?.toLowerCase()
    ) || null
  );
  const [opened, setOpened] = useState(false);
  const select = useRef<HTMLDivElement>(null);

  const toggle = (event: MouseEvent) => {
    event.stopPropagation();
    setOpened((_opened) => !_opened);
  };

  const close = () => {
    setOpened(false);
  };

  const onOptionClick = (option: Option) => {
    setSelected(option);
    if (onSelect) {
      onSelect(option.value);
    }
    close();
  };

  useClickOutside(select, close);

  useEffect(() => {
    if (selected?.value === defaultSelected) {
      return;
    }

    setSelected(
      options.find(
        (option) =>
          option.value.toLowerCase() === defaultSelected?.toLowerCase()
      ) || null
    );
  }, [defaultSelected]);

  return (
    <div className={classNames("select", { opened }, className)} ref={select}>
      <div
        className={classNames(
          "select-field",
          `select-field__${appearence}`,
          `select-field__${variant}`,
          {
            "select-field--error": invalid,
          }
        )}
        onClick={toggle}
      >
        {selected && showSelectedValue ? (
          <div className="select-value">
            <div className="select-value__icon">{selected.icon}</div>
            <div className="select-value__text">
              {t(selected.title || selected.label)}
            </div>
          </div>
        ) : (
          <div className="select-placeholder">
            {t(placeholder || "") || ""}{" "}
          </div>
        )}
      </div>
      <div className="select-dropdown">
        {options.length ? (
          options.map((option, index) => (
            <div
              className="select-option"
              key={`${Date.now() + index}_${option.value}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onOptionClick(option);
              }}
            >
              {option.icon && (
                <div className="select-option-icon">{option.icon}</div>
              )}
              <div className="select-option-label">{t(option.label)}</div>
            </div>
          ))
        ) : (
          <div className="select-dropdown__empty">{t("Empty")}</div>
        )}
      </div>
    </div>
  );
};
