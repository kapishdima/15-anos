import React, { PropsWithChildren, useEffect } from 'react';
import { FieldValues, FormProvider, UseFormReset, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import classNames from 'classnames';

type FormProps = PropsWithChildren & {
  onSubmit: (values: any, reset?: UseFormReset<FieldValues>) => void;
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

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues]);

  const submit = (values: any) => {
    onSubmit(values, form.reset);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)} className={classNames('form-container', classes)}>
        {children}
      </form>
    </FormProvider>
  );
};
