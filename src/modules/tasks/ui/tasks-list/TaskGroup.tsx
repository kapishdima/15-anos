import React from 'react';

import { TaskViewModal, groupByDay } from '../../store/tasks';
import { TaskCard } from './TaskCard';

import MockTaskIcon from '../../../../image/icons/task-icon.svg';
import isPast from 'date-fns/isPast';
import classNames from 'classnames';
import isSameMonth from 'date-fns/isSameMonth';
import { TaskMonth } from './TaskMonth';
import { TasksDay } from './TasksDay';
import { getCategoryById, useCategoriesStore } from '../../../categories/store/categories';

type TaskGroupProps = {
  title: string;
  tasks: TaskViewModal[];
};

export const TaskGroup: React.FC<TaskGroupProps> = ({ title, tasks }) => {
  const groupedByDay = groupByDay(tasks);
  const categoriesStore = useCategoriesStore();

  return (
    <>
      <TaskMonth title={title} tasks={tasks} />
      {Object.entries(groupedByDay).map(([date, dayTasks]) => (
        <div className="task-list__group">
          <TasksDay title={date} tasks={dayTasks} />
          {dayTasks.map((task) => {
            const category = getCategoryById(categoriesStore.categories, task.categoryId);
            return (
              <TaskCard
                id="1"
                name={task.title['en']}
                image={MockTaskIcon}
                completed={task.isCompleted}
                color={`#${category?.color}`}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};
