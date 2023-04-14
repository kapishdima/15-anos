import React, { RefCallback, useRef, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: any;
  blocks: any;
}

export const MaskedField = forwardRef<IMask.MaskElement, CustomProps>((props, inputRef) => {
  const { onChange, mask, blocks, ...other } = props;
  const ref = useRef();

  return (
    <IMaskInput
      {...other}
      inputRef={inputRef as RefCallback<IMask.MaskElement>}
      ref={ref}
      mask={mask}
      blocks={blocks}
      lazy={false}
      unmask={true}
      onAccept={(value: any) => {
        onChange({ target: { name: other.name, value } });
      }}
    />
  );
});
