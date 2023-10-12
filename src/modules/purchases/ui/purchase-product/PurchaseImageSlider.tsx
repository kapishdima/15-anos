import React from "react";
import { AspectRatio, Slider } from "@/components";
import { Pagination } from "swiper";

type PurchaseImageSliderProps = {
  images: string[];
  ratio: number;
};

export const PurchaseImageSlider: React.FC<PurchaseImageSliderProps> = ({
  images,
  ratio,
}) => {
  console.log(ratio?.toString());
  return (
    <div className="purchase-image-slider">
      <Slider loop spaceBetween={10} modules={[Pagination]} pagination>
        {images.map((image) => (
          <AspectRatio ratio={ratio?.toString()}>
            <img src={image} alt="Purchase" />
          </AspectRatio>
        ))}
      </Slider>
    </div>
  );
};
