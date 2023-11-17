import React, { useEffect } from "react";

import { EventTimer } from "./EventTimer";
import { Image, AspectRatio } from "@/components";

import { useProfileStore } from "../../store/profile";

import EmptyPhoto from "@/image/emptyphoto.png";

export const EventCard: React.FC = () => {
  const fetchProfileMainImage = useProfileStore(
    (state) => state.fethcProfileMainImage
  );
  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );

  const mainImage = useProfileStore((state) => state.mainImage);

  useEffect(() => {
    fetchProfileDetails();
    fetchProfileMainImage();
  }, []);

  return (
    <div className="event-card">
      <div className="event-card__image">
        <AspectRatio>
          {/* <img src={mainImage || EventImage} alt="Event" /> */}
          <Image src={mainImage || EmptyPhoto} />
        </AspectRatio>
      </div>
      <div className="event-card__timer">
        <EventTimer />
      </div>
    </div>
  );
};
