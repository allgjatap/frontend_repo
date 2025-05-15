import { useFormError } from '@/hooks/useFormError';
import { Input, InputProps } from '@nextui-org/react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';

export type FormInputProps = InputProps & { name: string; registerOptions?: RegisterOptions };

export const FormInput = ({ name, registerOptions, ...props }: FormInputProps) => {
  const { register } = useFormContext();
  const { isError, errorMessage } = useFormError(name);
  const value = useWatch({ name });

  return (
    <Input
      {...register(name, registerOptions)}
      value={value}
      isInvalid={isError}
      errorMessage={errorMessage}
      {...props}
    />
  );
};
