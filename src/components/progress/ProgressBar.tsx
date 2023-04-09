import React from 'react';

type ProgressBarProps = {
  value: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-thumbnail">
        <div className="progress-bar__value" style={{ width: `${value}%` }}></div>
        <div className="progress-bar__thumb"></div>
      </div>
      {!isNaN(value) && <div className="progress-bar__label">{value}%</div>}
    </div>
  );
};
