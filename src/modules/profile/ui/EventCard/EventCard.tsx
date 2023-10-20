import React, { useEffect } from "react";

import { EventTimer } from "./EventTimer";
import { Image, AspectRatio } from "@/components";

import { useProfileStore } from "../../store/profile";

export const EventCard: React.FC = () => {
  const fetchProfileMainImage = useProfileStore(
    (state) => state.fethcProfileMainImage
  );
  const fetchProfileDetails = useProfileStore(
    (state) => state.fetchProfileDetails
  );

  const profile = useProfileStore((state) => state.profile);
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
          <Image src={mainImage} />
        </AspectRatio>
      </div>
      <div className="event-card__timer">
        <EventTimer from={new Date(profile?.date!).getTime() || Date.now()} />
      </div>
    </div>
  );
};