import React, { PropsWithChildren } from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';

import 'swiper/css';

type SliderProps = PropsWithChildren & SwiperProps;

export const Slider: React.FC<SliderProps> = ({ children, ...sliderOptions }) => {
  return (
    <Swiper {...sliderOptions}>
      {React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
