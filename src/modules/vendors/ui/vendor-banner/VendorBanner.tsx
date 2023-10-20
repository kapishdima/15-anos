import React from "react";
import { Autoplay } from "swiper";
import { AspectRatio, Slider } from "@/components";

export const VendorBanner: React.FC = () => {
  return (
    <Slider
      slidesPerView={1}
      className="vendor-page__slider"
      modules={[Autoplay]}
      autoplay
    >
      <AspectRatio ratio="3/1">
        <div className="vendor-page__slide">
          <h3 className="vendor-page__slide-title heading1">
            Best local Music
          </h3>
          <img
            className="vendor-page__slide-image"
            src="https://firebasestorage.googleapis.com/v0/b/quinceanera-planner.appspot.com/o/vendors%2FMexico%2FMexico%20City%2FDecor%2F8.jpg?alt=media&token=9253b4bf-60fc-475b-b206-73fb3c732e00"
            alt=""
          />
        </div>
      </AspectRatio>
      <AspectRatio ratio="3/1">
        <div className="vendor-page__slide">
          <h3 className="vendor-page__slide-title heading1">
            Best local Music
          </h3>
          <img
            className="vendor-page__slide-image"
            src="https://firebasestorage.googleapis.com/v0/b/quinceanera-planner.appspot.com/o/vendors%2FMexico%2FMexico%20City%2FDecor%2F8.jpg?alt=media&token=9253b4bf-60fc-475b-b206-73fb3c732e00"
            alt=""
          />
        </div>
      </AspectRatio>
      <AspectRatio ratio="3/1">
        <div className="vendor-page__slide">
          <h3 className="vendor-page__slide-title heading1">
            Best local Music
          </h3>
          <img
            className="vendor-page__slide-image"
            src="https://firebasestorage.googleapis.com/v0/b/quinceanera-planner.appspot.com/o/vendors%2FMexico%2FMexico%20City%2FDecor%2F8.jpg?alt=media&token=9253b4bf-60fc-475b-b206-73fb3c732e00"
            alt=""
          />
        </div>
      </AspectRatio>
      <AspectRatio ratio="3/1">
        <div className="vendor-page__slide">
          <h3 className="vendor-page__slide-title heading1">
            Best local Music
          </h3>
          <img
            className="vendor-page__slide-image"
            src="https://firebasestorage.googleapis.com/v0/b/quinceanera-planner.appspot.com/o/vendors%2FMexico%2FMexico%20City%2FDecor%2F8.jpg?alt=media&token=9253b4bf-60fc-475b-b206-73fb3c732e00"
            alt=""
          />
        </div>
      </AspectRatio>
    </Slider>
  );
};
