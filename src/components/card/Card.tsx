import classNames from 'classnames';
import React, { MouseEvent } from 'react';

import { CheckIcon, AngleRightIcon, IconButton, TrashIcon, Spinner } from '@components/index';

type CardProps = {
  id: string;
  title: string;
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
  description?: string;
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
        <div className="card__icon" style={{ backgroundColor: color }}>
          {loading ? <Spinner variant="white" /> : <img src={icon} alt="" />}
        </div>
        <div className="card__checked-icon">
          <CheckIcon />
        </div>
      </div>
      <div className="card__info">
        <div className="card__name">{title}</div>
        {hint && showHint && <div className="card__hint">{hint}</div>}
        {description && showDescription && <div className="card__hint">{description}</div>}
      </div>
      <div className="card-actions">
        {extra}
        <div className="card__icon-button">
          {!removal ? (
            <AngleRightIcon />
          ) : (
            <IconButton
              classes="card__remove-button"
              onClick={() => onDelete(id)}
              loading={loading}>
              <TrashIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};
