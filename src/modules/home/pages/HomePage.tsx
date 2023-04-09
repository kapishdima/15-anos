import React, { useEffect } from 'react';
import { AppLayout } from '../../../components/layout/AppLayout/AppLayout';
import { PageHeader } from '../../../components/layout/PageHeader/PageHeader';
import { CreateTask } from '../../tasks/ui/buttons/CreateTask/CreateTask';
import { RemoveTask } from '../../tasks/ui/buttons/RemoveTask/RemoveTask';
import { TaskProgress } from '../../tasks/ui/tasks-progress/TaskProgress';
import { TaskList } from '../../tasks/ui/tasks-list/TaskList';
import { Tabs } from '../../../components/tabs/Tabs';
import { useTasksStore } from '../../tasks/store/tasks';
import { useCategoriesStore } from '../../categories/store/categories';
import { TaskListByDate } from '../../tasks/ui/tasks-list/TaskListByDate';
import { TaskListByCategories } from '../../tasks/ui/tasks-list/TaskListByCategories';

export const HomePage: React.FC = () => {
  const tasksStore = useTasksStore();
  const categoriesStore = useCategoriesStore();

  useEffect(() => {
    tasksStore.fetchTasks();
    categoriesStore.fetchCategories();
  }, []);

  return (
    <AppLayout>
      <div className="home-page">
        <PageHeader
          title="Tasks"
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
