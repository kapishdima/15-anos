import React from 'react';
import { AppLayout } from '../../../components/layout/AppLayout/AppLayout';
import { PageHeader } from '../../../components/layout/PageHeader/PageHeader';
import { CreateTask } from '../../tasks/buttons/CreateTask/CreateTask';
import { RemoveTask } from '../../tasks/buttons/RemoveTask/RemoveTask';
import { TaskProgress } from '../../tasks/TaskProgress/TaskProgress';
import { TaskList } from '../../tasks/TaskList/TaskList';
import { Tabs } from '../../../components/tabs/Tabs';

export const HomePage: React.FC = () => {
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

        <div className="tasks-info">
          <TaskProgress total={78} completed={3} />
          <Tabs tabs={['By Data', 'By Category']} />
          <TaskList />
        </div>
      </div>
    </AppLayout>
  );
};
