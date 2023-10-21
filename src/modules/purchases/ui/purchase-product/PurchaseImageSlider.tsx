import React from "react";
import { AspectRatio, Slider } from "@/components";
import { Navigation, Pagination } from "swiper";

type PurchaseImageSliderProps = {
  images: string[];
  ratio: number;
};

export const PurchaseImageSlider: React.FC<PurchaseImageSliderProps> = ({
  images,
  ratio,
}) => {
  return (
    <div className="purchase-image-slider">
      <Slider
        loop
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        pagination
        navigation
      >
        {images.map((image) => (
          // <AspectRatio ratio={ratio?.toString()}>
          <div style={{ display: "flex" }}>
            <img
              src={image}
              alt="Purchase"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          // </AspectRatio>
        ))}
      </Slider>
    </div>
  );
};
