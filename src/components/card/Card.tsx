import classNames from 'classnames';
import React, { MouseEvent } from 'react';

import { CheckIcon, Spinner } from '@components/index';
import { Translated, translated } from '@/app/utils/locale';

import { CardRemoveButton } from './CardRemoveButton';

type CardProps = {
  id: string;
  title: Translated;
  icon: string;
  color: string;
  completed?: boolean;
  removal?: boolean;
  loading?: boolean;
  extra?: JSX.Element;
  hoverable?: boolean;
  hint?: string;
  showHint?: boolean;
  showDescription?: boolean;
  description?: Translated;
  expires?: boolean;
  onIconClick?: (id: string) => void;
  onOpen: () => void;
  onDelete: (id: string) => void;
};

export const Card: React.FC<CardProps> = ({
  id,
  completed,
  removal,
  onOpen,
  onDelete,
  onIconClick,
  title,
  icon,
  color,
  loading,
  extra,
  hint,
  expires,
  description,
  showHint = true,
  showDescription = false,
  hoverable = true,
}) => {
  const handleIconClick = (event: MouseEvent) => {
    event.stopPropagation();

    if (!onIconClick) {
      return;
    }

    onIconClick(id);
  };

  return (
    <div
      className={classNames('card', {
        'card--completed': completed,
        'card--hoverable': hoverable,
        'card--expires': expires,
      })}
      onClick={onOpen}>
      <div className="card__image" onClick={handleIconClick}>
        <div className="card__icon" style={{ backgroundColor: `#${color}` }}>
          {loading ? <Spinner variant="white" /> : <img src={icon} alt="" />}
        </div>
        <div className="card__checked-icon">
          <CheckIcon />
        </div>
      </div>
      <div className="card__info">
        <div className="card__name">{translated(title)}</div>
        {hint && showHint && <div className="card__hint">{hint}</div>}
        {description && showDescription && (
          <div className="card__hint">{translated(description)}</div>
        )}
      </div>
      <div className="card-actions">
        {extra}
        <CardRemoveButton
          id={id}
          removal={removal}
          onDelete={() => onDelete(id)}
          loading={loading}
        />
      </div>
    </div>
  );
};
