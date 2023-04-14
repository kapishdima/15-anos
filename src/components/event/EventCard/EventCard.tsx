import React from 'react';

import EventImage from '@image/mock-event.jpg';
import { EventTimer } from './EventTimer';

export const EventCard: React.FC = () => {
  return (
    <div className="event-card">
      <div className="event-card__image">
        <img src={EventImage} alt="Event" />
      </div>
      <div className="event-card__timer">
        <EventTimer from={Date.now() + 60 * 10000} />
      </div>
    </div>
  );
};
