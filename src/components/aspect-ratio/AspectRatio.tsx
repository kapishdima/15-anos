import React from "react";

type AspectRatioProps = {
  ratio?: string;
};

export const AspectRatio: React.FC<
  React.PropsWithChildren<AspectRatioProps>
> = ({ children, ratio = "1/1" }) => {
  return (
    <div className="aspect-ratio" style={{ aspectRatio: ratio }}>
      {children}
    </div>
  );
};
