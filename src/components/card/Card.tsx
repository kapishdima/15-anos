import classNames from 'classnames';
import React from 'react';

import { CheckIcon, AngleRightIcon, IconButton, TrashIcon } from '@components/index';

type CardProps = {
  id: string;
  title: string;
  icon: string;
  color: string;
  completed?: boolean;
  removal?: boolean;
  onOpen: () => void;
  onDelete: (id: string) => void;
};

export const Card: React.FC<CardProps> = ({
  id,
  completed,
  removal,
  onOpen,
  onDelete,
  title,
  icon,
  color,
}) => {
  return (
    <div className={classNames('card', { 'card--completed': completed })} onClick={onOpen}>
      <div className="card__image">
        <div className="card__icon" style={{ backgroundColor: color }}>
          <img src={icon} alt="" />
        </div>
        <div className="card__checked-icon">
          <CheckIcon />
        </div>
      </div>
      <div className="card__name">{title}</div>
      <div className="card__icon-button">
        {!removal ? (
          <AngleRightIcon />
        ) : (
          <IconButton classes="card__remove-button" onClick={() => onDelete(id)}>
            <TrashIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
