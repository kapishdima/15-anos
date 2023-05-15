import React from 'react';

type ProgressBarProps = {
  value: number;
  bgColor?: string;
  fullWithBar?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  bgColor,
  fullWithBar = false,
}) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-thumbnail">
        <div
          className="progress-bar__value"
          style={{ width: fullWithBar ? '100%' : `${value}%`, background: bgColor }}></div>
        <div className="progress-bar__thumb"></div>
      </div>
      {!isNaN(value) && <div className="progress-bar__label">{value}%</div>}
    </div>
  );
};
