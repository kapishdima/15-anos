import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

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
import { createTaskSchemaValidation } from "../validations/task.schema";

export const CreateTaskPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loading = useTasksStore((state) => state.loading);
  const addTask = useTasksStore((state) => state.addTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  const createTask = async (values: any) => {
    await addTask(values);
    navigate(-1);
    fetchTasks(/*force*/ true);
  };

  const defaultValues = {
    date: new Date(),
    categoryId: searchParams.get("categoryId") || "Artists",
    vendorId: searchParams.get("vendorId"),
    notes: "",
    title: "",
  };

  return (
    <AppLayout>
      <PageHeader title={t("Task details")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form
            onSubmit={createTask}
            initialValues={defaultValues}
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
              <Button
                aria-label="Close this dialog window"
                variant="success"
                loading={loading}
                type="submit"
              >
                {t("Save the task")}
              </Button>
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
