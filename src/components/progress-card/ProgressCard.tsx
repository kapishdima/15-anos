import React from 'react';
import { ProgressBar } from '../progress/ProgressBar';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="progress-card">
      <h4 className="progress-card__title">{t(title)}</h4>
      <div className="progress-card__progressbar">
        <ProgressBar value={Math.ceil(value)} bgColor={bgColor} fullWithBar={fullWithBar} />
      </div>
      <h5 className="progress-card__subtitle">{hint}</h5>
      {extra}
    </div>
  );
};
