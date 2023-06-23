import React from 'react';

import { useTranslation } from 'react-i18next';
import { FieldValues, UseFormReset } from 'react-hook-form';

import { Button, Dialog } from '@/components';
import { CreateTaskForm } from './CreateTaskForm';
import { useTasksStore } from '../../store/tasks';

type CreateTaskModalProps = {
  id: string;
  taskId?: string;
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
  validation?: any;
  actions?: JSX.Element | null;
  hasDeleteButton?: boolean;
  hasConfirmButton?: boolean;
};

const defaultValues = {
  date: new Date(),
  categoryId: '',
  notes: '',
  title: '',
};

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  id,
  taskId,
  initialValues,
  loading,
  validation,
  onSubmit,
  hasDeleteButton,
  actions,
  hasConfirmButton = true,
}) => {
  const { t } = useTranslation();

  const removeTask = useTasksStore((state) => state.removeTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  const submit = (values: any, reset?: UseFormReset<FieldValues>) => {
    onSubmit(values);
    if (reset) {
      reset();
    }
  };

  const onDelete = () => {
    if (!taskId) {
      return;
    }
    removeTask(taskId);
    fetchTasks(/*force*/ true);
  };

  return (
    <Dialog
      id={id}
      title={t('Task details')}
      confirmButtonText={t('Save the task')}
      minWidth="50vw"
      minHeight="90vh"
      loading={loading}
      initialValues={initialValues || defaultValues}
      onSubmit={submit}
      validation={validation}
      actions={
        <>
          {hasDeleteButton ? (
            <Button variant="error" onClick={onDelete}>
              Delete task
            </Button>
          ) : null}
          {actions}
        </>
      }
      hasConfirmButton={hasConfirmButton}>
      <CreateTaskForm />
    </Dialog>
  );
};
