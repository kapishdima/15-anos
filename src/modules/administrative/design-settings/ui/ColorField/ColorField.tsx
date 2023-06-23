import { ColorPickerField, useClickOutside } from '@/components';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

type ColorFieldProps = {
  name: string;
  label?: string;
};

export const ColorField: React.FC<ColorFieldProps> = ({ label, name }) => {
  const { watch } = useFormContext();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const triggerContainerRef = useRef<HTMLDivElement | null>(null);

  const [shownPicker, setShowPicker] = useState(false);
  const color = watch(name);

  const onIndicatorClick = () => {
    setShowPicker((_shownPicker) => !_shownPicker);
  };

  useClickOutside(triggerContainerRef, () => setShowPicker(false));

  const calculatePickerPosition = () => {
    if (!triggerRef?.current) {
      return;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const height = triggerRect.height;
    const offset = 12;

    const top = triggerRect.top + height + offset;
    const left = triggerRect.left;

    return { top, left };
  };

  return (
    <div className="color-field-container">
      <div className="color-field" onClick={onIndicatorClick} ref={triggerRef}>
        <label className="color-field__label">{label}</label>

        <div className="color-field__indicator" style={{ backgroundColor: color }}></div>
      </div>
      {shownPicker &&
        createPortal(
          <div
            className="color-field__picker"
            style={calculatePickerPosition()}
            ref={triggerContainerRef}>
            <ColorPickerField name={name} />
          </div>,
          document.body,
        )}
    </div>
  );
};
