import React, { useEffect } from "react";

import EventImage from "@image/mock-event.jpg";
import { EventTimer } from "./EventTimer";
import { AspectRatio } from "@/components";
import { useProfileStore } from "../../store/profile";

export const EventCard: React.FC = () => {
  const fetchProfileMainImage = useProfileStore(
    (state) => state.fethcProfileMainImage
  );
  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    fetchProfileMainImage();
  }, []);

  return (
    <div className="event-card">
      <div className="event-card__image">
        <AspectRatio>
          <img src={EventImage} alt="Event" />
        </AspectRatio>
      </div>
      <div className="event-card__timer">
        <EventTimer from={new Date(profile?.date!).getTime() || Date.now()} />
      </div>
    </div>
  );
};
