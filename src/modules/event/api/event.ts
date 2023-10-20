import { EVENT_DETAILS } from "@/app/constants/local-storage-keys";
import { EventDetails } from "@/modules/auth/@types";

export const getEvent = () => {
  const eventDetails: EventDetails = JSON.parse(
    window.localStorage.getItem(EVENT_DETAILS) || "{}"
  );
  return eventDetails;
};

export const getEventId = () => {
  const event = getEvent();

  return `event${event.eventNumber}`;
};

export const getEventNumber = () => {
  const event = getEvent();

  return event.eventNumber;
};

export const getEventTitle = () => {
  const event = getEvent();

  return event.eventTitle;
};
