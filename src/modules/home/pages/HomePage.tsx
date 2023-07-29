import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Tabs, AppLayout, PageHeader } from '@components/index';

import {
  CreateTask,
  RemoveTask,
  TaskProgress,
  useTasksStore,
  TaskListByDate,
  TaskListByCategories,
  ToggleVisibilityCompleted,
} from '@modules/tasks';

import { useCategoriesStore } from '@modules/categories';

export const HomePage: React.FC = () => {
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const tasksLoading = useTasksStore((state) => state.loading);

  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const categoriesLoading = useCategoriesStore((state) => state.loading);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  return (
    <AppLayout loading={tasksLoading && categoriesLoading}>
      <div className="home-page">
        <PageHeader
          title="Tasks"
          hint="We have compiled a list of tasks for you. Now you can change or delete them and add your own."
          actions={
            <>
              <CreateTask />
              <RemoveTask />
            </>
          }
        />

        <div className="tasks-info ">
          <TaskProgress />
          <Tabs
            extra={<ToggleVisibilityCompleted />}
            tabs={[
              { title: 'By date', component: <TaskListByDate /> },
              { title: 'By category', component: <TaskListByCategories /> },
            ]}
          />
        </div>
      </div>
    </AppLayout>
  );
};
