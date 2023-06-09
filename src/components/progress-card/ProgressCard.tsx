import React from 'react';
import { ProgressBar } from '../progress/ProgressBar';

type ProgressCardProps = {
  title: string;
  hint: string;
  value: number;
  extra?: JSX.Element;
  bgColor?: string;
  fullWithBar?: boolean;
};

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  hint,
  value,
  extra,
  bgColor,
  fullWithBar = false,
}) => {
  return (
    <div className="progress-card">
      <h4 className="progress-card__title">{title}</h4>
      <div className="progress-card__progressbar">
        <ProgressBar value={Math.ceil(value)} bgColor={bgColor} fullWithBar={fullWithBar} />
      </div>
      <h5 className="progress-card__subtitle">{hint}</h5>
      {extra}
    </div>
  );
};
