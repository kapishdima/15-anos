import React from 'react';
import classNames from 'classnames';

import { AngleRightIcon, CheckIcon } from '@components/icons';
import { CreateTaskModal } from '../create-task/CreateTaskModal';
import { IconButton, TrashIcon, useModal } from '@/components';
import { useTasksStore } from '../../store/tasks';

type TaskCardProps = {
  image: string;
  name: string;
  id: string;
  category: string;
  date: Date;
  notes: string;
  isRemoval?: boolean;
  color?: string;
  completed?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  name,
  image,
  completed,
  category,
  date,
  notes,
  isRemoval,
  color = '#db5b78',
}) => {
  const tasksStore = useTasksStore();
  const TASK_MODAL_ID = `task-modal-${id}`;

  const { open } = useModal();

  const onClick = () => {
    open(TASK_MODAL_ID);
  };

  return (
    <>
      <div
        className={classNames('task-card', { 'task-card--completed': completed })}
        onClick={onClick}>
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
          {!isRemoval ? (
            <AngleRightIcon />
          ) : (
            <IconButton
              classes="task-card__remove-button"
              onClick={() => tasksStore.removeTask(id)}>
              <TrashIcon />
            </IconButton>
          )}
        </div>
      </div>
      <CreateTaskModal id={TASK_MODAL_ID} initialValues={{ name, category, date, notes }} />
    </>
  );
};
