import { useFormError } from '@/hooks/useFormError';
import { TextAreaProps, Textarea } from '@nextui-org/react';
import { useFormContext, useWatch } from 'react-hook-form';

export type FormTextfieldProps = TextAreaProps & { name: string };

export const FormTextfield = ({ name, ...props }: FormTextfieldProps) => {
  const { register } = useFormContext();
  const { isError, errorMessage } = useFormError(name);
  const value = useWatch({ name });

  return <Textarea {...register(name)} value={value} isInvalid={isError} errorMessage={errorMessage} {...props} />;
};
