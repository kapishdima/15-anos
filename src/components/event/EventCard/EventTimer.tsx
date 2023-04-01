import React from 'react';
import Countdown from 'react-countdown';

type EventTimerProps = {
  from: Date | number;
};

export const EventTimer: React.FC<EventTimerProps> = ({ from }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
      <div className="event-timer__countdown">
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{days}</span>
          <span className="event-timer__countdown-item--title">Days</span>
        </div>
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{hours}</span>
          <span className="event-timer__countdown-item--title">Hours</span>
        </div>
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{minutes}</span>
          <span className="event-timer__countdown-item--title">Minutes</span>
        </div>
        <div className="event-timer__countdown-item">
          <span className="event-timer__countdown-item--value">{seconds}</span>
          <span className="event-timer__countdown-item--title">Seconds</span>
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
