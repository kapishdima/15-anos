import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { useProfileColor } from "../../hooks/useProfileColor";
import { ProfileColors } from "../../models/profile-colors";

type EventTimerProps = {
  from: Date | number;
};

export const EventTimer: React.FC<EventTimerProps> = ({ from }) => {
  const { t } = useTranslation();
  const bgColor = useProfileColor(ProfileColors.CountdownBg);
  const titleColor = useProfileColor(ProfileColors.CountdownTitle);
  const textColor = useProfileColor(ProfileColors.CountdownText);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
      <div className="event-timer__countdown">
        <div className="event-timer__countdown-item">
          <span
            className="event-timer__countdown-item--value"
            style={{ color: textColor }}
          >
            {days}
          </span>
          <span
            className="event-timer__countdown-item--title"
            style={{ color: titleColor }}
          >
            {t("Days")}
          </span>
        </div>
        <div className="event-timer__countdown-item">
          <span
            className="event-timer__countdown-item--value"
            style={{ color: textColor }}
          >
            {hours}
          </span>
          <span
            className="event-timer__countdown-item--title"
            style={{ color: titleColor }}
          >
            {t("Hours")}
          </span>
        </div>
        <div className="event-timer__countdown-item">
          <span
            className="event-timer__countdown-item--value"
            style={{ color: textColor }}
          >
            {minutes}
          </span>
          <span
            className="event-timer__countdown-item--title"
            style={{ color: titleColor }}
          >
            {t("Minutes")}
          </span>
        </div>
        <div className="event-timer__countdown-item">
          <span
            className="event-timer__countdown-item--value"
            style={{ color: textColor }}
          >
            {seconds}
          </span>
          <span
            className="event-timer__countdown-item--title"
            style={{ color: titleColor }}
          >
            {t("Seconds")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="event-timer" style={{ backgroundColor: bgColor }}>
      <Countdown date={from} renderer={renderer} />
    </div>
  );
};
