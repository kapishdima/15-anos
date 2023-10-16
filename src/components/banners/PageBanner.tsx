import React from "react";
import { AspectRatio } from "../aspect-ratio/AspectRatio";

type PageBannerProps = {
  image: string;
  title: string;
};

export const PageBanner: React.FC<PageBannerProps> = ({ image, title }) => {
  return (
    <AspectRatio ratio="8/3">
      <div className="page-banner" style={{ backgroundImage: `url(${image})` }}>
        <h2 className="page-banner__title">{title}</h2>
      </div>
    </AspectRatio>
  );
};
