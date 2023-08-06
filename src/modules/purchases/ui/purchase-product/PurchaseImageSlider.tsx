import React from "react";
import { Slider } from "@/components";

type PurchaseImageSliderProps = {
  images: string[];
};

export const PurchaseImageSlider: React.FC<PurchaseImageSliderProps> = ({
  images,
}) => {
  return (
    <div className="purchase-image-slider">
      <Slider loop spaceBetween={10}>
        {images.map((image) => (
          <img src={image} alt="Purchase" />
        ))}
      </Slider>
    </div>
  );
};
