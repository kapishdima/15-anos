import React from 'react';
import { AngleRightIcon } from '../../../../components/icons/AngleRightIcon';
import classNames from 'classnames';
import { CheckIcon } from '../../../../components/icons/CheckIcon';

type TaskCardProps = {
  image: string;
  color?: string;
  name: string;
  id: string;
  completed?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  name,
  image,
  completed,
  color = '#db5b78',
}) => {
  return (
    <div className={classNames('task-card', { 'task-card--completed': completed })}>
      <div className="task-card__image">
        <div className="task-card__icon" style={{ backgroundColor: color }}>
          <img src={image} alt="" />
        </div>
        <div className="task-card__checked-icon">
          <CheckIcon />
        </div>
      </div>
      <div className="task-card__name">{name}</div>
      <div className="task-card__icon-button">
        <AngleRightIcon />
      </div>
    </div>
  );
};
