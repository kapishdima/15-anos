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
        <div className="task-list__group" key={date}>
          <TasksDay title={date} tasks={dayTasks} key={date} />
          {dayTasks.map((task) => {
            const category = getCategoryById(categoriesStore.categories, task.categoryId);

            return (
              <TaskCard
                key={task.id}
                id={task.id}
                title={typeof task.title === 'string' ? task.title : task.title['en']}
                image={MockTaskIcon}
                completed={task.isCompleted}
                color={`#${category?.color}`}
                categoryId={category?.id || ''}
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
