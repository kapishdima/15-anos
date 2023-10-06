import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  AppLayout,
  Button,
  Form,
  FormActions,
  FormContent,
  PageHeader,
} from "@/components";
import { useTasksStore } from "../store/tasks";
import { CreateTaskForm } from "../ui/create-task/CreateTaskForm";
import { CreateTaskActions } from "../ui/buttons/CreateTaskActions/CreateTaskActions";
import { createTaskSchemaValidation } from "../validations/task.schema";

export const UpdateTaskPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const task = useTasksStore((state) => state.currentTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const removeTask = useTasksStore((state) => state.removeTask);
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);

  const loading = useTasksStore((state) => state.loading);

  const submitTaskUpdate = async (values: any) => {
    if (!task) {
      return;
    }

    await updateTask(task.id, values);
    fetchTasks(/*force*/ true);
    navigate(-1);
  };

  const updateTaskStatus = async () => {
    if (!task) {
      return;
    }

    const status = task.isCompleted ? "undone" : "done";
    await changeTaskStatus(task.id, status);
    fetchTasks(/*force*/ true);
    navigate(-1);
  };

  const onDelete = () => {
    if (!task?.id) {
      return;
    }

    removeTask(task.id);
    fetchTasks(/*force*/ true);
    navigate(-1);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Vendors details")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form
            onSubmit={submitTaskUpdate}
            initialValues={task}
            schema={createTaskSchemaValidation}
          >
            <CreateTaskForm />
            <FormActions>
              <Button
                appearance="ghost"
                variant="error"
                onClick={() => navigate(-1)}
              >
                {t("Cancel")}
              </Button>
              <Button variant="error" onClick={onDelete}>
                {t("Delete")}
              </Button>
              <CreateTaskActions
                loading={loading}
                updateTaskStatus={updateTaskStatus}
                isCompleted={Boolean(task?.isCompleted)}
              />
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
