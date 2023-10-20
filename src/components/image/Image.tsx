import React, { useState } from "react";
import classNames from "classnames";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const Image: React.FC<ImageProps> = ({ src, ...attrs }) => {
  const [loading, setLoading] = useState(true);

  const onLoadStart = () => setLoading(true);
  const onLoadEnd = () => setLoading(false);

  return (
    <>
      {loading && <div className="image-loading__container"></div>}
      <img
        {...attrs}
        src={src}
        onLoadStart={onLoadStart}
        onLoad={onLoadEnd}
        className={classNames(
          "image",
          { loaded: loading === false },
          attrs.className
        )}
      />
    </>
  );
};
