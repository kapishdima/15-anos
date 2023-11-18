import React from "react";
import { AspectRatio } from "../aspect-ratio/AspectRatio";
import { Image } from "../image/Image";
import { translated } from "@/app/utils/locale";

type PageBannerProps = {
  image: string;
  title: string;
};

export const PageBanner: React.FC<PageBannerProps> = ({ image, title }) => {
  return (
    <AspectRatio ratio="8/3">
      <div className="page-banner">
        <Image src={image} className="page-banner__image" />
        <h2 className="page-banner__title">{translated(title)}</h2>
      </div>
    </AspectRatio>
  );
};
