import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, ColorPickerField, Popover } from "@/components";

type ColorFieldProps = {
  name: string;
  label?: string;
};

export const ColorField: React.FC<ColorFieldProps> = ({ label, name }) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  const color = watch(name);
  const isWhiteColor =
    color === "#fff" || color === "#ffffff" || color === "white";

  return (
    <Popover
      ref={triggerRef}
      opened={opened}
      onClickOutside={() => setOpened(false)}
      placement="bottom-start"
      triggerElement={
        <div className="color-field" ref={triggerRef} onClick={toogleOpened}>
          <label className="color-field__label">{t(label || "")}</label>

          <div
            className={"color-field__indicator"}
            style={{
              backgroundColor: color,
              border: isWhiteColor ? "1px solid #aeaba8" : "",
            }}
          ></div>
        </div>
      }
    >
      <div>
        <ColorPickerField name={name} />
        <div className="colors-actions">
          <Button onClick={() => setOpened(false)} variant="success">
            Save color
          </Button>
        </div>
      </div>
    </Popover>
  );
};
