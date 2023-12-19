import React, { useEffect } from "react";

import { Tabs, AppLayout, PageHeader } from "@components/index";

import {
  CreateTask,
  RemoveTask,
  TaskProgress,
  useTasksStore,
  TaskListByDate,
  TaskListByCategories,
  ToggleVisibilityCompleted,
} from "@modules/tasks";

import { useCategoriesStore } from "@modules/categories";
import { forceRefreshUser } from "@/modules/firebase/auth";
import { auth } from "@/modules/firebase";

export const TasksListPage: React.FC = () => {
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const tasksLoading = useTasksStore((state) => state.loading);

  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const categoriesLoading = useCategoriesStore((state) => state.loading);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async () => {
      forceRefreshUser();
    });
    auth.onAuthStateChanged(async () => {
      forceRefreshUser();
    });
  }, []);

  return (
    <AppLayout loading={tasksLoading || categoriesLoading}>
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

        <div className="tasks-info ">
          <TaskProgress />
          <Tabs
            extra={<ToggleVisibilityCompleted />}
            tabs={[
              { title: "By date", component: <TaskListByDate /> },
              { title: "By category", component: <TaskListByCategories /> },
            ]}
          />
        </div>
      </div>
    </AppLayout>
  );
};
