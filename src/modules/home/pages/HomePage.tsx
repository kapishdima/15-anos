import React, { useEffect } from 'react';
import { AppLayout, PageHeader } from '@components/index';

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

import { Tabs } from '@components/index';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const tasksStore = useTasksStore();
  const categoriesStore = useCategoriesStore();
  const { t } = useTranslation();

  useEffect(() => {
    tasksStore.fetchTasks();
    categoriesStore.fetchCategories();
  }, []);

  return (
    <AppLayout loading={tasksStore.loading && categoriesStore.loading}>
      <div className="home-page">
        <PageHeader
          title={t('Tasks')}
          actions={
            <>
              <CreateTask />
              <RemoveTask />
            </>
          }
        />

        {tasksStore.tasks && (
          <div className="tasks-info">
            <TaskProgress total={tasksStore.total} completed={tasksStore.completed} />
            <Tabs
              extra={<ToggleVisibilityCompleted />}
              tabs={[
                { title: 'By Data', component: <TaskListByDate /> },
                { title: 'By Category', component: <TaskListByCategories /> },
              ]}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};
