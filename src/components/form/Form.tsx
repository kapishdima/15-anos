import React, { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import classNames from 'classnames';

type FormProps = PropsWithChildren & {
  onSubmit: (values: any) => void;
  initialValues?: any;
  classes?: string;
  schema?: ObjectSchema<any>;
};

export const Form: React.FC<FormProps> = ({
  onSubmit,
  initialValues,
  children,
  classes,
  schema,
}) => {
  const form = useForm({
    defaultValues: initialValues,
    resolver: schema ? yupResolver(schema) : undefined,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classNames('form-container', classes)}>
        {children}
      </form>
    </FormProvider>
  );
};
