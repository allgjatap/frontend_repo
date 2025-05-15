import { useFormError } from '@/hooks/useFormError';
import { Select, SelectProps } from '@nextui-org/react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';

export type FormSelectProps<T extends object> = SelectProps<T> & { name: string; registerOptions?: RegisterOptions };

export const FormSelect = <T extends object>({ name, registerOptions, ...props }: FormSelectProps<T>) => {
  const { register } = useFormContext();
  const { isError, errorMessage } = useFormError(name);
  const value = useWatch({ name });
  const selectedKeys = value !== undefined || value !== null ? String(value).split(',') : [];

  return (
    <Select<T>
      {...register(name, registerOptions)}
      selectedKeys={selectedKeys}
      isInvalid={isError}
      errorMessage={errorMessage}
      {...props}
    />
  );
};
