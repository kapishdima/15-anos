import React, { RefCallback, useRef, forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface MaskedProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: any;
  blocks: any;
}

export const MaskedField = forwardRef<IMask.MaskElement, MaskedProps>(
  (props, inputRef) => {
    const { onChange, mask, blocks, ...attrs } = props;
    const ref = useRef();

    return (
      <IMaskInput
        {...attrs}
        inputRef={inputRef as RefCallback<IMask.MaskElement>}
        ref={ref}
        mask={mask}
        blocks={blocks}
        lazy={false}
        unmask={true}
        onAccept={(value: any) => {
          onChange({ target: { name: attrs.name, value } });
        }}
      />
    );
  }
);
