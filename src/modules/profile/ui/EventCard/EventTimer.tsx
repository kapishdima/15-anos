import { Spinner } from "@/components";
import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";

type EventTimerProps = {
  from: Date | number;
};

export const EventTimer: React.FC<EventTimerProps> = ({ from }) => {
  const { t } = useTranslation();

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
      <div className="event-timer__countdown">
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{days}</span>
          <span className="event-timer__countdown-item--title">
            {t("Days")}
          </span>
        </div>
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{hours}</span>
          <span className="event-timer__countdown-item--title">
            {t("Hours")}
          </span>
        </div>
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{minutes}</span>
          <span className="event-timer__countdown-item--title">
            {t("Minutes")}
          </span>
        </div>
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{seconds}</span>
          <span className="event-timer__countdown-item--title">
            {t("Seconds")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="event-timer">
      <Countdown date={from} renderer={renderer} />
    </div>
  );
};
