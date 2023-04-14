import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { TaskViewModal, groupByDay, useTasksStore } from '../../store/tasks';

import { TaskCard } from './TaskCard';
import { TaskMonth } from './TaskMonth';
import { TasksDay } from './TasksDay';

import { getCategoryById, useCategoriesStore } from '@modules/categories';
import MockTaskIcon from '@image/icons/task-icon.svg';

type TaskGroupProps = {
  title: string;
  tasks: TaskViewModal[];
};

export const TaskGroup: React.FC<TaskGroupProps> = ({ title, tasks }) => {
  const groupedByDay = groupByDay(tasks);
  const categoriesStore = useCategoriesStore();
  const tasksStore = useTasksStore();

  return (
    <>
      <TaskMonth title={title.split(',')[0]} tasks={tasks} />
      {Object.entries(groupedByDay).map(([date, dayTasks]) => (
        <div className="task-list__group">
          <TasksDay title={date} tasks={dayTasks} />
          {dayTasks.map((task) => {
            const category = getCategoryById(categoriesStore.categories, task.categoryId);
            return (
              <TaskCard
                id={task.id}
                name={task.title['en']}
                image={MockTaskIcon}
                completed={task.isCompleted}
                color={`#${category?.color}`}
                category={category?.title['en'] || ''}
                date={task.date}
                notes={task.notes}
                isRemoval={tasksStore.isRemoval}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};
