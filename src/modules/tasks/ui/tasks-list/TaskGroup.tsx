import React from 'react';

import { useTranslation } from 'react-i18next';
import { getCategoryById, useCategoriesStore } from '@modules/categories';

import { TaskCard } from './TaskCard';
import { TaskMonth } from './TaskMonth';
import { TasksDay } from './TasksDay';

import { TaskViewModal, useTasksStore } from '../../store/tasks';
import { groupedByDate } from '../../store/tasks.selectors';

type TaskGroupProps = {
  title: string;
  tasks: TaskViewModal[];
  hasCardHint?: boolean;
};

export const TaskGroup: React.FC<TaskGroupProps> = ({ title, tasks, hasCardHint }) => {
  const { t } = useTranslation();
  const categoriesStore = useCategoriesStore();

  const isRemoval = useTasksStore((state) => state.isRemoval);

  return (
    <>
      <TaskMonth title={title.split(',')[0]} tasks={tasks} />
      {Object.entries(groupedByDate(tasks)).map(([date, dayTasks]) => {
        const formattedDate = t('Format Date', { date: new Date(Date.parse(date)) });
        return (
          <div className="task-list__group" key={date}>
            {!hasCardHint && <TasksDay title={date} tasks={dayTasks} key={date} />}

            {dayTasks.map((task) => {
              const category = getCategoryById(categoriesStore.categories, task.categoryId);

              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.isCompleted}
                  color={category?.color}
                  categoryId={category?.id || ''}
                  date={task.date}
                  notes={task.notes}
                  hint={hasCardHint ? formattedDate : undefined}
                  isRemoval={isRemoval}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};
